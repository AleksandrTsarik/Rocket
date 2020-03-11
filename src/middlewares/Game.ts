import * as Models from "../models";
import * as Store from "../actions/Store";

export default class Game {
  public static initialData() {
    return async (dispatch: any) => {
      new Models.Game()
        .initialData()
        .then((data: any) => {
          dispatch(Store.Game.config(data.data.settings));
          dispatch(Store.Game.best(data.data.top));
          dispatch(Store.Game.questions(data.data.questions));
        })
        .catch((Exception: any) => {});
    };
  }
  public static uploadGameData(data: any) {
    return async () => {
      new Models.Game()
        .uploadGameData([data])
        .then((data: any) => {})
        .catch((Exception: any) => {});
    };
  }

  public static status(status: string) {
    return async (dispatch: any) => {
      dispatch(Store.Game.status(status));
    };
  }
  public static clear() {
    return async (dispatch: any) => {
      dispatch(Store.Game.clear());
    };
  }
}
