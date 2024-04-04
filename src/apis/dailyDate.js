import request from '@/apis/request';

/**
 * @typedef {Object} DailyDate
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
 * @typedef {Object} DailyDateApiResponse
 * @extends {ApiResponse}
 * @property {DailyDate[]} data
 */

/**
 * 列表
 * @param {Object} data
 * @param {string} [data._id]
 * @param {string} [data.date]
 * @param {string} [data.name]
 * @returns {DailyDateApiResponse}
 */
export const list = (data) => request({
  method: 'post',
  url: '/dailyDate/list',
  data,
});

/**
 * 新增
 * @param {Object} data
 * @param {string} data.date
 * @param {string} data.name
 * @returns {ApiResponse}
 */
export const add = (data) => request({
  method: 'post',
  url: '/dailyDate/add',
  data,
});

/**
 * 删除
 * @param {Object} data
 * @param {string} data.date
 * @param {string} data.name
 * @returns {ApiResponse}
 */
export const del = (data) => request({
  method: 'post',
  url: '/dailyDate/del',
  data,
});
