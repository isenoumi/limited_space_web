import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { RoleQuery, RolePageResult, RoleForm } from './types';

/**
 * 获取角色分页数据
 *
 * @param queryParams
 */
export function getRolePage(
  queryParams?: RoleQuery
): AxiosPromise<RolePageResult> {
  return request({
    url: '/yx-sys/api/role',
    method: 'get',
    params: queryParams
  });
}

/**
 * 获取角色下拉数据
 *
 * @param queryParams
 */
export function listRoleOptions(

): AxiosPromise<OptionType[]> {
  return request({
    url: '/yx-sys/api/role',
    method: 'get',
    // params: queryParams
  });
}

/**
 * 获取角色的菜单ID集合
 *
 * @param queryParams
 */
export function getRoleMenuIds(roleId: number): AxiosPromise<number[]> {
  return request({
    url: '/api/v1/roles/' + roleId + '/menuIds',
    method: 'get'
  });
}

/**
 * 分配菜单权限给角色
 *
 * @param queryParams
 */
export function updateRoleMenus(
  roleId: number,
  permIds: string
): AxiosPromise<any> {
  return request({
    url: '/yx-sys/api/role/' + roleId + '/perms',
    method: 'put',
    data: permIds
  });
}

/**
 * 获取角色详情
 *
 * @param id
 */
export function getRoleForm(id: number): AxiosPromise<RoleForm> {
  return request({
    url: '/api/v1/roles/' + id + '/form',
    method: 'get'
  });
}

/**
 * 添加角色
 *
 * @param data
 */
export function addRole(data: RoleForm) {
  return request({
    url: '/yx-sys/api/role',
    method: 'post',
    data: data
  });
}

/**
 * 更新角色
 *
 * @param id
 * @param data
 */
export function updateRole(data: any) {
  return request({
    url: '/yx-sys/api/role',
    method: 'put',
    data: data
  });
}

/**
 * 批量删除角色，多个以英文逗号(,)分割
 *
 * @param ids
 */
export function deleteRoles(ids: string) {
  return request({
    url: '/role/' + ids,
    method: 'delete'
  });
}

export function deleteRole(ids: string) {
  return request({
    url: '/yx-sys/api/role/' + ids,
    method: 'delete'
  });
}