import request from '@/utils/request';


/**
 * 列表
 *
 * @param params
 */
export function jobRecords(params) {
	return request({
		url: '/yx-project/api/selfExamination/page',
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
		url: '/yx-project/api/selfExamination/' + params,
		method: 'get',
	});
}
