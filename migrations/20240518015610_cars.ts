import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("category").notNullable();
    table.integer("price").notNullable();
    table.string("color").notNullable();
    table.integer("year").notNullable();
    table.string("image");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars");
}
