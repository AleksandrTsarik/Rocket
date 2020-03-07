import ModelPrototype, { Method } from "./ModelPrototype";

export default class Player extends ModelPrototype {
  public async initialData(): Promise<any[]> {
    try {
      return this.withUrl("initialData")
        .setMethod(Method.POST)
        .request();
    } catch (Exception) {
      throw Exception;
    }
  }
  public async uploadGameDate(data: any): Promise<any[]> {
    try {
      return this.withUrl("uploadGameDate")
        .setMethod(Method.POST)
        .request(data);
    } catch (Exception) {
      throw Exception;
    }
  }

  // old models
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
  public async send(data: any): Promise<any[]> {
    try {
      return this.withUrl("game/save-result")
        .setMethod(Method.POST)
        .request(data);
    } catch (Exception) {
      throw Exception;
    }
  }
}
