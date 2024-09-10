import request from '@/utils/request';


/**
 * 列表
 *
 * @param params
 */
export function jobRecords(params) {
	return request({
		url: '/yx-project/api/jobRecords/page',
		method: 'get',
		params
	});
}
/**
 * 新增审批
 *
 * @param params
 */
export function jobInfo(params) {
	return request({
		url: '/yx-project/api/jobRecords/' + params,
		method: 'get',
	});
}
