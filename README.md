# Wedding Planner Application

Uma aplicação web moderna para planejamento de casamentos, desenvolvida com React, TypeScript e Supabase.

## 🌟 Funcionalidades

- 💰 **Gestão de Orçamento**
  - Acompanhamento de gastos em tempo real
  - Visualização gráfica do orçamento
  - Categorização de despesas

- 👥 **Gestão de Fornecedores**
  - Cadastro e acompanhamento de fornecedores
  - Status de pagamentos
  - Comparação de preços

- 📅 **Cronograma**
  - Calendário de eventos
  - Lembretes importantes
  - Organização de compromissos

- 🖼️ **Galeria de Inspirações**
  - Upload de imagens
  - Organização por categorias
  - Compartilhamento de ideias

## 🚀 Tecnologias

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [React Query](https://tanstack.com/query)
- [Chart.js](https://www.chartjs.org/)
- [Lucide Icons](https://lucide.dev/)

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Conta no Supabase

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd wedding-planner
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione suas credenciais do Supabase:
```env
VITE_SUPABASE_URL=sua-url-do-supabase
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-do-supabase
```

## 🚀 Executando o Projeto

1. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

2. Acesse a aplicação:
   - Abra seu navegador
   - Acesse `http://localhost:5173`

## 📦 Build para Produção

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist`.

## 🗄️ Estrutura do Projeto

```
wedding-planner/
├── src/
│   ├── components/
│   │   ├── Budget/
│   │   │   ├── BudgetChart.tsx
│   │   │   └── BudgetSection.tsx
│   │   └── Header.tsx
│   ├── lib/
│   │   └── supabase.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── .env.local
└── package.json
```

## 🔧 Configuração do Supabase

1. Crie uma conta no [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Copie as credenciais (URL e Anon Key)
4. Configure as variáveis de ambiente conforme descrito acima

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📧 Contato

Seu Nome - [seu-email@exemplo.com]

Link do Projeto: [https://github.com/seu-usuario/wedding-planner](https://github.com/seu-usuario/wedding-planner)