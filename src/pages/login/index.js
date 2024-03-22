import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button, Input, Typography, Toast } from '@douyinfe/semi-ui';
import * as userApi from '@/apis/user';
import router from '@/router';

const { Text } = Typography;

const cacheUsername = 'cacheUsername';
const cachePassword = 'cachePassword';

function Login() {
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const initialUsername = localStorage.getItem(cacheUsername) || '';
  const initialPassword = localStorage.getItem(cachePassword) || '';

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(initialUsername);
  const [password, setPassword] = useState(initialPassword);

  const login = useCallback(async () => {
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

      localStorage.setItem(cacheUsername, username);
      localStorage.setItem(cachePassword, password);
      router.navigate('/');
    }
  }, [username, password]);

  const onSubmit = useCallback(() => {
    if (!username) {
      Toast.error('请输入用户名');
      usernameInputRef.current?.focus();
      return;
    }

    if (!password) {
      Toast.error('请输入密码');
      passwordInputRef.current?.focus();
      return;
    }

    login()
  }, [login, username, password])

  useEffect(() => {
    const onKeyup = (e) => {
      if (e.key === 'Enter') {
        onSubmit();
      }
    }
    window.addEventListener('keyup', onKeyup)

    return () => {
      window.removeEventListener('keyup', onKeyup)
    }
  }, [onSubmit])

  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  const isDisabled = !username.trim();

  return (
    <div className="mx-auto px-[20px] pt-[120px] pb-[20px]">
      <h1 className="mb-[20px] text-[16px] text-center tracking-[5px]">微习惯</h1>
      <Input
        ref={usernameInputRef}
        className="mb-[15px]"
        value={username}
        onChange={setUsername}
        placeholder="账号"
      />
      <Input
        ref={passwordInputRef}
        className="mb-[15px]"
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
      <div className="text-right mt-[5px] mr-[5px]">
        <Text link={{ href: '#register' }}>注册</Text>
      </div>
    </div>
  );
}

export default Login;
