import { Model, ModelObject } from "objection";
import { OrdersModel } from "./order";

export class UsersModel extends Model {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return "users";
  }
  static get relationMappings() {
    return {
      orders: {
        relation: Model.HasManyRelation,
        modelClass: OrdersModel,
        join: {
          from: "orders.user_id",
          to: "users.id",
        },
      },
    };
  }
}

export type Articles = ModelObject<UsersModel>;
