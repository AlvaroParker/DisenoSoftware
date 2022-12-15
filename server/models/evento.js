const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  imagen: String,
  plataforma: String,
  lanzamiento: String
});

module.exports = mongoose.model('Evento', eventoSchema);
