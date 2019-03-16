import React, { useContext, Fragment } from "react";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";
import { Segment, Label, Header, Divider } from "semantic-ui-react";
import LogoutButton from "./LogoutButton";
import RefreshButton from "./RefreshButton";
import TokenString from "./TokenString";
import TimeAgo from "react-timeago";

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
          <colgroup>
            <col style={{ width: "50%" }} />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th>Access Token</th>
              <th style={{ textAlign: "right" }}>Expiration</th>
            </tr>
            <tr>
              <td style={{ verticalAlign: "top" }}>
                <TokenString>{auth.accessToken}</TokenString>
              </td>
              <td style={{ verticalAlign: "top", textAlign: "right" }}>
                <TimeAgo date={auth.user.exp * 1000} />
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
