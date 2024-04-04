import request from '@/apis/request';

/**
 * @typedef {Object} User
 * @property {string} _id
 * @property {string} username
 * @property {string} password
 * @property {string} phone
 * @property {string} email
 * @property {string[]} images
 */

/**
 * @typedef {Object} ApiResponse
 * @property {number} code
 * @property {any} data
 */

/**
 * @typedef {Object} UserApiResponse
 * @extends {ApiResponse}
 * @property {User[]} data
 */

/**
 * 查询用户列表
 * @param {Object} data
 * @param {string} [data._id]
 * @param {string} [data.username]
 * @param {string} [data.password]
 * @param {string} [data.phone]
 * @param {string} [data.email]
 * @returns {UserApiResponse}
 */
export const list = (data) => request({
  method: 'post',
  url: '/user/list',
  data,
});

/**
 * 新增用户
 * @param {Object} data
 * @param {string} data.username
 * @param {string} data.password
 * @returns {ApiResponse}
 */
export const add = (data) => request({
  method: 'post',
  url: '/user/add',
  data,
});

/**
 * 登录
 * @param {Object} data
 * @param {string} data.username
 * @param {string} data.password
 * @returns {ApiResponse}
 */
export const login = (data) => request({
  method: 'post',
  url: '/user/login',
  data,
});

/**
 * 修改密码
 * @param {Object} data
 * @param {string} data.username
 * @param {string} data.password
 * @param {string} data.newPassword
 * @returns {ApiResponse}
 */
export const updatePassword = (data) => request({
  method: 'post',
  url: '/user/updatePassword',
  data,
});