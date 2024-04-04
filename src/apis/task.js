import request from '@/apis/request';

/**
 * @typedef {Object} Task
 * @property {string} _id
 * @property {string} name
 * @property {string} username
 * @property {string} target
 */

/**
 * @typedef {Object} ApiResponse
 * @property {number} code
 * @property {any} data
 */

/**
 * @typedef {Object} TaskApiResponse
 * @extends {ApiResponse}
 * @property {Task[]} data
 */

/**
 * 新增任务
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.target
 * @returns {ApiResponse}
 */
export const add = (data) =>
  request({
    method: 'post',
    url: '/task/add',
    data,
  });

/**
 * 更新任务
 * @param {Object} data
 * @param {string} [data.name]
 * @param {string} [data.target]
 * @returns {ApiResponse}
 */
export const update = (data = {}) =>
  request({
    method: 'post',
    url: '/task/update',
    data,
  });

/**
 * 任务列表
 * @param {Object} data
 * @param {string} [data.name]
 * @param {string} [data.target]
 * @returns {TaskApiResponse}
 */
export const list = (data = {}) =>
  request({
    method: 'post',
    url: '/task/list',
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
    url: '/task/remove',
    data,
  });
