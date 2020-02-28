import ModelPrototype, { Method } from "./ModelPrototype";

export default class Player extends ModelPrototype {
  public async create(data: any): Promise<any[]> {
    try {
      return this.withUrl("player/create")
        .setMethod(Method.POST)
        .request(data);
    } catch (Exception) {
      throw Exception;
    }
  }
}
