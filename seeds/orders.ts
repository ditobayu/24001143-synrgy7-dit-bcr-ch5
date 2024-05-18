import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("orders").del();

  // Inserts seed entries
  await knex("orders").insert([
    {
      user_id: 1,
      car_id: 1,
      price: 1000,
      status: "active",
      start_rent: new Date(),
      finish_rent: new Date(),
    },
    {
      user_id: 1,
      car_id: 2,
      price: 2000,
      status: "active",
      start_rent: new Date(),
      finish_rent: new Date(),
    },
    {
      user_id: 1,
      car_id: 3,
      price: 3000,
      status: "active",
      start_rent: new Date(),
      finish_rent: new Date(),
    },
  ]);
}
