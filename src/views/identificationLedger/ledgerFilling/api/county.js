import request from '@/utils/request';

/**
 * 分页查询所有数据
 *
 * @param params
 */
export function county_page(params) {
	return request({
		url: '/yx-project/api/countyOperationLedger/page',
		method: 'get',
		params
	});
}
/**
 * 新增数据
 *
 * @param params
 */
export function county_insert(params) {
	return request({
		url: '/yx-project/api/countyOperationLedger/countyOperationLedgerInsert',
		method: 'post',
		data: params
	});
}
/**
 * 新增数据
 *
 * @param params
 */
export function county_edit(params) {
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
export function county_delete(params) {
	return request({
		url: '/yx-project/api/countyOperationLedger/' + params,
		method: 'delete',
	});
}
export function county_export(params) {
	return request({
		url: '/yx-project/api/countyOperationLedger/companyExport',
		method: 'get',
		params,
		responseType: 'blob',
	});
}
