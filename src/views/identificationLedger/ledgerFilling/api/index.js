import request from '@/utils/request';

/**
 * 列表
 *
 * @param params
 */
export function getBudgetExamine(params) {
	return request({
		url: '/yx-project/api/budgetExamine/reserve',
		method: 'get',
		params
	});
}
/**
 * 新增审批
 *
 * @param params
 */
export function reserveFundApproval(params) {
	return request({
		url: '/yx-project/api/budgetExamine/reserveFundApproval',
		method: 'get',
		params
	});
}
export function districtsOption(params) {
	return request({
		url: '/yx-project/api/limitedSpaceIdentification/districts',
		method: 'get',
		params
	});
}
