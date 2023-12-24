import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Toast } from '@douyinfe/semi-ui';

import * as userApi from '@/apis/user';
import styles from './style.less';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isDisabled = !username;

  const isExisted = async (username) => {
    const res = await userApi.list({ username });
    return res.data.length > 0;
  };

  const login = ({ username }) => {
    localStorage.setItem('username', username);
    navigate('/');
  };

  const register = async (payload) => {
    await userApi.add(payload);
  };

  const onSubmit = async () => {
    const params = { username, password };

    if (!username) {
      Toast.error('请输入用户名');
      return;
    }

    if (!password) {
      Toast.error('请输入密码');
      return;
    }

    if (!confirmPassword) {
      Toast.error('请输入确认密码');
      return;
    }

    if (password !== confirmPassword) {
      Toast.error('请保证确认密码和密码一致');
      return;
    }

    setLoading(true);

    const isExist = await isExisted(username);

    if (isExist) {
      Toast.error('该账号已存在');
    } else {
      await register(params);
      await login(params);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>账号注册</h1>
      <Input
        className={styles.input}
        value={username}
        onKeyUp={(e) => e.keyCode === 13 && onSubmit()}
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
      <Input
        className={styles.input}
        type="password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder="确认密码"
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
          注册
        </Button>
      </div>
    </div>
  );
}

export default Register;
