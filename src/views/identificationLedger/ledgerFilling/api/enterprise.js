import request from '@/utils/request';

/**
 * 分页查询所有数据
 *
 * @param params
 */
export function enterprise_limitedSpaceIdentificationPage(params) {
	return request({
		url: '/yx-project/api/limitedSpaceIdentification/page',
		method: 'get',
		params
	});
}
/**
 * 新增数据
 *
 * @param params
 */
export function enterprise_limitedSpaceIdentificationInsert(params) {
	return request({
		url: '/yx-project/api/limitedSpaceIdentification/limitedSpaceIdentificationInsert',
		method: 'post',
		data: params
	});
}
/**
 * 新增数据
 *
 * @param params
 */
export function enterprise_limitedSpaceIdentificationEdite(params) {
	return request({
		url: '/yx-project/api/limitedSpaceIdentification/limitedSpaceIdentificationEdite',
		method: 'put',
		data: params
	});
}
/**
 * 新增数据
 *
 * @param params
 */
export function enterprise_limitedSpaceIdentificationDelete(params) {
	return request({
		url: '/yx-project/api/limitedSpaceIdentification/' + params,
		method: 'delete',
	});
}
export function enterprise_companyExport(params) {
	return request({
		url: '/yx-project/api/limitedSpaceIdentification/companyExport',
		method: 'get',
		params,
		responseType: 'blob',
	});
}

export function enterprise_enterpriseQRCode(params) {
	return request({
		url: '/yx-project/api/limitedSpaceIdentification/enterpriseCode',
		method: 'get',
		params
	});
}

export function enterprise_ledgerQRCode(params) {
	return request({
		url: '/yx-project/api/limitedSpaceIdentification/qrCodeCreat',
		method: 'get',
		params
	});
}
export function enterprise_viewLedgerPage(params) {
	return request({
		url: '/yx-project/api/limitedSpaceIdentification/byCompanyName',
		method: 'get',
		params
	});
}
