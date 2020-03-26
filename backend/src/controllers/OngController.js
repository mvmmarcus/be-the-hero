const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    
    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    async create(request, response) {

        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX'); // gerar um id para as ongs com 4 caracteres hexadecimais

        await connection('ongs').insert({ //inserir dados dentro do banco
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return response.json({ id }); //devolvendo apenas o id pq é a unica info que a ong precisa saber para se conectar na aplicação

    }
};