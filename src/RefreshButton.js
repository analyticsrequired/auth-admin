import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { AuthContext } from "./contexts/AuthContext";
import { LoadingContext } from "./contexts/LoadingContext";

export default function RefreshButton(props) {
  const { buttonComponent: ButtonComponent = Button, ...buttonProps } = props;

  const auth = useContext(AuthContext);
  const loading = useContext(LoadingContext);

  async function onClick(e) {
    e.preventDefault();

    loading.setIsLoading(true);

    await auth.refresh();

    loading.setIsLoading(false);
  }

  return (
    <ButtonComponent {...buttonProps} onClick={onClick}>
      Refresh
    </ButtonComponent>
  );
}
