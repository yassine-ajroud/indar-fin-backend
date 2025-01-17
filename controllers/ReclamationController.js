const Reclamation = require('../models/Reclamation');
//const moment = require('moment')

exports.createReclamation = async (req, res) => {
  try {
    const { user, sales, reference ,price,address} = req.body;

    const newReclamation = new Reclamation({
      user,
      sales,
      reference,
      address,
      price
    });
     await newReclamation.save();
  //   let details={
  //     from:"ajroudyassine06@gmail.com",
  //     to:emaill,
  //     subject:"commande ajouter",
  //     text:`Votre commande "${reference}" a été ajoutée avec succès et est en attente d'approbation`
  
  // };
  // let  mailTransporter= nodemailer.createTransport({
  //     service:"gmail",auth:{user:"ajroudyassine06@gmail.com",pass:"lbma ovqq xhtdfihe",}
  // }); 
  //            mailTransporter.sendMail(details,(err)=>{ if(err){ 
  //             console.status(500).log("it has an error",err) ;
  //            } 
  //             })
    res.status(201).json({ message: 'Réclamation créée avec succès', reclamation: newReclamation });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la réclamation', error: error.message });
  }
};

exports.getAllReclamations = async (req, res) => {
  try {
    const usr = req.params.id;
    const reclamations = await Reclamation.find({user:usr});
    res.status(200).json(reclamations);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des réclamations', error: error.message });
  }
};

exports.getReclamationById = async (req, res) => {
  try {
    const reclamation = await Reclamation.findById(req.params.id);
    if (!reclamation) {
      return res.status(404).json({ error: 'Réclamation non trouvée.' });
    }
    res.status(200).json(reclamation);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la réclamation', error: error.message });
  }
};

exports.updateReclamation = async (req, res) => {
  try {
    const reclamation = await Reclamation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reclamation) {
      return res.status(404).json({ error: 'Réclamation non trouvée.' });
    }
    res.status(200).json(reclamation);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la réclamation', error: error.message });
  }
};

exports.deleteReclamation = async (req, res) => {
  try {
    const reclamation = await Reclamation.findByIdAndRemove(req.params.id);
    if (!reclamation) {
      return res.status(404).json({ error: 'Réclamation non trouvée.' });
    }
    res.status(200).json({ message: 'Réclamation supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la réclamation', error: error.message });
  }
};
