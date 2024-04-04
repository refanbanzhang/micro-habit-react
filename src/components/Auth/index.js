import { useState, useEffect } from 'react';
import { isLogged } from '@/shared/utils'
import router from '@/router';

function Auth(props) {
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    if (isLogged()) {
      setIsAuthed(true);
    } else {
      router.navigate('/login');
    }
  }, []);

  return isAuthed ? props.children : null;
}

export default Auth;
