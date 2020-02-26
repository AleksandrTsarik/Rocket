import * as Models from "../models";
import * as Store from "../actions/Store";
import { questions, config, bestResult } from "../utils/configs";

export default class Game {
  /**
   * Создать сеанс игры
   *
   * @return function(Dispatch)->Game
   */
  public static start(data: any) {
    return async (dispatch: any) => {
      dispatch(
        Store.Game.start({
          questions,
          time: config.time,
          game_id: 11,
          fall: config.fall,
          bestResult,
        })
      );
      dispatch(Store.Game.status("start"));
      // TODO: когда будет бек
      // new Models.Game()
      //   .start(data)
      //   .then((data: any[]) => {
      //     dispatch(Store.Game.status("start"));
      //     dispatch(Store.Game.start(data.data));
      //   })
      //   .catch((Exception) => {});
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

  public static clear() {
    return async (dispatch: any) => {
      dispatch(Store.Game.clear());
    };
  }
}
