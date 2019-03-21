import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { ErrorContext } from "./ErrorContext";
import { LoadingContext } from "./LoadingContext";
import { Form, Message, Input } from "semantic-ui-react";
import PrimaryButton from "./PrimaryButton";

export default function LoginForm() {
  const auth = useContext(AuthContext);
  const errors = useContext(ErrorContext);
  const loader = useContext(LoadingContext);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e) {
    e.preventDefault();

    loader.setIsLoading(true);

    await auth.login(userId, password);

    loader.setIsLoading(false);

    setUserId("");
    setPassword("");
  }

  const onChange = updateFn => e => updateFn(e.target.value);

  return (
    <Form onSubmit={onSubmit}>
      {errors.loginError ? (
        <Message negative>{errors.loginError}</Message>
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

      <Form.Field>
        <Input
          type="password"
          label="Password"
          value={password}
          required
          onChange={onChange(setPassword)}
        />
      </Form.Field>

      <PrimaryButton basic>Login</PrimaryButton>
    </Form>
  );
}
