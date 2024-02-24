import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Typography, Toast } from '@douyinfe/semi-ui';
import * as userApi from '@/apis/user';
import router from '@/router';

import styles from './style.less';

const { Text } = Typography;

function Login() {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    setLoading(true);
    const res = await userApi.login({ username, password });
    setLoading(false);

    if (res.code !== 0) {
      Toast.error('账号或密码错误');
      return;
    }

    if (res.code === 0) {
      localStorage.setItem('token', res.data);
      // TODO: 接入token后，需要去掉username
      localStorage.setItem('username', username);
      router.navigate('/');
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const isDisabled = !username.trim();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>微习惯</h1>
      <Input
        ref={inputRef}
        className={styles.input}
        value={username}
        onKeyUp={onSubmit}
        onChange={setUsername}
        placeholder="账号"
      />
      <Input
        className={styles.input}
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="密码"
      />
      <div>
        <Button
          block
          theme="solid"
          type="primary"
          loading={loading}
          disabled={isDisabled}
          onClick={onSubmit}
        >
          登录
        </Button>
      </div>
      <div style={{ textAlign: 'right', marginTop: 5, marginRight: 5 }}>
        <Text link={{ href: '#register' }}>注册</Text>
      </div>
    </div>
  );
}

export default Login;
