const Tache = require("../models/tache_model")

// Creation et enregistrement d'une tache

const createTache = async(req, res) =>{
    const tache = new Tache(req.body)
    try {
        const result = await tache.save()
        res.status(201).send({data: result})
    } catch (error) {
        res.status(500).send({
            error: error,
            message : "erreur lors d'ajour de la tache"
        })
    }
}

module.exports = {
    createTache,
}