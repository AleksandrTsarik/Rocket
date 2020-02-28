import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import * as Component from "../components";

interface PropsInterface {
  location: any;
  Store: any;
  Dispatch: any;
}

class Page extends React.Component<PropsInterface, {}> {
  public render() {
    return (
      <>
        {true ? (
          <>
            <Route path="/" exact={true} component={Component.Page.Preview} />
            <Route path="/registration" component={Component.Page.Registration} />
            <Route path="/game" component={Component.Page.Game} />
          </>
        ) : (
          <>Загрузка...</>
        )}
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
  )(Page)
);
