import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { AuthContext } from "./AuthContext";

export default function RefreshButton() {
  const auth = useContext(AuthContext);

  function onClick(e) {
    e.preventDefault();
    auth.refresh();
  }

  return <Button onClick={onClick}>Refresh</Button>;
}
