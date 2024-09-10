import request from '@/utils/request';

/**
 * 分页查询所有数据
 *
 * @param params
 */
export function city_page(params) {
	return request({
		url: '/yx-project/api/countyOperationLedger/municipalLedgerpage',
		method: 'get',
		params
	});
}
/**
 * 新增数据
 *
 * @param params
 */
export function city_insert(params) {
	return request({
		url: '/yx-project/api/countyOperationLedger/municipalLedgerInsert',
		method: 'post',
		data: params
	});
}
/**
 * 新增数据
 *
 * @param params
 */
export function city_edit(params) {
	return request({
		url: '/yx-project/api/countyOperationLedger/countyOperationLedgerEdite',
		method: 'put',
		data: params
	});
}
/**
 * 新增数据
 *
 * @param params
 */
export function city_delete(params) {
	return request({
		url: '/yx-project/api/countyOperationLedger/' + params,
		method: 'delete',
	});
}
export function city_export(params) {
	return request({
		url: '/yx-project/api/countyOperationLedger/municipalLedgerExport',
		method: 'get',
		params,
		responseType: 'blob',
	});
}
