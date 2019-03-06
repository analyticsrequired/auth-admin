import React, { useContext, Fragment } from "react";
import { AuthContext } from "./AuthContext";

export default function Token() {
  const auth = useContext(AuthContext);

  function onClick(e) {
    e.preventDefault();
    auth.logout();
  }

  return (
    <Fragment>
      <table>
        <tbody>
          <tr>
            <th>Token</th>
            <td>{auth.token}</td>
          </tr>
          <tr>
            <th>User</th>
            <td>{auth.user.id}</td>
          </tr>
          <tr>
            <th>Permissions</th>
            <td>{auth.user.permissions}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={onClick}>Logout</button>
    </Fragment>
  );
}
