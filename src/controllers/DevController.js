const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async getAll(req, res) {
        const devs = await Dev.find();

        return res.status(200).json({ object: devs });
    },

    async getOne(req, res) {
        const dev = await Dev.findOne({ github_username: req.params.name });

        if(!dev) return res.status(404).json({ message: 'Dev não existente' });

        return res.status(200).json({ object: dev });
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if(dev) return res.status(400).json({ message: 'Dev já existente' });

        const apiRes = await axios.get(`https://api.github.com/users/${req.body.github_username}`);

        const { name = login, avatar_url, bio } = apiRes.data;

        const techArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };

        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techArray,
            location
        });

        return res.status(200).json({ message: 'Dev cadastrado com sucesso', object: dev});
    },

    async update(req, res) {
        let dev = await Dev.findOne({ github_username: req.params.name });

        if(!dev) return res.status(404).json({ message: 'Dev não existente' });

        if(req.body.github_username) delete req.body.github_username;

        await Object.assign(dev, req.body).save();

        return res.status(200).json({ message: 'Dev atualizado com sucesso', object: dev});
    },

    async destroy(req, res) {
        const dev = await Dev.findOneAndRemove({ github_username: req.params.name });

        if(!dev) return res.status(404).json({ message: 'Dev não existente' });

        return res.status(200).json({ message: 'Dev deletado com sucesso', object: dev});
    }
};