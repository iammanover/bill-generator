import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthentication = () => {
  return useContext(AuthContext);
};
