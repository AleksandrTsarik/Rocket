export default class Player {
  public static readonly CREATE = "PLAYER_CREATE";
  public static readonly CLEAR = "PLAYER_CLEAR";
  public static readonly SEND = "PLAYER_SEND";

  public static create(data: any) {
    return {
      data,
      type: Player.CREATE,
    };
  }

  public static send(data: any) {
    return {
      data,
      type: Player.SEND,
    };
  }

  public static clear() {
    return {
      type: Player.CLEAR,
    };
  }
}
