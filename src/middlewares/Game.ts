import * as Models from "../models";
import * as Store from "../actions/Store";

export default class Game {
  public static initialData() {
    return async (dispatch: any) => {
      new Models.Game()
        .initialData()
        .then((data: any) => {
          localStorage.setItem("settings", JSON.stringify(data.settings));
          localStorage.setItem("top", JSON.stringify(data.bestResults));
          localStorage.setItem("questions", JSON.stringify(data.questions));
        })
        .catch((Exception: any) => {
          console.log("ethernet is done for initialData", Exception);
        });
    };
  }
  public static uploadGameDate(data: any) {
    return async () => {
      new Models.Game()
        .uploadGameDate(data)
        .then((data: any) => {
          console.log(data);
          if (data.status === "success") {
          } else {
            console.log("save to local");
            localStorage.clear();
          }
        })
        .catch((Exception: any) => {
          console.log("ethernet is done for uploadGameDate:", Exception);
        });
    };
  }

  // old middlewares
  public static start(data: any) {
    return async (dispatch: any) => {
      new Models.Game()
        .start(data)
        .then((data: any) => {
          // save config to storage
          dispatch(Store.Game.start(data.questions));
          dispatch(Store.Game.config(data.config));
          dispatch(Store.Game.best(data.bestResults));
          dispatch(Store.Game.status("start"));

          // TODO: remove before backend runup
          localStorage.setItem("settings", JSON.stringify(data.config));
          localStorage.setItem("top", JSON.stringify(data.bestResults));
          localStorage.setItem("questions", JSON.stringify(data.questions));
        })
        .catch((Exception) => {});
    };
  }
  public static send(data: any) {
    return async (dispatch: any) => {
      const getGame = localStorage.getItem("games");
      let games = [];
      if (getGame !== undefined) {
        games = getGame ? JSON.parse(getGame) : [];
        games.push(data);
      } else {
        games = [data];
      }
      new Models.Game()
        .send(games)
        .then((data: any) => {
          if (data.status === "success") {
            localStorage.removeItem("games");
          }
        })
        .catch((Exception) => {
          const getGame = localStorage.getItem("games");
          const games = getGame ? JSON.parse(getGame) : [];
          games.push(data);
          localStorage.setItem("games", JSON.stringify(games));
        });
    };
  }
  public static clear() {
    return async (dispatch: any) => {
      dispatch(Store.Game.clear());
    };
  }
}
