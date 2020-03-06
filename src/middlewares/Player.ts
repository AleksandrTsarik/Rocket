import * as Models from "../models";
import * as Store from "../actions/Store";

export default class Player {
  /**
   * Регистрируем юзера
   *
   * @return function(Dispatch)->User
   */
  public static create(data: any) {
    return async (dispatch: any) => {
      new Models.Player()
        .create(data)
        .then((data: any[]) => {
          dispatch(Store.Player.create(data.data));
        })
        .catch((Exception) => {});
    };
  }

  public static result(data: any) {
    return (dispatch: any) => {
      dispatch(Store.Player.result(data));
    };
  }

  /**
   * Очистить юзера
   *
   * @return function(Dispatch)->User
   */
  public static clear() {
    return async (Dispatch: any) => {
      Dispatch(Store.Player.clear());
    };
  }
}
