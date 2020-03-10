import * as Models from "../models";
import * as Store from "../actions/Store";

export default class Player {
  /**
   * Регистрируем юзера
   *
   * @return function(Dispatch)->User
   */
  public static create(data: any) {
    return async (Dispatch: any) => {
      Dispatch(Store.Player.create(data));
      localStorage.setItem("player", JSON.stringify(data));
    };
  }

  public static result(data: any) {
    return (dispatch: any) => {
      dispatch(Store.Player.result(data));
    };
  }

  /**
   * Очистить юзера, наигрался
   *
   * @return function(Dispatch)->User
   */
  public static clear() {
    return async (Dispatch: any) => {
      Dispatch(Store.Player.clear());
    };
  }
}
