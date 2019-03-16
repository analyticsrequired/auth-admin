import React, { useContext, Fragment } from "react";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";
import { Segment, Label, Header, Divider } from "semantic-ui-react";
import LogoutButton from "./LogoutButton";
import RefreshButton from "./RefreshButton";
import TokenString from "./TokenString";

export default function UserTools() {
  const auth = useContext(AuthContext);

  if (!auth.user) {
    return <p>No user</p>;
  }

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
              <td>{auth.user.sub}</td>
              <td>
                {auth.user.permissions.length
                  ? auth.user.permissions.map(permission => (
                      <Label key={permission}>{permission}</Label>
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
              <th style={{ verticalAlign: "top" }}>Refresh Token</th>
              <td>
                <TokenString>{auth.refreshToken}</TokenString>
              </td>
            </tr>
            <tr>
              <th style={{ verticalAlign: "top" }}>Access Token</th>
              <td>
                <TokenString>{auth.accessToken}</TokenString>
              </td>
            </tr>
          </tbody>
        </Table>
        <Divider hidden />
        <LogoutButton />
        <RefreshButton />
      </Segment>
    </Fragment>
  );
}

const Table = styled.table`
  width: 100%;
  text-align: left;
`;
