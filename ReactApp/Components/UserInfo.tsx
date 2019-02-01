import * as React from "react";
import { AuthentificationConsumer } from "../Contexts/Authentification";

export interface UserInfoProps {}

export interface UserInfoState {}

class UserInfo extends React.Component<UserInfoProps, UserInfoState> {
  constructor(props: UserInfoProps) {
    super(props);
  }
  render() {
    return (
      <AuthentificationConsumer>
        {value => {
          return (
            <div style={{ margin: "30px auto" }}>
              User email: {value.userLogin.email}
            </div>
          );
        }}
      </AuthentificationConsumer>
    );
  }
}

export default UserInfo;
