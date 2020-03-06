import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as Middleware from "../../middlewares";

interface PropsInterface {
  location: any;
  Store: any;
  Dispatch: any;
}

class Preview extends React.Component<PropsInterface, {}> {
  constructor(Props: PropsInterface) {
    super(Props);
    this.state = {};
  }

  public componentDidMount() {
    document.title = process.env.SITE_NAME + " | Preview";
    this.props.Dispatch(Middleware.Modal.closeAll());
    this.props.Dispatch(Middleware.Player.clear());
    this.props.Dispatch(Middleware.Game.clear());
    // get settings, questions and bestResult
  }

  public render() {
    return (
      <>
        <Link to="/registration" className="invisibleScreen">
          <h3 id="blink">TAP TO CONTINUE</h3>
        </Link>
        <div className="container">
          <div className="inner">
            <h1>SEMrush’s rocket</h1>
            <div className="logo-box">
              <div className="logo" />
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
  )(Preview)
);
