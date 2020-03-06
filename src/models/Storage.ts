import ModelPrototype, { Method } from "./ModelPrototype";

export default class Storage extends ModelPrototype {
  public async getLastResult(): Promise<any[]> {
    try {
      return this.withUrl("storage/lastgame")
        .setMethod(Method.POST)
        .request();
    } catch (Exception) {
      throw Exception;
    }
  }
  public async upload(data: any): Promise<any[]> {
    try {
      return this.withUrl("storage/upload")
        .setMethod(Method.GET)
        .request(data);
    } catch (Exception) {
      throw Exception;
    }
  }
}
