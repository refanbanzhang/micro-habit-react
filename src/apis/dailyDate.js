import request from '@/shared/request';

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
 * @param {Object} params
 * @param {string} [params._id]
 * @param {string} [params.date]
 * @param {string} [params.name]
 * @returns {DailyDateApiResponse}
 */
export const list = (params) => request({
  method: 'get',
  url: '/dailyDate/list',
  params,
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
 * @param {Object} params
 * @param {string} params.id
 * @returns {ApiResponse}
 */
export const del = (params) => request({
  method: 'get',
  url: '/dailyDate/del',
  params,
});
