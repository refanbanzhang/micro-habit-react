import request from '@/shared/request';

/**
 * @typedef {Object} Daily
 * @property {string} _id
 * @property {string} date
 * @property {string} name
 * @property {string} username
 */

/**
 * @typedef {Object} ApiResponse
 * @property {number} code
 * @property {any} data
 */

/**
 * @typedef {Object} DailyApiResponse
 * @extends {ApiResponse}
 * @property {Daily[]} data
 */

/**
 * 列表
 * @param {Object} params
 * @param {string} [params._id]
 * @param {string} [params.date]
 * @param {string} [params.name]
 * @param {string} [params.username]
 * @returns {DailyApiResponse}
 */
export const list = (params) => request({
  method: 'get',
  url: '/daily/list',
  params,
});

/**
 * 新增
 * @param {Object} data
 * @param {string} data.date
 * @param {string} data.name
 * @param {string} data.username
 * @returns {ApiResponse}
 */
export const add = (data) => request({
  method: 'post',
  url: '/daily/add',
  data,
});
