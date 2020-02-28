import { bestResult } from '../../utils/configs';
export default class Game {
  public static readonly CREATE = "GAME_CREATE";
  public static readonly START = "GAME_START";
  public static readonly FINISH = "GAME_FINISH";
  public static readonly STATUS = "GAME_STATUS";
  public static readonly CLEAR = "GAME_CLEAR";
  public static readonly BEST = "GAME_BEST";

  public static create(data: any) {
    return {
      data,
      type: Game.CREATE,
    };
  }
  public static bestResult(data: any) {
    return {
      data,
      type: Game.BEST,
    };
  }

  public static start(data: any) {
    return {
      data,
      type: Game.START,
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
