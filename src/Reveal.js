import React, { useState, Fragment } from "react";
import { Icon } from "semantic-ui-react";

export default function Reveal(props) {
  const [show, setShow] = useState(false);

  const unhide = e => {
    e.preventDefault();

    setShow(true);
  };

  const hide = e => {
    e.preventDefault();

    setShow(false);
  };

  return show ? (
    <Fragment>
      {props.children} <Icon bordered link onClick={hide} name="hide" />
    </Fragment>
  ) : (
    <Icon bordered link onClick={unhide} name="unhide" />
  );
}
