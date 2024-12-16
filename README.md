# Wedding Planner - Sistema de Planejamento de Casamento

[Previous content remains the same until Persistência de Dados section]

## 📅 Integração com Google Calendar

### Configuração da API do Google Calendar

1. Acesse o [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto
3. Ative a API do Google Calendar
4. Configure as credenciais OAuth 2.0:
   - Tipo: Aplicação Web
   - Origens JavaScript autorizadas: Adicione seu domínio
   - URIs de redirecionamento: Adicione a URL de callback

```javascript
// Exemplo de configuração no .env
VITE_GOOGLE_CLIENT_ID=seu_client_id
VITE_GOOGLE_API_KEY=sua_api_key
```

### Uso da Integração

- Sincronização automática de eventos do casamento
- Notificações por email
- Compartilhamento de calendário com fornecedores
- Lembretes personalizáveis

## 🗄️ Configuração do Banco de Dados (Supabase)

### Schema do Banco de Dados

```sql
-- Tabela de Usuários
create table public.users (
  id uuid references auth.users not null primary key,
  email text not null unique,
  name text,
  partner_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de Configurações
create table public.settings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users not null,
  wedding_date date,
  venue text,
  guests_count integer,
  budget decimal,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de Categorias de Orçamento
create table public.budget_categories (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users not null,
  name text not null,
  planned_amount decimal not null,
  spent_amount decimal default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de Itens de Orçamento
create table public.budget_items (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references public.budget_categories not null,
  name text not null,
  amount decimal not null,
  supplier text,
  payment_date date,
  status text check (status in ('pending', 'partial', 'paid')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de Fornecedores
create table public.suppliers (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users not null,
  name text not null,
  category text not null,
  phone text,
  email text,
  website text,
  rating integer check (rating between 1 and 5),
  price decimal,
  status text check (status in ('contacted', 'meeting-scheduled', 'hired', 'rejected')),
  contract_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de Eventos
create table public.events (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users not null,
  title text not null,
  description text,
  event_date timestamp with time zone not null,
  type text check (type in ('payment', 'meeting', 'task')),
  category text,
  completed boolean default false,
  google_calendar_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de Documentos
create table public.documents (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users not null,
  name text not null,
  type text not null,
  url text not null,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### Configuração do Supabase

1. Crie uma conta no [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Configure as variáveis de ambiente:

```javascript
// .env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anon
```

4. Execute o schema SQL no Editor SQL do Supabase
5. Configure as políticas de segurança (RLS)

### Storage Buckets

Configure os seguintes buckets no Supabase Storage:
- `contracts`: Para armazenar contratos de fornecedores
- `documents`: Para outros documentos do casamento
- `inspiration`: Para imagens de inspiração

## 📄 Gerenciamento de Documentos

### Upload de Contratos

- Formatos suportados: PDF, DOC, DOCX
- Tamanho máximo: 10MB
- Armazenamento seguro no Supabase Storage
- Visualização integrada de PDFs

### Exportação de Relatórios

Formatos disponíveis para exportação:
- PDF: Relatórios detalhados com gráficos
- Excel: Planilhas com dados financeiros
- CSV: Dados brutos para análise

Tipos de relatórios:
- Resumo financeiro
- Lista de fornecedores
- Cronograma de eventos
- Status do planejamento

[Rest of the previous README content remains the same]