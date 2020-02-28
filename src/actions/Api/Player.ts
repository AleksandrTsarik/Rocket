import axios from "axios";
import * as Action from "..";

export default class User {
  public static async register(data: any) {
    const Response = await axios.get(
      process.env.API_URL +
        "player/create" +
        "?email=" +
        data.email +
        "&firstName=" +
        data.name +
        "&lastName=" +
        data.secondname +
        "&city_id=" +
        data.city_id
    );
    return Action.Store.Player.create(Response.data);
  }
  public static async sendStats(data: any) {
    await axios.get(
      process.env.API_URL +
        "player/stats" +
        "&id=" +
        data.id +
        "&time=" +
        data.time +
        "&misstakes=" +
        data.misstakes
    );
  }
}
