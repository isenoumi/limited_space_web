import request from '@/utils/request';

/**
 * 列表
 *
 * @param params
 */
export function getLedgerStatisticsList(params) {
	return request({
		url: '/yx-project/api/countyOperationLedger/ledgerStatisticsList',
		method: 'get',
		params
	});
}
/**
 * 新增审批
 *
 * @param params
 */
export function getColumnarList(params) {
	return request({
		url: '/yx-project/api/countyOperationLedger/columnarList',
		method: 'get',
		params
	});
}
export function getSelfExaminationList(params) {
	return request({
		url: '/yx-project/api/selfExamination/selfExaminationList',
		method: 'get',
		params
	});
}
export function getSelfHistogramList(params) {
	return request({
		url: '/yx-project/api/selfExamination/histogramList',
		method: 'get',
		params
	});
}
