import React, { useContext, useState, Fragment } from "react";
import { Form, Message, Input, Header, Segment } from "semantic-ui-react";
import { ErrorContext } from "../contexts/ErrorContext";
import { AuthContext } from "../contexts/AuthContext";
import { LoadingContext } from "../contexts/LoadingContext";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import GrantForm from "./GrantForm";

export default function GetUser(props) {
  const auth = useContext(AuthContext);
  const errors = useContext(ErrorContext);
  const loading = useContext(LoadingContext);

  const [userId, setUserId] = useState("");

  const [user, setUser] = useState();

  async function onSubmit(e) {
    e.preventDefault();

    loading.setIsLoading(true);

    const userResponse = await auth.getUser(userId);
    setUser(userResponse);

    loading.setIsLoading(false);

    setUserId("");
  }

  function onClickClear(e) {
    e.preventDefault();
    setUser();
  }

  const onChange = updateFn => e => updateFn(e.target.value);

  return (
    <Fragment>
      {user ? (
        <Fragment>
          <Header as="h4">{user.userId}</Header>

          <Segment>
            <Header as="h5">Grant</Header>

            <GrantForm user={user} />

            <SecondaryButton basic onClick={onClickClear}>
              Clear
            </SecondaryButton>
          </Segment>
        </Fragment>
      ) : (
        <Form onSubmit={onSubmit}>
          {errors.getUserError ? (
            <Message negative>{errors.getUserError}</Message>
          ) : null}

          <Form.Field>
            <Input
              type="text"
              label="User Id"
              value={userId}
              autoFocus
              required
              onChange={onChange(setUserId)}
            />
          </Form.Field>

          <PrimaryButton basic>Get User</PrimaryButton>
        </Form>
      )}
    </Fragment>
  );
}
