import * as Models from "../models";
import * as Store from "../actions/Store";

export default class Game {
  public static start(data: any) {
    return async (dispatch: any) => {
      new Models.Game()
        .start(data)
        .then((data: any[]) => {
          dispatch(Store.Game.start(data.questions));
          dispatch(Store.Game.config(data.config));
          dispatch(Store.Game.best(data.bestResults));
          dispatch(Store.Game.status("start"));
        })
        .catch((Exception) => {});
    };
  }

  public static best() {
    return async (dispatch: any) => {
      new Models.Game()
        .best()
        .then((data: any[]) => {
          dispatch(Store.Game.best(data));
        })
        .catch((Exception) => {});
    };
  }

  public static send(data: any) {
    return async (dispatch: any) => {
      new Models.Game()
        .send(data)
        .then(() => {})
        .catch((Exception) => {});
    };
  }

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
