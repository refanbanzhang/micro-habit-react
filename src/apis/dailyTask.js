import request from '@/shared/request';

/**
 * @typedef {Object} DailyTask
 * @property {string} _id
 * @property {string} name
 * @property {string} username
 */

/**
 * @typedef {Object} ApiResponse
 * @property {number} code
 * @property {any} data
 */

/**
 * @typedef {Object} DailyTaskApiResponse
 * @extends {ApiResponse}
 * @property {DailyTask[]} data
 */

/**
 * 列表
 * @param {Object} params
 * @param {string} [params._id]
 * @param {string} [params.name]
 * @returns {DailyTaskApiResponse}
 */
export const list = (params) => request({
  method: 'get',
  url: '/dailyTask/list',
  params,
});

/**
 * 新增
 * @param {Object} data
 * @param {string} data.name
 * @returns {ApiResponse}
 */
export const add = (data) => request({
  method: 'post',
  url: '/dailyTask/add',
  data,
});
