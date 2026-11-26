require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Anime = require('./models/Anime');
const animesRoutes = require('./routes/animes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota raiz informativa
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    projeto: 'API Anime - Catálogo & Arcos Lendários',
    versao: '2.0.0',
    endpoints: {
      listar_animes: 'GET /animes',
      detalhes_anime: 'GET /animes/:id',
      cadastrar_anime: 'POST /animes',
      editar_anime: 'PUT /animes/:id',
      excluir_anime: 'DELETE /animes/:id',
      alternar_favorito: 'PATCH /animes/:id/favorito',
      popular_catalogo: 'POST /animes/seed',
    },
  });
});

// Rotas da entidade Anime
app.use('/animes', animesRoutes);

// Tratamento de rota não encontrada (404)
app.use((req, res) => {
  res.status(404).json({ erro: 'Endpoint não encontrado na API Anime.' });
});

// Porta e Conexão com MongoDB
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/anime_fullstack';

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('----------------------------------------------------');
    console.log('Conectado ao MongoDB com sucesso!');

    // Popula o catálogo automaticamente na primeira execução se o banco estiver vazio
    const totalExistente = await Anime.countDocuments();
    if (totalExistente === 0 && Array.isArray(animesRoutes.CATALOGO_OFICIAL_ANIMES)) {
      await Anime.insertMany(animesRoutes.CATALOGO_OFICIAL_ANIMES);
      console.log(`Catalogo inicial populado com ${animesRoutes.CATALOGO_OFICIAL_ANIMES.length} animes.`);
    }

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor Anime API ativo em: http://localhost:${PORT}`);
      console.log(`Endpoints disponiveis em:   http://localhost:${PORT}/animes`);
      console.log('----------------------------------------------------');
    });
  })
  .catch((erro) => {
    console.error('Erro de conexao com MongoDB:', erro.message);
  });
