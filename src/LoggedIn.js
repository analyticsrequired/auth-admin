import React, { Fragment, useContext } from "react";
import UserTools from "./UserTools";
import AdminTools from "./AdminTools";
import { AuthContext } from "./contexts/AuthContext";
import { Dimmer, Loader } from "semantic-ui-react";

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
