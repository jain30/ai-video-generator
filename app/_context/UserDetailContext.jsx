import { createContext } from "react";

// export const UserDetailContext=createContext();
export const UserDetailContext = createContext({
  userDetail: null,
  setUserDetail: () => {},
});
