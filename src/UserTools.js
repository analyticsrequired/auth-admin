import React, { useContext, Fragment } from "react";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";
import { Segment, Label, Header, Divider } from "semantic-ui-react";
import LogoutButton from "./LogoutButton";
import TokenString from "./TokenString";

export default function UserTools() {
  const auth = useContext(AuthContext);

  return (
    <Fragment>
      <Segment>
        <Header as="h2">User</Header>
        <Table>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Permissions</th>
            </tr>
            <tr>
              <td>{auth.user.id}</td>
              <td>
                {auth.user.permissions.length
                  ? auth.user.permissions.map(permission => (
                      <Label>{permission}</Label>
                    ))
                  : "-"}
              </td>
            </tr>
          </tbody>
        </Table>
      </Segment>

      <Segment>
        <Header as="h2">Session</Header>
        <Table>
          <tbody>
            <tr>
              <th style={{ verticalAlign: "top" }}>Token</th>
              <td>
                <TokenString>{auth.token}</TokenString>
              </td>
            </tr>
          </tbody>
        </Table>
        <Divider hidden />
        <LogoutButton />
      </Segment>
    </Fragment>
  );
}

const Table = styled.table`
  width: 100%;
  text-align: left;
`;
