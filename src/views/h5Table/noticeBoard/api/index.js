import request from '@/utils/request';

/**
 * 列表
 *
 * @param params
 */
export function getLedgerList(params) {
	return request({
		url: '/yx-project/api/jobRecords/xPage',
		method: 'get',
		params
	});
}
/**
 * 新增审批
 *
 * @param params
 */
export function getLimitedSpaceIdentification(params) {
	return request({
		url: '/yx-project/api/limitedSpaceIdentification/' + params,
		method: 'get',
	});
}
export function jobInfo(params) {
	return request({
		url: '/yx-project/api/jobRecords/' + params,
		method: 'get',
	});
}
