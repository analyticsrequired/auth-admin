import React from "react";
import { Button } from "semantic-ui-react";

export default function SecondaryButton(props) {
  const { children, ...buttonProps } = props;

  return (
    <Button {...buttonProps} color="orange">
      {children}
    </Button>
  );
}
