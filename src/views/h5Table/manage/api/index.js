import request from '@/utils/request';

/**
 * 列表
 *
 * @param params
 */
export function getLedgerList(params) {
	return request({
		url: '/yx-project/api/limitedSpaceIdentification/getList',
		method: 'get',
		params
	});
}
/**
 * 新增审批
 *
 * @param params
 */
export function getEnterprise(params) {
	return request({
		url: '/yx-project/api/countyOperationLedger/' + params,
		method: 'get',
	});
}
