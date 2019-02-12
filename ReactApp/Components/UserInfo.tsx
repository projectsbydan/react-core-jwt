import * as React from "react";

export interface UserInfoProps {}

export interface UserInfoState {}

class UserInfo extends React.Component<UserInfoProps, UserInfoState> {
  constructor(props: UserInfoProps) {
    super(props);
  }
  render() {
    return <div style={{ margin: "30px auto" }}>User email: kommt noch</div>;
  }
}

export default UserInfo;
