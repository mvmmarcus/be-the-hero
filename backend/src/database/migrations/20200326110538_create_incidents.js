
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments() //chave primaria auto incremente

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable(); //relacionamento com a ong

        table.foreign('ong_id').references('id').inTable('ongs'); //chave estrangeira, obrigatória para relacionamento com a chave id das ongs
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
