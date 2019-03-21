import React, { Fragment, useContext } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { AuthContext } from "./contexts/AuthContext";
import UserTools from "./components/UserTools";
import AdminTools from "./components/AdminTools";

export default function Token() {
  const auth = useContext(AuthContext);

  return auth.user ? (
    <Fragment>
      <UserTools />
      <AdminTools />
    </Fragment>
  ) : (
    <Dimmer active inverted>
      <Loader />
    </Dimmer>
  );
}
