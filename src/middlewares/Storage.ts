import * as Models from "../models";
import * as Store from "../actions/Store";

export default class Storage {
  /**
   * Взять последнюю игру
   *
   * @return function(Dispatch)->Storage
   */
  public static getLastResult() {
    return async (dispatch: any) => {
      new Models.Storage()
        .getLastResult()
        .then((data: any[]) => {
          // проверить последнюю дату игры
          // по необходимости выслать storage, и почистить его
        })
        .catch((Exception) => {});
    };
  }
  /**
   * Отправить пачку последних игр
   *
   * @return function(Dispatch)->Storage
   */
  public static upload(data: any) {
    return async (dispatch: any) => {
      new Models.Storage()
        .upload(data)
        .then((data: any[]) => {
          // отпрвались ли игры, если да - почистить storage браузера
        })
        .catch((Exception) => {});
    };
  }
}
