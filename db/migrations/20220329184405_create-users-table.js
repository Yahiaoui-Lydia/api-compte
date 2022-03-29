exports.up = async knex => {
    await knex.schema.createTable("users", (table)=> {
          table.increments("id");
          table.string("email").unique().notNullable();
          table.string("username");
          table.string("password").notNullable();
          table.string("role");
          table.string("code");

          }
      )
  };
  
  exports.down = async knex => {
      await knex.schema.dropTableIfExists("users")
  };