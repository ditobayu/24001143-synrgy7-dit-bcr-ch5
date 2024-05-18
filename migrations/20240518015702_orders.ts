import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("orders", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("users");
    table.integer("car_id").unsigned().notNullable();
    table.foreign("car_id").references("id").inTable("cars");
    table.integer("price").notNullable();
    table.string("status").notNullable();
    table.dateTime("start_rent").notNullable();
    table.dateTime("finish_rent");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("orders");
}
