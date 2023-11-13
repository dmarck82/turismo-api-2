var express = require('express');
var router = express.Router();
const Avaliacao = require('../models/Avaliacao');
const { default: mongoose } = require('mongoose');

/* Procurar por ID. */
router.get('/:id', async function(req, res, next) {
    const { id } = req.params;
  
    try{
      new mongoose.Types.ObjectId(id);
    }catch(err) {
      return res.status(400).json({ message: 'ID inválido'});
    }
  
    const avaliacao = await  Avaliacao.findById(id);
    
    return avaliacao ? res.json(avaliacao) : res.status(404).json({ message: "ID inexistente"});
  });

/* Procurar todas.*/
router.get('/', async function(req, res) {
    const avaliacao = await Avaliacao.find(); 
  
    return res.json(avaliacao);
  });


/* Criar uma nova avaliacao */
router.post('/', async function(req, res) {
  const avaliacao = req.body;
  
  const result = await Avaliacao.create(avaliacao);

  return res.json(result);
});

/* Atualizar por id*/
router.put('/:id', async (req, res) => {
    const avaliacaoJson = req.body;
    const { id } = req.params;
  
    try{
      new mongoose.Types.ObjectId(id);
    }catch(err) {
      return res.status(400).json({ message: 'ID inválido'});
    }
  
    const avaliacaoConfere = await  Avaliacao.findById(id);
    
    if(avaliacaoConfere) {
      avaliacaoJson.updatedAt = new Date();
      avaliacaoJson.createdAt = avaliacaoConfere.createdAt;
  
      // Fazer a validação dos atributos do objeto
      const hasErrors = new Avaliacao(avaliacaoJson).validateSync();
      if(hasErrors) return res.status(400).json(hasErrors);
  
      await Avaliacao.updateOne({ _id: id}, avaliacaoJson);
      return res.json(avaliacaoJson);
    }
  
    return avaliacao ? res.json(avaliacao) : res.status(404).json({ message: "ID inexistente"});
});

/* Deletar por id*/
router.delete('/:id', async function(req, res, next) {
    const { id } = req.params;
  
    try{
      new mongoose.Types.ObjectId(id);
    }catch(err) {
      return res.status(400).json({ message: 'ID inválido'});
    }
  
    const result = await  Avaliacao.deleteOne({ _id: id});
    
    return result.deletedCount > 0 ? res.send() : res.status(404).json({ message: "ID inexistente"});
  });

module.exports = router;
