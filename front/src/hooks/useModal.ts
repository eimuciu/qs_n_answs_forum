import { useState, useEffect } from 'react';

function useModal() {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [showMessage]);

  const makeMessage = (msg: string, type: string) => {
    setMessage(msg);
    setMessageType(type);
    setShowMessage(true);
  };

  return { makeMessage, message, showMessage, messageType };
}

export default useModal;
