import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { AuthContext } from "./AuthContext";

export default function LogoutButton() {
  const auth = useContext(AuthContext);

  function onClick(e) {
    e.preventDefault();
    auth.logout();
  }

  return <Button onClick={onClick}>Logout</Button>;
}
