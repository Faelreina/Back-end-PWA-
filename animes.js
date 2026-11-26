const express = require('express');
const Anime = require('../models/Anime');

const router = express.Router();

const CATALOGO_OFICIAL_ANIMES = [
  {
    titulo: 'Jujutsu Kaisen',
    arco: 'Arco do Incidente de Shibuya',
    protagonista: 'Yuji Itadori & Satoru Gojo',
    antagonista: 'Ryomen Sukuna & Kenjaku',
    genero: 'Ação Sobrenatural, Shonen',
    episodios: 47,
    nota: 9.6,
    status: 'Concluído',
    favorito: true,
    sinopse:
      'No dia 31 de outubro, uma barreira selada desce sobre a estação de Shibuya. Satoru Gojo avança sozinho e cai na armadilha definitiva de Kenjaku, desencadeando o caos que redefiniu o mundo jujutsu.',
    imagemUrl: 'https://cdn.myanimelist.net/images/anime/1792/138022l.jpg',
  },
  {
    titulo: 'Attack on Titan (Shingeki no Kyojin)',
    arco: 'Arco da Retomada de Shiganshina',
    protagonista: 'Eren Jaeger & Levi Ackerman',
    antagonista: 'Zeke Jaeger (Titã Bestial)',
    genero: 'Fantasia Sombria, Guerra, Mistério',
    episodios: 89,
    nota: 9.8,
    status: 'Concluído',
    favorito: true,
    sinopse:
      'A Divisão de Reconhecimento luta desesperadamente para selar a Muralha Maria e alcançar o porão da família Jaeger, revelando a verdade oculta sobre o mundo além das muralhas.',
    imagemUrl: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
  },
  {
    titulo: "JoJo's Bizarre Adventure",
    arco: 'Arco: Stardust Crusaders',
    protagonista: 'Jotaro Kujo & Joseph Joestar',
    antagonista: 'DIO (The World)',
    genero: 'Ação Lendária, Batalha de Stands',
    episodios: 48,
    nota: 9.8,
    status: 'Concluído',
    favorito: true,
    sinopse:
      'A histórica jornada pelo Egito para derrotar o vampiro imortal DIO e quebrar a maldição sobre a linhagem Joestar com o poder de Star Platinum.',
    imagemUrl: 'https://cdn.myanimelist.net/images/anime/11/55267l.jpg',
  },
  {
    titulo: 'Hunter x Hunter (2011)',
    arco: 'Arco das Formigas Chimera',
    protagonista: 'Gon Freecss & Killua Zoldyck',
    antagonista: 'Meruem (Rei das Formigas)',
    genero: 'Aventura, Fantasia Sombria, Shonen',
    episodios: 148,
    nota: 9.9,
    status: 'Concluído',
    favorito: true,
    sinopse:
      'O arco filosófico e visceral da invasão ao palácio de East Gorteau, a evolução moral do Rei Meruem e o sacrifício absoluto de Gon Freecss.',
    imagemUrl: 'https://cdn.myanimelist.net/images/anime/1337/99013l.jpg',
  },
  {
    titulo: 'Sousou no Frieren',
    arco: 'Arco do Exame de Magos de Primeira Classe',
    protagonista: 'Frieren & Fern',
    antagonista: 'Serie & Provas de Äußerst',
    genero: 'Aventura, Fantasia, Drama',
    episodios: 28,
    nota: 9.9,
    status: 'Concluído',
    favorito: true,
    sinopse:
      'A maga elfa Frieren participa do rigoroso teste na cidade mágica de Äußerst ao lado de Fern enquanto revisita memórias da antiga comitiva do herói Himmel.',
    imagemUrl: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
  },
  {
    titulo: 'Vinland Saga',
    arco: 'Arco do Prólogo / Ascensão de Canute',
    protagonista: 'Thorfinn Karlsefni',
    antagonista: 'Askeladd & Rei Sweyn',
    genero: 'Histórico, Seinen, Drama',
    episodios: 48,
    nota: 9.6,
    status: 'Concluído',
    favorito: true,
    sinopse:
      'Criado no campo de batalha viking jurando vingar seu pai Thors, o jovem Thorfinn busca um duelo honrado contra Askeladd sem imaginar o peso do verdadeiro caminho de um guerreiro.',
    imagemUrl: 'https://cdn.myanimelist.net/images/anime/1500/103005l.jpg',
  },
  {
    titulo: 'Fullmetal Alchemist: Brotherhood',
    arco: 'Arco do Dia Prometido',
    protagonista: 'Edward & Alphonse Elric',
    antagonista: 'Pai (Homúnculo Original)',
    genero: 'Fantasia, Ação Militar, Shonen',
    episodios: 64,
    nota: 9.9,
    status: 'Concluído',
    favorito: true,
    sinopse:
      'A conspiração secular de Amestris chega ao seu clímax durante o eclipse solar, onde os irmãos Elric lideram aliados improváveis para impedir a transmutação nacional.',
    imagemUrl: 'https://cdn.myanimelist.net/images/anime/1208/94745l.jpg',
  },
  {
    titulo: 'Death Note',
    arco: 'Arco do Confronto Kira vs L',
    protagonista: 'Light Yagami (Kira)',
    antagonista: 'L Lawliet (Detetive L)',
    genero: 'Mistério, Suspense Psicológico',
    episodios: 37,
    nota: 9.7,
    status: 'Concluído',
    favorito: false,
    sinopse:
      'Um duelo intelectual implacável entre o gênio que encontrou o caderno da morte para moldar um novo mundo e o maior detetive do planeta.',
    imagemUrl: 'https://cdn.myanimelist.net/images/anime/1079/138100l.jpg',
  },
  {
    titulo: 'Code Geass: Hangyaku no Lelouch',
    arco: 'Arco Zero Requiem',
    protagonista: 'Lelouch vi Britannia (Zero)',
    antagonista: 'Imperador Charles & Schneizel',
    genero: 'Sci-Fi, Estratégia Militar, Mecha',
    episodios: 50,
    nota: 9.6,
    status: 'Concluído',
    favorito: false,
    sinopse:
      'Armado com o poder absoluto do Geass, o príncipe exilado Lelouch lidera os Cavaleiros Negros contra o Império da Britannia em uma guerra de xadrez político.',
    imagemUrl: 'https://cdn.myanimelist.net/images/anime/1032/135088l.jpg',
  },
  {
    titulo: 'Chainsaw Man',
    arco: 'Arco do Katana Man & Segurança Pública',
    protagonista: 'Denji & Power',
    antagonista: 'Katana Man & Akane Sawatari',
    genero: 'Ação Sobrenatural, Horror Urbano',
    episodios: 12,
    nota: 9.1,
    status: 'Concluído',
    favorito: false,
    sinopse:
      'Após fundir-se com Pochita, Denji integra a Divisão Especial 4 de Caçadores de Demônios e enfrenta uma emboscada brutal que revela segredos sobre seu coração.',
    imagemUrl: 'https://cdn.myanimelist.net/images/anime/1806/126216l.jpg',
  },
  {
    titulo: 'One Piece',
    arco: 'Arco da Guerra de Marineford',
    protagonista: 'Monkey D. Luffy & Barba Branca',
    antagonista: 'Almirante Akainu & Marinha',
    genero: 'Aventura Épica, Shonen',
    episodios: 1122,
    nota: 9.9,
    status: 'Assistindo',
    favorito: true,
    sinopse:
      'A maior guerra marítima da era dos piratas no quartel-general da Marinha para resgatar Portgas D. Ace, alterando para sempre o equilíbrio dos mares.',
    imagemUrl: 'https://cdn.myanimelist.net/images/anime/1244/138851l.jpg',
  },
  {
    titulo: 'Demon Slayer (Kimetsu no Yaiba)',
    arco: 'Arco do Distrito do Entretenimento',
    protagonista: 'Tanjiro Kamado & Tengen Uzui',
    antagonista: 'Daki & Gyutaro (Lua Superior 6)',
    genero: 'Ação Histórica, Sobrenatural',
    episodios: 55,
    nota: 9.3,
    status: 'Assistindo',
    favorito: true,
    sinopse:
      'Tanjiro, Nezuko e o Hashira do Som Tengen Uzui infiltram-se no bairro de Yoshiwara para enfrentar a dupla mortífera que ocupa o posto de Lua Superior Seis.',
    imagemUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
  },
  {
    titulo: 'Bleach: Thousand-Year Blood War',
    arco: 'Arco da Guerra Sangrenta dos Mil Anos',
    protagonista: 'Ichigo Kurosaki & Rukia Kuchiki',
    antagonista: 'Yhwach & Sternritter',
    genero: 'Ação Sobrenatural, Shonen',
    episodios: 40,
    nota: 9.5,
    status: 'Assistindo',
    favorito: true,
    sinopse:
      'O exército Quincy Wandenreich invade a Soul Society, obrigando os Capitães do Gotei 13 e Ichigo Kurosaki a despertarem seus poderes definitivos.',
    imagemUrl: 'https://cdn.myanimelist.net/images/anime/1908/135431l.jpg',
  },
  {
    titulo: 'Solo Leveling',
    arco: 'Arco da Mudança de Classe & Monarca das Sombras',
    protagonista: 'Sung Jinwoo',
    antagonista: 'Igris & Rei Formiga Beru',
    genero: 'Ação, Fantasia Sombria',
    episodios: 25,
    nota: 9.2,
    status: 'Assistindo',
    favorito: false,
    sinopse:
      'Antes conhecido como o caçador mais fraco da humanidade, Sung Jinwoo recebe o Sistema secreto e evolui sozinho até comandar um exército de sombras.',
    imagemUrl: 'https://cdn.myanimelist.net/images/anime/1801/142390l.jpg',
  },
  {
    titulo: 'Naruto Shippuden',
    arco: 'Arco da Invasão de Pain',
    protagonista: 'Naruto Uzumaki (Modo Sábio)',
    antagonista: 'Pain / Nagato (Akatsuki)',
    genero: 'Ação Ninja, Shonen',
    episodios: 500,
    nota: 9.6,
    status: 'Planejo Assistir',
    favorito: true,
    sinopse:
      'Após destruir Konoha com um único Shinra Tensei, Pain confronta Naruto Uzumaki recém-chegado do Monte Myoboku no clímax emocional sobre o ciclo do ódio.',
    imagemUrl: 'https://cdn.myanimelist.net/images/anime/1565/111305l.jpg',
  },
  {
    titulo: 'Dragon Ball Z',
    arco: 'Arco de Freeza em Namekusei & Jogos de Cell',
    protagonista: 'Son Goku & Son Gohan',
    antagonista: 'Freeza & Cell Perfeito',
    genero: 'Artes Marciais, Ação Shonen',
    episodios: 291,
    nota: 9.5,
    status: 'Planejo Assistir',
    favorito: false,
    sinopse:
      'A lenda do primeiro Super Saiyajin em Namekusei e a ascensão de Gohan aos níveis além do limite contra o androide perfeito Cell.',
    imagemUrl: 'https://cdn.myanimelist.net/images/anime/1277/142022l.jpg',
  },
  {
    titulo: 'Cyberpunk: Edgerunners',
    arco: 'Arco de Night City & Tormento Cibernético',
    protagonista: 'David Martinez & Lucy',
    antagonista: 'Adam Smasher & Arasaka',
    genero: 'Sci-Fi, Cyberpunk, Drama',
    episodios: 10,
    nota: 9.4,
    status: 'Planejo Assistir',
    favorito: false,
    sinopse:
      'Um jovem marginalizado implanta o Sandevistan militar para sobreviver às ruas implacáveis de Night City como mercenário ao lado da netrunner Lucy.',
    imagemUrl: 'https://cdn.myanimelist.net/images/anime/1818/126435l.jpg',
  },
  {
    titulo: 'Mob Psycho 100',
    arco: 'Arco da Organização Garra (Claw)',
    protagonista: 'Shigeo Kageyama (Mob) & Reigen',
    antagonista: 'Toichiro Suzuki',
    genero: 'Ação Psíquica, Comédia, Sobrenatural',
    episodios: 37,
    nota: 9.4,
    status: 'Planejo Assistir',
    favorito: false,
    sinopse:
      'Quando suas emoções atingem 100%, o estudante reservado Mob libera um poder psíquico avassalador para proteger sua cidade e aprender que poderes não definem caráter.',
    imagemUrl: 'https://cdn.myanimelist.net/images/anime/8/80356l.jpg',
  },
];

// CREATE - Cadastrar novo anime
router.post('/', async (req, res) => {
  try {
    const {
      titulo,
      arco,
      protagonista,
      antagonista,
      genero,
      episodios,
      nota,
      status,
      sinopse,
      imagemUrl,
      favorito,
    } = req.body;

    if (!titulo || !protagonista) {
      return res.status(400).json({ erro: 'Título e protagonista são campos obrigatórios.' });
    }

    const novoAnime = await Anime.create({
      titulo,
      arco: arco || 'Arco Principal',
      protagonista,
      antagonista: antagonista || '',
      genero: genero || 'Ação / Shonen',
      episodios: episodios ? Number(episodios) : 24,
      nota: nota !== undefined ? Number(nota) : 9.5,
      status: status || 'Assistindo',
      sinopse: sinopse || '',
      imagemUrl: imagemUrl || '',
      favorito: Boolean(favorito),
    });

    res.status(201).json(novoAnime);
  } catch (erro) {
    console.error('Erro ao cadastrar anime:', erro);
    res.status(400).json({ erro: erro.message || 'Erro ao cadastrar anime.' });
  }
});

// READ - Listar animes com filtros, busca e ordenação
router.get('/', async (req, res) => {
  try {
    const { busca, status, favorito, ordenacao } = req.query;
    const filtro = {};

    if (status && status !== 'Todos') {
      filtro.status = status;
    }

    if (favorito === 'true') {
      filtro.favorito = true;
    }

    if (busca && busca.trim() !== '') {
      filtro.$or = [
        { titulo: { $regex: busca.trim(), $options: 'i' } },
        { arco: { $regex: busca.trim(), $options: 'i' } },
        { protagonista: { $regex: busca.trim(), $options: 'i' } },
        { antagonista: { $regex: busca.trim(), $options: 'i' } },
        { genero: { $regex: busca.trim(), $options: 'i' } },
      ];
    }

    let sort = { favorito: -1, createdAt: -1 };
    if (ordenacao === 'nota_desc') sort = { nota: -1 };
    if (ordenacao === 'episodios_desc') sort = { episodios: -1 };
    if (ordenacao === 'titulo_asc') sort = { titulo: 1 };

    const animes = await Anime.find(filtro).sort(sort);
    res.json(animes);
  } catch (erro) {
    console.error('Erro ao listar animes:', erro);
    res.status(500).json({ erro: 'Erro ao listar animes.' });
  }
});

// READ - Buscar anime por ID
router.get('/:id', async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) return res.status(404).json({ erro: 'Anime não encontrado.' });
    res.json(anime);
  } catch (erro) {
    res.status(400).json({ erro: 'ID inválido.' });
  }
});

// UPDATE - Editar anime completo
router.put('/:id', async (req, res) => {
  try {
    const animeAtualizado = await Anime.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!animeAtualizado) return res.status(404).json({ erro: 'Anime não encontrado.' });
    res.json(animeAtualizado);
  } catch (erro) {
    res.status(400).json({ erro: erro.message || 'Erro ao editar anime.' });
  }
});

// UPDATE RÁPIDO - Alternar favorito
router.patch('/:id/favorito', async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) return res.status(404).json({ erro: 'Anime não encontrado.' });
    anime.favorito = !anime.favorito;
    await anime.save();
    res.json(anime);
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao alternar favorito.' });
  }
});

// DELETE - Excluir anime por ID
router.delete('/:id', async (req, res) => {
  try {
    const anime = await Anime.findByIdAndDelete(req.params.id);
    if (!anime) return res.status(404).json({ erro: 'Anime não encontrado.' });
    res.json({ mensagem: 'Anime excluído com sucesso!', id: req.params.id });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao excluir anime.' });
  }
});

// SEED - Restaurar/Popular catálogo com os 18 animes oficiais
router.post('/seed', async (req, res) => {
  try {
    await Anime.deleteMany({});
    const inseridos = await Anime.insertMany(CATALOGO_OFICIAL_ANIMES);

    res.status(201).json({
      mensagem: 'Catálogo de animes populado com sucesso!',
      total: inseridos.length,
      animes: inseridos,
    });
  } catch (erro) {
    console.error('Erro ao popular animes:', erro);
    res.status(500).json({ erro: 'Erro ao popular dados.' });
  }
});

module.exports = router;
module.exports.CATALOGO_OFICIAL_ANIMES = CATALOGO_OFICIAL_ANIMES;
