import ModelPrototype, { Method } from "./ModelPrototype";

export default class Player extends ModelPrototype {
  public async create(data: any): Promise<any[]> {
    try {
      return this.withUrl("game/start")
        .setMethod(Method.POST)
        .request(data);
    } catch (Exception) {
      throw Exception;
    }
  }
  public async start(data: any): Promise<any[]> {
    try {
      return this.withUrl("game/start")
        .setMethod(Method.POST)
        .request(data);
    } catch (Exception) {
      console.log("baaad")
      throw Exception;
    }
  }
  public async finish(data: any): Promise<any[]> {
    try {
      return this.withUrl("game/finish")
        .setMethod(Method.POST)
        .request(data);
    } catch (Exception) {
      throw Exception;
    }
  }
}
