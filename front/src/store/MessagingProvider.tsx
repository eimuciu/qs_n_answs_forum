import { useContext, createContext } from 'react';
import useModal from '../hooks/useModal';

const AuthContext = createContext({});

interface Props {
  children: JSX.Element;
}

function MessagingProvider({ children }: Props) {
  const { makeMessage, message, showMessage, messageType } = useModal();

  const ctx = { makeMessage, message, showMessage, messageType };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
}

export function useMsgCtx(): any {
  return useContext(AuthContext);
}

export default MessagingProvider;
