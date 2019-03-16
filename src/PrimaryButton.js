import React from "react";
import { Button } from "semantic-ui-react";

export default function PrimaryButton(props) {
  const { children, ...buttonProps } = props;
  return (
    <Button {...buttonProps} color="purple">
      {children}
    </Button>
  );
}
