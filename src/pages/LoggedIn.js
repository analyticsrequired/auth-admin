import React, { Fragment, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import UserTools from "../components/UserTools";
import AdminTools from "../components/AdminTools";

export default function Token() {
  const auth = useContext(AuthContext);

  const existingRefreshToken = window.localStorage.getItem("ar_refresh_token");

  if (existingRefreshToken && !auth.user) {
    auth.refresh(existingRefreshToken);
  }

  return auth.user ? (
    <Fragment>
      <UserTools />
      <AdminTools />
    </Fragment>
  ) : null;
}
