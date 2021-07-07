import React, { FC } from "react";
import { UserInfo } from "../api/APIinterface";

export interface UserInfoProp {
  userInfo: UserInfo[];
}

const UserInfo: FC<UserInfoProp> = (props) => {
  const { userInfo } = props;

  const usernameAndAge =
    userInfo === null
      ? null
      : userInfo.map((user) => (
          <tr key={user.username}>
            <td className="text-left">{user.username}</td>
            <td className="text-right">{user.age}</td>
          </tr>
        ));

  return (
    <div className="user-info d-flex row justify-content-center flex-column text-center align-items-center">
      <h1>All users</h1>
      <h4>users and their age</h4>
      <table className="table table-striped username">
        <thead className="thead-dark">
          <tr>
            <th className="text-left" scope="col">
              Username
            </th>
            <th className="text-right" scope="col">
              Age
            </th>
          </tr>
        </thead>
        <tbody>{usernameAndAge}</tbody>
      </table>
    </div>
  );
};

export default UserInfo;
