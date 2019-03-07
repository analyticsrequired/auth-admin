import React, { useContext, Fragment } from "react";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";
import { Segment } from "semantic-ui-react";
import LogoutButton from "./LogoutButton";

export default function Token() {
  const auth = useContext(AuthContext);

  return (
    <Fragment>
      <Segment>
        <Table>
          <tbody>
            <tr>
              <th style={{ verticalAlign: "top" }}>Token</th>
              <td>
                <TokenString>{auth.token}</TokenString>
              </td>
            </tr>
            <tr>
              <th style={{ verticalAlign: "top" }}>Authorization Header</th>
              <td>
                <TokenString>JWT {auth.token}</TokenString>
              </td>
            </tr>
            <tr>
              <th>Username</th>
              <td>{auth.user.id}</td>
            </tr>
            <tr>
              <th>Permissions</th>
              <td>{auth.user.permissions.join(", ")}</td>
            </tr>
          </tbody>
        </Table>
      </Segment>

      <LogoutButton />
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
  font-family: monospace;
  word-break: break-all;
`;
