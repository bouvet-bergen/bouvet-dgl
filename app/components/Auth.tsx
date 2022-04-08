import type { ReactElement, ReactNode } from "react";
import { createContext, useContext } from "react";

export type AuthProps = {
  allowed: boolean | undefined;
  children: ReactNode | ReactNode[];
};

type ChildProps = {
  children: ReactNode | ReactNode[];
};

type AuthContextType = {
  allowed: boolean | undefined;
};

const AuthContext = createContext({} as AuthContextType);
const useAuthContext = (): AuthContextType =>
  useContext<AuthContextType>(AuthContext);

export default function Auth({ allowed, children }: AuthProps): ReactElement {
  return (
    <AuthContext.Provider value={{ allowed }}>{children}</AuthContext.Provider>
  );
}

export function Allowed({ children }: ChildProps): ReactElement | null {
  const { allowed } = useAuthContext();

  if (!allowed) {
    return null;
  } else {
    return <>{children}</>;
  }
}

export function NotAllowed({ children }: ChildProps): ReactElement | null {
  const { allowed } = useAuthContext();

  if (allowed) {
    return null;
  } else {
    return <>{children}</>;
  }
}
