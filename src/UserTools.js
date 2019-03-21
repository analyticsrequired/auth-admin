import React, { useContext, Fragment } from "react";
import styled from "styled-components";
import { Segment, Label, Header, Divider } from "semantic-ui-react";
import { AuthContext } from "./contexts/AuthContext";
import LogoutButton from "./LogoutButton";
import RefreshButton from "./RefreshButton";
import TokenString from "./TokenString";
import TimeAgo from "react-timeago";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import Reveal from "./Reveal";

export default function UserTools() {
  const auth = useContext(AuthContext);

  if (!auth.user) {
    return <p>No user</p>;
  }

  return (
    <Fragment>
      <Segment color="purple">
        <Header as="h2">User Tools</Header>

        <Segment>
          <Header as="h3">Identity</Header>
          <Table>
            <tbody>
              <tr>
                <th>UserId</th>
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
          <Header as="h3">Session</Header>
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
                  <Reveal>
                    <TokenString>{auth.accessToken}</TokenString>
                  </Reveal>
                </td>
                <td style={{ verticalAlign: "top", textAlign: "right" }}>
                  <TimeAgo date={auth.user.exp * 1000} />
                </td>
              </tr>
            </tbody>
          </Table>
          <Divider hidden />
          <LogoutButton basic buttonComponent={PrimaryButton} />
          <RefreshButton basic buttonComponent={SecondaryButton} />
        </Segment>
      </Segment>
    </Fragment>
  );
}

const Table = styled.table`
  width: 100%;
  text-align: left;
`;
