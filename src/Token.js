import React, { useContext, Fragment } from "react";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";
import { Button } from "semantic-ui-react";

export default function Token() {
  const auth = useContext(AuthContext);

  function onClick(e) {
    e.preventDefault();
    auth.logout();
  }

  return (
    <Fragment>
      <Table>
        <tbody>
          <tr>
            <th>Token</th>
            <td>
              <TokenString>{auth.token}</TokenString>
            </td>
          </tr>
          <tr>
            <th>Authorization Header</th>
            <td>
              <TokenString>JWT {auth.token}</TokenString>
            </td>
          </tr>
          <tr>
            <th>User</th>
            <td>{auth.user.id}</td>
          </tr>
          <tr>
            <th>Permissions</th>
            <td>{auth.user.permissions.join(", ")}</td>
          </tr>
        </tbody>
      </Table>

      <hr />

      <Button onClick={onClick}>Logout</Button>
    </Fragment>
  );
}

const Table = styled.table`
  width: 100%;
  text-align: left;
`;

const TokenString = styled.span`
  padding: 0;
  margin: 0;
  border-bottom: 1px dotted #333;
  font-family: monospace;
`;
