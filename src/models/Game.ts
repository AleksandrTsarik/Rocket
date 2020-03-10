import ModelPrototype, { Method } from "./ModelPrototype";

export default class Game extends ModelPrototype {
  public async initialData(): Promise<any[]> {
    try {
      return this.withUrl("initialData")
        .setMethod(Method.GET)
        .request();
    } catch (Exception) {
      throw Exception;
    }
  }
  public async uploadGameDate(data: any): Promise<any[]> {
    try {
      return this.withUrl("saveResults")
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
