# Wedding Budget Planner

Um aplicativo web moderno para gerenciar o orçamento e planejamento do seu casamento de forma eficiente e organizada.

[previous content remains the same until the Database section]

## 💾 Configuração do Banco de Dados (Supabase)

### Estrutura do Banco de Dados

Execute os seguintes comandos SQL no Editor SQL do Supabase para criar todas as tabelas necessárias:

```sql
-- Habilitar a extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de Usuários (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users PRIMARY KEY,
    wedding_date DATE,
    total_budget DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trigger para atualizar updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

-- Tabela de Categorias de Orçamento
CREATE TABLE public.budget_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    color VARCHAR(7),
    icon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela de Fornecedores
CREATE TABLE public.vendors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id UUID REFERENCES public.budget_categories(id),
    contact_name VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    notes TEXT,
    rating SMALLINT CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela de Orçamentos
CREATE TABLE public.budget_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id),
    category_id UUID REFERENCES public.budget_categories(id),
    vendor_id UUID REFERENCES public.vendors(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    estimated_amount DECIMAL(10,2),
    actual_amount DECIMAL(10,2),
    due_date DATE,
    status VARCHAR(20) CHECK (status IN ('pending', 'paid', 'partial', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela de Pagamentos
CREATE TABLE public.payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    budget_item_id UUID REFERENCES public.budget_items(id),
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela de Eventos/Compromissos
CREATE TABLE public.events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255),
    type VARCHAR(50) CHECK (type IN ('meeting', 'payment', 'appointment', 'other')),
    status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'cancelled')),
    vendor_id UUID REFERENCES public.vendors(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela de Galeria de Inspiração
CREATE TABLE public.inspiration_gallery (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id),
    category_id UUID REFERENCES public.budget_categories(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela de Notas e Comentários
CREATE TABLE public.notes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id),
    related_to UUID,
    related_type VARCHAR(50) CHECK (related_type IN ('vendor', 'budget_item', 'event', 'inspiration')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Políticas de Segurança RLS (Row Level Security)

-- Habilitar RLS para todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inspiration_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- Política para profiles
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Política para budget_items
CREATE POLICY "Users can CRUD own budget items"
    ON public.budget_items FOR ALL
    USING (auth.uid() = profile_id);

-- Política para events
CREATE POLICY "Users can CRUD own events"
    ON public.events FOR ALL
    USING (auth.uid() = profile_id);

-- Política para inspiration_gallery
CREATE POLICY "Users can CRUD own inspiration items"
    ON public.inspiration_gallery FOR ALL
    USING (auth.uid() = profile_id);

-- Política para notes
CREATE POLICY "Users can CRUD own notes"
    ON public.notes FOR ALL
    USING (auth.uid() = profile_id);

-- Índices para melhor performance
CREATE INDEX idx_budget_items_profile ON public.budget_items(profile_id);
CREATE INDEX idx_events_profile ON public.events(profile_id);
CREATE INDEX idx_inspiration_profile ON public.inspiration_gallery(profile_id);
CREATE INDEX idx_notes_profile ON public.notes(profile_id);
CREATE INDEX idx_budget_items_category ON public.budget_items(category_id);
CREATE INDEX idx_vendors_category ON public.vendors(category_id);
```

### Funções Auxiliares

```sql
-- Função para atualizar o timestamp de updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Função para calcular o total gasto
CREATE OR REPLACE FUNCTION public.calculate_total_spent(profile_uuid UUID)
RETURNS DECIMAL AS $$
BEGIN
    RETURN COALESCE(
        (SELECT SUM(actual_amount)
         FROM public.budget_items
         WHERE profile_id = profile_uuid
         AND status = 'paid'),
        0
    );
END;
$$ LANGUAGE plpgsql;
```

### Dados Iniciais (Seed)

```sql
-- Inserir categorias padrão
INSERT INTO public.budget_categories (name, description, color, icon) VALUES
    ('Vestido e Traje', 'Vestido de noiva, traje do noivo e acessórios', '#8b5cf6', 'dress'),
    ('Local e Decoração', 'Local da cerimônia e recepção, decoração', '#ec4899', 'building'),
    ('Buffet e Bebidas', 'Comida, bebidas e bolo', '#14b8a6', 'utensils'),
    ('Música', 'Banda, DJ e entretenimento', '#f59e0b', 'music'),
    ('Fotografia', 'Fotografia e filmagem', '#6366f1', 'camera');
```

[rest of the previous content remains the same]