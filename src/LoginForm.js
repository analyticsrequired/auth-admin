import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Form, Message, Input, Button } from "semantic-ui-react";

export default function LoginForm() {
  const auth = useContext(AuthContext);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    setLoading(true);

    await auth.login(userId, password);

    setLoading(false);
    setUserId("");
    setPassword("");
  }

  const onChange = updateFn => e => updateFn(e.target.value);

  return (
    <Form onSubmit={onSubmit}>
      {auth.loginError ? <Message negative>{auth.loginError}</Message> : null}

      <Form.Field>
        <Input
          type="text"
          label="User Id"
          value={userId}
          autoFocus
          required
          disabled={loading}
          onChange={onChange(setUserId)}
        />
      </Form.Field>
      <Form.Field>
        <Input
          type="password"
          label="Password"
          value={password}
          required
          disabled={loading}
          onChange={onChange(setPassword)}
        />
      </Form.Field>

      <Button>{loading ? "Logging in..." : "Login"}</Button>
    </Form>
  );
}
