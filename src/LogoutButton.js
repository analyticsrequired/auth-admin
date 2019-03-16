import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { AuthContext } from "./AuthContext";

export default function LogoutButton(props) {
  const { buttonComponent: ButtonComponent = Button, ...buttonProps } = props;
  const auth = useContext(AuthContext);

  function onClick(e) {
    e.preventDefault();
    auth.logout();
  }

  return (
    <ButtonComponent {...buttonProps} onClick={onClick}>
      Logout
    </ButtonComponent>
  );
}
