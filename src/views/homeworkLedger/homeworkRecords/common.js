const tableColumn = [{
		label: "企业（单位）名称",
		props: "companyName",
		minWidth: 160,
		hover: {
			length: 12
		},
	}, {
		label: "企业地址",
		props: "address",
		minWidth: 160,
		hover: {
			length: 12
		},
	}, {
		label: "所在区域",
		props: "area",
		width: 120
	}, {
		label: "有限空间名称",
		props: "limitedName",
		width: 160,
		hover: {
			length: 12
		},
	},




	{
		label: "单位负责人",
		props: "headUnit",
		width: 120,
	},
	{
		label: "管理责任人",
		props: "responsibleManagement",
		width: 120,
	},
	{
		label: "联系电话",
		props: "phone",
		width: 140,
	},
	{
		label: "有限空间作业时间",
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
