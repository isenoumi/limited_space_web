import request from '@/utils/request';

/**
 * 列表
 *
 * @param params
 */
export function getNoticeNumber(params) {
	return request({
		url: '/yx-project/api/jobRecords/selectNum',
		method: 'get',
		params
	});
}
