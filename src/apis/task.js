import request from '@/shared/request';

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
 * @param {Object} params
 * @param {string} [params.name]
 * @param {string} [params.target]
 * @returns {TaskApiResponse}
 */
export const list = (params = {}) =>
  request({
    method: 'get',
    url: '/task/list',
    params,
  });
