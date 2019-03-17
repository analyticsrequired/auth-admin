import React, { useContext, useState, Fragment } from "react";
import { AuthContext } from "./AuthContext";
import { LoadingContext } from "./LoadingContext";
import { Form, Message, Input, Divider, Header } from "semantic-ui-react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import GrantForm from "./GrantForm";

export default function GetUser(props) {
  const auth = useContext(AuthContext);
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

          <GrantForm user={user} />

          <SecondaryButton basic onClick={onClickClear}>
            Clear
          </SecondaryButton>
        </Fragment>
      ) : (
        <Form onSubmit={onSubmit}>
          {auth.getUserError ? (
            <Message negative>{auth.getUserError}</Message>
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
