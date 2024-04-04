import request from '@/apis/request';

/**
 * @typedef {Object} Record
 * @property {string} _id
 * @property {string} username
 * @property {string} date
 * @property {string} name
 * @property {string} value
 * @property {string} target
 */

/**
 * @typedef {Object} ApiResponse
 * @property {number} code
 * @property {any} data
 */

/**
 * @typedef {Object} RecordApiResponse
 * @extends {ApiResponse}
 * @property {Record[]} data
 */

/**
 * 新增记录
 * @param {Object} data
 * @param {string} data.username
 * @param {string} data.date
 * @param {string} data.name
 * @param {string} data.value
 * @param {string} data.target
 * @returns {ApiResponse}
 */
export const add = (data) =>
  request({
    method: 'post',
    url: '/record/add',
    data,
  });

/**
 * 更新记录
 * @param {Object} data
 * @param {string} [data.date]
 * @param {string} [data.name]
 * @param {string} [data.value]
 * @param {string} [data.target]
 * @returns {ApiResponse}
 */
export const update = (data = {}) =>
  request({
    method: 'post',
    url: '/record/update',
    data,
  });

/**
 * 记录列表
 * @param {Object} data
 * @param {string} [data.username]
 * @param {string} [data.date]
 * @param {string} [data.name]
 * @param {string} [data.value]
 * @param {string} [data.target]
 * @returns {RecordApiResponse}
 */
export const list = (data) =>
  request({
    method: 'post',
    url: '/record/list',
    data,
  });

/**
 * 合计
 * @param {Object} data
 * @param {string} data.name
 * @returns {Number}
 */
export const totalValue = (data) =>
  request({
    method: 'post',
    url: '/record/totalValue',
    data,
  });
