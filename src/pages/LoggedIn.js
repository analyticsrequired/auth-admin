import React, { Fragment, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import UserTools from "../components/UserTools";
import AdminTools from "../components/AdminTools";

export default function Token() {
  const auth = useContext(AuthContext);

  const existingRefreshToken = window.localStorage.getItem("ar_refresh_token");

  if (existingRefreshToken) {
    auth.refresh(existingRefreshToken);
  }

  return auth.accessToken ? (
    <Fragment>
      <UserTools />
      <AdminTools />
    </Fragment>
  ) : null;
}
