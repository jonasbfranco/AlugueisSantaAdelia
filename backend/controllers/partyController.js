const PartyModel = require('../models/Party');

const checkPartyBudget = (budget, services) => {
    const priceSum = services.reduce((sum, service) => sum + service.price, 0);

    // console.log(priceSum, budget);

    if (priceSum > budget) {
        return false;
    }

    return true;
};

const partyController = {

    create: async(req, res) => {
        try {

            const party   = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
            }; 

            // BUDGET < VALOR DOS SERVIÇOS != NOVO SERVICO
            if (party.services && !checkPartyBudget(party.budget, party.services)) {
                res.status(406).json({msg: "O seu orçamento é insuficiente."});
                return;
            }

            const response = await PartyModel.create(party);

            res.status(201).json({response, msg: "Festa criada com sucesso!"});

            
        } catch (error) {
            console.log(error);
        }
    },

    getAll: async (req, res) => {
        try {
            const parties = await PartyModel.find();

            res.status(200).json({parties, msg: 'Festas encontradas com sucesso!'});
        } catch (error) {
            console.log(error);
        }
    },

    getById: async(req, res) => {
        try {
            const id = req.params.id;
            const party = await PartyModel.findById(id);

            if(!party) {
                res.status(404).json({msg: 'Festa não encontrada.'});
                return;
            }
            
            res.status(200).json({party, msg: 'Festa encontrada com sucesso!'});
        } catch (error) {
            console.log(error);
        }
    },

    delete: async(req, res) => {
        try {
            const id = req.params.id;
            const party = await PartyModel.findById(id);

            if(!party) {
                res.status(404).json({msg: 'Festa não encontrada.'});
                return;
            }

            const deleteParty = await PartyModel.findByIdAndDelete(id);

            res.status(200).json({deleteParty, msg: 'Festa excluída com sucesso'});

        } catch (error) {
            console.log(error);
        }
    },

    update: async(req, res) => {
        try {
            const id = req.params.id;

            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
            };


            // BUDGET < VALOR DOS SERVIÇOS != NOVO SERVICO
            if (party.services && !checkPartyBudget(party.budget, party.services)) {
                res.status(406).json({msg: "O seu orçamento é insuficiente."});
                return;
            }

            const updateParty = await PartyModel.findByIdAndUpdate(id, party);

            if(!updateParty) {
                res.status(404).json({msg: 'Festa não encontrada.'});
                return;
            }

            res.status(200).json({party, msg: 'Festa atualizada com sucesso'});


        } catch (error) {
            console.log(error);
        }
    }


};

module.exports = partyController;