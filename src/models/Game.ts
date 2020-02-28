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
      return this.withUrl("game/questions")
        .setMethod(Method.GET)
        .request(data);
    } catch (Exception) {
      throw Exception;
    }
  }
  public async bestResult(): Promise<any[]> {
    try {
      return this.withUrl("game/best")
        .setMethod(Method.GET)
        .request();
    } catch (Exception) {
      throw Exception;
    }
  }

  public async send(data: any): Promise<any[]> {
    try {
      return this.withUrl("game/save-result")
        .setMethod(Method.POST)
        .request(data);
    } catch (Exception) {
      throw Exception;
    }
  }
  
  public async finish(data: any): Promise<any[]> {
    try {
      return this.withUrl("game/save-result")
        .setMethod(Method.POST)
        .request(data);
    } catch (Exception) {
      throw Exception;
    }
  }
}
