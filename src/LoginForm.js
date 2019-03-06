import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Form, Message, Input, Button } from "semantic-ui-react";

export default function LoginForm() {
  const auth = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    auth.login(username, password);
  }

  return (
    <Form onSubmit={onSubmit}>
      <Message>
        <p>Please login</p>
      </Message>
      <Form.Field>
        <Input
          type="text"
          label="Username"
          id="username"
          value={username}
          autoFocus
          onChange={e => setUsername(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <Input
          type="password"
          label="Password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Field>

      <Button>Login</Button>
    </Form>
  );
}
