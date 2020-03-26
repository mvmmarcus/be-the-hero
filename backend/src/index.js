const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express(cors()); // serve para segurar quem poderá assesar essa api, como estamos em desenvolvimento, pode ficra só assim, que ai qualquer lugar do localhost pode acessar (front)

/**
 * Se estivessemos em produção, seria importante definir no cors quem poderia acessar essa api, que no caso é o local onde
 * o frontend está hospedado (ex: meuapp.com.br), no cors ficaria assim:
 * app.use(cors({
 *      origin: 'meuapp.com.br'
 * }))
 *  
 */

app.use()

app.use(express.json());
app.use(routes);

/*
* DRIVER: SELECT * FROM users (pega tudo da tabela users)
* Query Builder: table('users').select('*').where() - forma utilizando Js, (essa forma é boa pq é global para tds bancos SQL)
* KNEX.JS - Query Builder que iremos utilizar
*/

// ENTIDADES: TUDO AQUILO QUE REPRESENTA ALGO QUE SERÁ SALVO NO BANCO DE DADOS, EX: ONGS, CASOS. ONDE 1 ONG PODE TER VÁRIOS CASOS

/*
FUNCIONALIDADES:
WEB:
ONGS: {
    LOGIN,
    LOGOUT,
    SE CADASTRAR NO SISTEMA,
    CADASTRAR CASOS,
    LISTAR CASOS,
    DELETAR CASOS
    }
MOBILE:
    {
        LISTAR TODOS OS CASOS,
        ENTRAR EM CONTATO COM A ONG
    }
*/

app.listen(3333);