import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Middleware from "../../middlewares";

interface PropsInterface {
  location: any;
  Store: any;
  Dispatch: any;
}

class Rules extends React.Component<PropsInterface> {
  public render() {
    return (
      <>
        <div className="modal-background">
          <div className="modal">
            <h1 className="title">Правила игры</h1>
            <div className="text">
              <p>
                Для того чтобы собрать пазл, вам нужно правильно расставить фрагменты кода в течение
                одной минуты
              </p>
              <p>
                В случае проигрыша вы можете продолжить с того места на котором остановились, отсчет
                времени будет восстановлен.
              </p>
              <p>За каждую неверную попытку вы теряете 5 секунд.</p>
            </div>
            <div className="btn-box">
              <button
                className="btn btn-primary btn-block btn-md"
                onClick={() => {
                  this.props.Dispatch(Middleware.Modal.close());
                }}
              >
                ok
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(
  connect(
    (Store: any) => {
      return { Store };
    },
    (Dispatch: any) => {
      return { Dispatch: (action: any) => Dispatch(action) };
    }
  )(Rules)
);
