import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://fc-mp-5fa4a496-0aa2-45a9-b89c-4054536ad7e7.next.bspapp.com',
  timeout: 3000,
});

const request = (query) => {
  const token = localStorage.getItem('token');
  return instance({
    ...query,
    params: {
      token,
      ...query.params,
    },
  }).then((res) => res.data);
};

// 发送 GET 请求
// request({
//   method: 'get',
//   url: '/user/list',
//   params: {
//     ID: 12345,
//   },
// });

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
