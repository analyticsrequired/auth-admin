import React, { Fragment } from "react";
import UserTools from "./UserTools";
import AdminTools from "./AdminTools";

export default function Token() {
  return (
    <Fragment>
      <UserTools />
      <AdminTools />
    </Fragment>
  );
}
