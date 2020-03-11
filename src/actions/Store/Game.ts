export default class Game {
  public static readonly STATUS = "GAME_STATUS";
  public static readonly CLEAR = "GAME_CLEAR";
  public static readonly BEST = "GAME_BEST";
  public static readonly CONFIG = "GAME_CONFIG";
  public static readonly QUESTIONS = "GAME_QUESTIONS";

  public static config(data: any) {
    return {
      data,
      type: Game.CONFIG,
    };
  }
  public static best(data: any) {
    return {
      data,
      type: Game.BEST,
    };
  }

  public static questions(data: any) {
    return {
      data,
      type: Game.QUESTIONS,
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
