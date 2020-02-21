import * as Models from "../models";
import * as Store from "../actions/Store";
import * as Middleware from "../middlewares";

export default class Game {
  /**
   * Создать сеанс игры
   *
   * @return function(Dispatch)->Game
   */
  public static create(data: any) {
    return async (dispatch: any) => {
      new Models.Game()
        .create(data)
        .then((data: any[]) => {
          dispatch(Store.Game.create(data.data));
          dispatch(Middleware.Game.status("start"));
        })
        .catch((Exception) => {});
    };
  }

  /**
   * Отправка результатов
   *
   * @return function(Dispatch)->Game
   */
  public static finish(data: any) {
    return async (dispatch: any) => {
      new Models.Game()
        .finish(data)
        .then((data: any[]) => {
          dispatch(Store.Game.finish(data.data));
        })
        .catch((Exception) => {});
    };
  }

  /**
   * Установка игрового таймера
   *
   * @return function(Dispatch)->Game
   */
  public static setTimes(data: any) {
    return (Dispatch: any) => {
      Dispatch(Store.Game.setTimes(data));
    };
  }
}
