
const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        // query para paginação
        const { page = 1 } = request.query;

        // query para contagem de casos
        const [count] = await connection('incidents').count(); //nesse metodo count eu posso selecionar qual campo eu quero contar, como não especifiquei nada, ele conta todos os casos em geral

        // usar [count] faz com que ele me retorne apenas a primeira posição do array, que no caso é meu contador

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // juntando dados de uma tabela a outra (usamos para relacionar as informações das ongs com os seus casos)
            .limit(5) // limita a exibição de 5 casos pro pagina
            .offset((page - 1) * 5) // esquema para ele pegar sempre 5 casos por page (preciso desse esquema pra ele exibir os primeiros 5 casos tb, e nao só a partir do quinto)
            .select([
                'incidents.*', // pego todas as infos da tabela incidents e abaixo escolho quias eu quero pegar da tabela ongs (fiz isso pro id das ongs nao sobrepor o dos casos)
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']); // como enviar pro front o total de casos que temos, para que possa ser feita a paginação

        return response.json(incidents);
    },

    async create(request, response) {

        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({ //esse id pega o primeiro valor dessa resposta, que no caso só tem o valor, que é o header id
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id }); //devolvendo apenas o id pq é a unica info que a ong precisa saber para se conectar na aplicação

    },

    async delete(request, response) {

        const { id } = request.params; // pra saber qual caso quero apagar
        const ong_id = request.headers.authorization; // PRA VERIFICAR SE A ONG QUE ESTÁ QUERENDO DELETAR UM CASO É REALMENTE PROPRIETARIA DESSE CASO

        const incident = await connection('incidents')
            .where('id', id) // quando o 'id' do incident for igual ao id selecioando para exlusão (la no front pelo params)
            .select('ong_id') // selecionando apenas a coluna ong_id, pq é o que me interessa
            .first(); //como eu sei que existe apenas um caso, para cada id, posso usar esse first()

        if (incident.ong_id !== ong_id) { // "se o ong_id do caso que estou querendo excluir for diferente do ong_id que está logado"
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); // quando preciso retornar uma resposta pro front que deu sucesso, mas nao tem conteudo
    }
};