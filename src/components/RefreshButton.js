import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { AuthContext } from "../contexts/AuthContext";

export default function RefreshButton(props) {
  const { buttonComponent: ButtonComponent = Button, ...buttonProps } = props;

  const auth = useContext(AuthContext);

  async function onClick(e) {
    e.preventDefault();

    await auth.refresh();
  }

  return (
    <ButtonComponent {...buttonProps} onClick={onClick}>
      Refresh
    </ButtonComponent>
  );
}
