const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'O título do anime é obrigatório.'],
      trim: true,
    },
    arco: {
      type: String,
      required: [true, 'O arco lendário em destaque é obrigatório.'],
      trim: true,
      default: 'Arco Principal',
    },
    protagonista: {
      type: String,
      required: [true, 'O protagonista é obrigatório.'],
      trim: true,
    },
    antagonista: {
      type: String,
      trim: true,
      default: '',
    },
    genero: {
      type: String,
      required: [true, 'O gênero é obrigatório.'],
      trim: true,
      default: 'Ação / Shonen',
    },
    episodios: {
      type: Number,
      default: 24,
      min: [1, 'O número de episódios deve ser no mínimo 1.'],
    },
    nota: {
      type: Number,
      default: 9.5,
      min: [0, 'Nota mínima é 0.'],
      max: [10, 'Nota máxima é 10.'],
    },
    status: {
      type: String,
      enum: {
        values: ['Assistindo', 'Concluído', 'Planejo Assistir'],
        message: '{VALUE} não é um status válido.',
      },
      default: 'Assistindo',
    },
    sinopse: {
      type: String,
      trim: true,
      default: '',
    },
    imagemUrl: {
      type: String,
      trim: true,
      default: '',
    },
    favorito: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Anime', animeSchema);
