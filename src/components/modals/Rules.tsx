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
            <h1 className="title">Game rules</h1>
            <div className="text">
              <p>
                In order to assemble the puzzle, you need to place the code fragments correctly
                within one minute
              </p>
              <p>
                If you lose, you can continue from where you left off, and the countdown will be
                restored.
              </p>
              <p>For each incorrect attempt, you lose 5 seconds.</p>
            </div>
            <div className="btn-box">
              <button
                className="btn btn-primary btn-block btn-md"
                onClick={() => {
                  this.props.Dispatch(Middleware.Game.start(this.props.Store.Player.id));
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
