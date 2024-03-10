import request from '@/shared/request';

/**
 * @typedef {Object} Record
 * @property {string} _id
 * @property {string} createTime
 * @property {string} createUser
 * @property {string} updateTime
 * @property {string} updateUser
 * @property {string} content
 */

/**
 * @typedef {Object} ApiResponse
 * @property {number} code
 * @property {any} data
 */

/**
 * @typedef {Object} TaskApiResponse
 * @extends {ApiResponse}
 * @property {Record[]} data
 */

/**
 * 新增任务
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.content
 * @returns {ApiResponse}
 */
export const add = (data) =>
  request({
    method: 'post',
    url: '/public/add',
    data,
  });

/**
 * 更新任务
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.content
 * @returns {ApiResponse}
 */
export const update = (data = {}) =>
  request({
    method: 'post',
    url: '/public/update',
    data,
  });

/**
 * 任务列表
 * @param {Object} data
 * @param {string} data.name
 * @returns {TaskApiResponse}
 */
export const list = (data = {}) =>
  request({
    method: 'post',
    url: '/public/list',
    data,
  });

/**
 * 删除任务
 * @param {Object} data
 * @param {string} data.id
 * @returns {TaskApiResponse}
 */
export const remove = (data = {}) =>
  request({
    method: 'post',
    url: '/public/remove',
    data,
  });
