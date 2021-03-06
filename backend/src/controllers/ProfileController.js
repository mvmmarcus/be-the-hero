const connection = require('../database/connection');

module.exports = {

    async index(request, response) {

        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents') //buscandoo todos os incidentes de uma ong especifica
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidents);
    }

}