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
  console.log('🚀 ~ file: AuthContext.tsx:24 ~ user', user);

  const authProviderValues = useMemo(() => ({ user: user, setUser: setUser }), [user]);
  console.log('🚀 ~ file: AuthContext.tsx:26 ~ authProviderValues', authProviderValues);

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