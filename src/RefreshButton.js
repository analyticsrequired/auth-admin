import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { AuthContext } from "./AuthContext";
import PrimaryButton from "./PrimaryButton";

export default function RefreshButton(props) {
  const { buttonComponent: ButtonComponent = Button, ...buttonProps } = props;
  const auth = useContext(AuthContext);

  function onClick(e) {
    e.preventDefault();
    auth.refresh();
  }

  return (
    <ButtonComponent {...buttonProps} onClick={onClick}>
      Refresh
    </ButtonComponent>
  );
}
