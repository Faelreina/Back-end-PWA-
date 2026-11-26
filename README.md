# Anime - API Backend

API RESTful completa desenvolvida com **Node.js**, **Express** e **MongoDB** (via **Mongoose**), servindo como camada de dados para o aplicativo mobile em React Native (Expo).

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **CORS** & **Dotenv**

---

## 📋 Entidade Cadastrada (`Anime`)

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `titulo` | String (Obrigatório) | Nome da obra (ex: `"Jujutsu Kaisen"`) |
| `arco` | String (Obrigatório) | Arco lendário em destaque (ex: `"Arco do Incidente de Shibuya"`) |
| `protagonista` | String (Obrigatório) | Protagonista da obra (ex: `"Yuji Itadori & Satoru Gojo"`) |
| `antagonista` | String | Principal ameaça ou vilão (ex: `"Ryomen Sukuna & Kenjaku"`) |
| `genero` | String (Obrigatório) | Categoria (ex: `"Ação Sobrenatural, Shonen"`) |
| `episodios` | Number | Total de episódios da obra |
| `nota` | Number (0 a 10) | Avaliação pessoal |
| `status` | String | `"Assistindo"`, `"Concluído"` ou `"Planejo Assistir"` |
| `sinopse` | String | Breve resumo da trama |
| `imagemUrl` | String | URL do pôster do anime |
| `favorito` | Boolean | Indica se o anime está marcado como favorito |

---

## 🚀 Como Rodar o Projeto

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/Faelreina/Back-end-PWA-/edit/
   cd anime-backend
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Configurar as variáveis de ambiente:**
   Crie o arquivo `.env` na raiz do projeto (pode copiar o `.env.example`):
   ```env
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/anime_fullstack
   ```


4. **Iniciar o servidor:**
   ```bash
   npm start
   ```
   Na primeira inicialização com o banco vazio, o servidor popula automaticamente o catálogo com **18 animes e seus pôsteres oficiais**.

5. **Testar se está funcionando:**
   Abra no navegador `http://localhost:3000`. Você verá a confirmação `status: "online"` em JSON. Acesse `http://localhost:3000/animes` para ver os registros cadastrados.

---

## 📡 Endpoints da API (CRUD Completo)

| Método | Endpoint | Operação | Descrição |
| :--- | :--- | :--- | :--- |
| **GET** | `/animes` | **READ** | Lista todas as obras (suporta `?busca=`, `?status=`, `?favorito=true` e `?ordenacao=`) |
| **GET** | `/animes/:id` | **READ** | Retorna os detalhes de um anime específico |
| **POST** | `/animes` | **CREATE** | Cadastra um novo anime no MongoDB |
| **PUT** | `/animes/:id` | **UPDATE** | Atualiza os dados de um anime |
| **PATCH** | `/animes/:id/favorito` | **UPDATE** | Alterna o status de favorito |
| **DELETE** | `/animes/:id` | **DELETE** | Remove um anime do banco de dados |
| **POST** | `/animes/seed` | **SEED** | Restaura o catálogo oficial com os 18 animes iniciais |

---

## 📁 Estrutura de Arquivos

```text
anime-backend/
├── models/
│   └── Anime.js          # Schema Mongoose da entidade Anime
├── routes/
│   └── animes.js         # Rotas CRUD + filtro + seed
├── .env.example          # Modelo das variáveis de ambiente
├── .gitignore
├── package.json
├── README.md
└── server.js             # Configuração Express, CORS e conexão MongoDB
```

---


