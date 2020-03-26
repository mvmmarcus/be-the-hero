
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary(); //chave primaria obrigatoria
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable(); // "2" é o tamanho do texto, só usar quando eui souber essa info
    })
  };
  
exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
  };
  
  // metodo up: o que eu quero fazer, down: oque fazer caso dê algum problema
