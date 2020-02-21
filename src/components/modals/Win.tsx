import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as Middleware from "../../middlewares";

interface PropsInterface {
  location: any;
  Store: any;
  Dispatch: any;
  history: any;
}

class Win extends React.Component<PropsInterface> {
  public render() {
    return (
      <>
        <div className="modal-background">
          <div className="modal modal-with-console modal-win">
            <div className="title">Good job!</div>
            <div className="result">
              <div>Your Result:</div>
              <div className="distance">
                Distance <span>1500 pc</span>
              </div>
              <div className="questions">
                Correct questions: <span>5 (10)</span>
              </div>
            </div>
            <div className="best-result">
              <div>Best Result:</div>
              <div className="distance">
                Distance <span>3000 pc</span>
              </div>
              <div className="questions">
                Correct questions: <span>9 (10)</span>
              </div>
            </div>
            {/* <div className="console">
              <div className="info-green">Сompiled successfully! </div>
              <p className="souvenir">Take a souvenir with a SEMrush firewall</p>
              <p>Press enter to exit ...</p>
            </div> */}
            <div className="btn-box">
              <Link
                to="preview"
                className="btn btn-primary btn-md btn-block"
                onClick={() => {
                  this.props.Dispatch(Middleware.Modal.closeAll());
                  this.props.Dispatch(Middleware.Player.clear());
                  this.props.Dispatch(Middleware.Game.clear());
                  this.props.history.push("/preview");
                }}
              >
                exit
              </Link>
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
  )(Win)
);
