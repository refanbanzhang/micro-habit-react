import request from '@/apis/request';

/**
 * @typedef {Object} DailyTask
 * @property {string} _id
 * @property {string} name
 * @property {string} [link]
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
 * @param {Object} data
 * @param {string} [data._id]
 * @param {string} [data.name]
 * @param {string} [data.link]
 * @returns {DailyTaskApiResponse}
 */
export const list = (data) => request({
  method: 'post',
  url: '/dailyTask/list',
  data,
});

/**
 * 新增
 * @param {Object} data
 * @param {string} data.name
 * @param {string} [data.link]
 * @param {string} data.period
 * @returns {ApiResponse}
 */
export const add = (data) => request({
  method: 'post',
  url: '/dailyTask/add',
  data,
});

/**
 * 删除
 * @param {Object} data
 * @param {string} data.id
 * @returns {ApiResponse}
 */
export const del = (data) => request({
  method: 'post',
  url: '/dailyTask/del',
  data,
});

/**
 * 更新
 * @param {Object} data
 * @param {string} data.id
 * @param {string} data.name
 * @param {string} [data.link]
 * @returns {ApiResponse}
 */
export const update = (data) => request({
  method: 'post',
  url: '/dailyTask/update',
  data,
});
