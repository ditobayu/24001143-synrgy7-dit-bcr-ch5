import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert([
    {
      name: "Toyota Avanza",
      category: "MPV",
      price: 200000,
      color: "White",
      year: 2019,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Toyota Innova",
      category: "MPV",
      price: 300000,
      color: "Black",
      year: 2020,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Toyota Fortuner",
      category: "SUV",
      price: 500000,
      color: "Black",
      year: 2021,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Toyota Alphard",
      category: "MPV",
      price: 1000000,
      color: "White",
      year: 2021,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Toyota Vellfire",
      category: "MPV",
      price: 1200000,
      color: "Black",
      year: 2021,
      image: "https://via.placeholder.com/150",
    },
  ]);
}
