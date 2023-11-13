const mongoose = require('mongoose');

const AvaliacaoSchema = new mongoose.Schema({
  pessoa: { type: Object, required: true },
  passeioId: { type: Number, required: true },
  comentario: { type: String, required: true },
  nota: { type: Number, required: true, min: 1, max: 5 }
});


module.exports = mongoose.model('Avaliacao', AvaliacaoSchema, 'avaliacao');