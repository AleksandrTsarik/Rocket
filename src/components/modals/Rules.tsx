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
                Answer questions in the allotted time. The reward for questions depends on their
                complexity.
              </p>
              <p>For the wrong answer, they will take your time.</p>
              <p>Good luck!</p>
            </div>
            <div className="btn-box">
              <button
                className="btn btn-primary btn-block btn-md"
                onClick={() => {
                  this.props.Dispatch(Middleware.Game.status("start"));
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
