import React from "react";
import { UserLogin } from "../../Generated/api";

interface ILoginContext {
  login: UserLogin | null;
  setLogin: (login: UserLogin | null) => void;
}

export const LoginContext = React.createContext<ILoginContext>({
  login: null,
  setLogin: () => {}
});
