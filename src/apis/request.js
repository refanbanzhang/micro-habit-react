import axios from 'axios';
import router from "@/router";
import { logout } from "@/shared/utils";

const instance = axios.create({
  baseURL: 'https://fc-mp-5fa4a496-0aa2-45a9-b89c-4054536ad7e7.next.bspapp.com',
  timeout: 5000,
});

const request = (query) => {
  const token = localStorage.getItem('token');
  return instance({
    ...query,
    headers: {
      token,
    },
    data: {
      token,
      ...query.data ?? {}
    },
    params: {
      token,
      ...query.params ?? {},
    },
  }).then((res) => {
    if (res.data?.error?.message === '登录过期') {
      logout();
      router.navigate("/login");
      return;
    }
    return res.data
  });
};

// 发送 POST 请求
// request({
//   method: 'post',
//   url: '/user/add',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone',
//   },
// });

export default request;
