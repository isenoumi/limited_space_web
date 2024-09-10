const tableColumn = [{
		label: "企业（单位）名称",
		props: "companyName",
		width: 220,
		hover: {
			length: 12
		},
	},
	{
		label: "所在区域",
		props: "area",
		width: 120
	}, {
		label: "有限空间名称",
		props: "limitedName",
		width: 220,
		hover: {
			length: 12
		},
	},
	{
		label: "管理责任人",
		props: "responsibleManagement",
		width: 120,
	},
	{
		label: "联系电话",
		props: "phone",
		width: 120
	},
	{
		label: "作业进度",
		props: "jobProgress",
		width: 100,
		type: 'customFunction',
		customFunction: (row) => {
			return row.jobProgress + ' / 7'
		}

	},
	{
		label: "作业方案审批",
		props: "approvalStatus",
		width: 120,
		type: 'status'
	},
	{
		label: "作业人员培训",
		props: "trainingStatus",
		width: 120,
		type: 'status'
	},
	{
		label: "作业过程通风",
		props: "ventilationStatus",
		width: 120,
		type: 'status'
	},
	{
		label: "有毒有害检测",
		props: "toxicDetectionStatus",
		width: 120,
		type: 'status'
	},
	{
		label: "防护用品配备",
		props: "ppeStatus",
		width: 120,
		type: 'status'
	},
	{
		label: "作业监护到位",
		props: "supervisionStatus",
		width: 120,
		type: 'status'
	},
	{
		label: "应急救援科学",
		props: "emergencyStatus",
		width: 120,
		type: 'status'
	},
	{
		label: "上传时间",
		props: "createTime",
		width: 220,
	},
	{
		label: "操作",
		props: "controls",
		width: 120,
		fixed: "right"
	},
];

const ledgerProcedure = [{
		title: '作业方案审批情况',
		url: ''
	},
	{
		title: '作业人员培训情况',
		url: ''
	},

	{
		title: '作业过程通风情况',

	},
	{
		title: '有毒有害气体检测情况',

	},
	{
		title: '防护用品配备情况',

	},
	{
		title: '作业监护到位情况',

	},
	{
		title: '应急救援准备情况',

	},
]

export {
	tableColumn,
	ledgerProcedure
}
