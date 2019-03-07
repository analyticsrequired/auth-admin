import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Form, Message, Input, Button } from "semantic-ui-react";

export default function LoginForm() {
  const auth = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await auth.login(username, password, setError);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e.message);
      setUsername("");
      setPassword("");
    }
  }

  const onChange = updateFn => e => updateFn(e.target.value);

  return (
    <Form onSubmit={onSubmit}>
      {error ? <Message negative>{error}</Message> : null}

      <Form.Field>
        <Input
          type="text"
          label="Username"
          value={username}
          autoFocus
          required
          disabled={loading}
          onChange={onChange(setUsername)}
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
