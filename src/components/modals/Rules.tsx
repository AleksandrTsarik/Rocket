import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Middleware from "../../middlewares";
import * as Store from "../../actions/Store";

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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est vel eos quam inventore
                officiis iusto perferendis totam quo esse asperiores!
              </p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus, eligendi!</p>
              <p> Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="btn-box">
              <button
                className="btn btn-primary btn-block btn-md"
                onClick={() => {
                  this.props.Dispatch(Store.Game.status("start"))
                  this.props.Dispatch(Middleware.Modal.close());
                }}
              >
                Close modal
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
