import { createContext, FC, ReactNode, useState, useMemo, useEffect, memo } from 'react';

interface IAuthContext{
    user: string | null,
    setUser: (value: string | null) => void
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: (value: string | null) => {},
});

interface IAuthProvider{
    children: ReactNode
}

const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [user, setUser] = useState<string | null>(() => localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null);

  const authProviderValues = useMemo(() => ({ user: user, setUser: setUser }), [user]);

  useEffect(() => {
  },[user]);

  return(
    <AuthContext.Provider
      value={authProviderValues}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default memo(AuthProvider);