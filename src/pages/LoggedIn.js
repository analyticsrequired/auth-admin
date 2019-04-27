import React, { Fragment, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import UserTools from "../components/UserTools";
import AdminTools from "../components/AdminTools";

export default function Token() {
  const auth = useContext(AuthContext);

  if (auth.existingRefreshToken && !auth.user) {
    auth.refresh(auth.existingRefreshToken);
  }

  return auth.user ? (
    <Fragment>
      <UserTools />
      <AdminTools />
    </Fragment>
  ) : null;
}
