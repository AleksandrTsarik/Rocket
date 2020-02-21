export default class Game {
  public static readonly CREATE = "GAME_CREATE";
  public static readonly FINISH = "GAME_FINISH";
  public static readonly STATUS = "GAME_STATUS";
  public static readonly CLEAR = "GAME_CLEAR";

  public static create(data: any) {
    return {
      data,
      type: Game.CREATE,
    };
  }

  public static finish(data: any) {
    return {
      data,
      type: Game.FINISH,
    };
  }

  public static clear() {
    return {
      type: Game.CLEAR,
    };
  }

  public static status(data: any) {
    return {
      data,
      type: Game.STATUS,
    };
  }
}
