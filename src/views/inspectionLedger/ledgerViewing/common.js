const tableColumn = [{
		label: "企业（单位）名称",
		props: "companyName",
		// minWidth: 220,
		hover: {
			length: 12
		},
	}, {
		label: "企业地址",
		props: "address",
		// minWidth: 220,
		hover: {
			length: 20
		},
	},
	{
		label: "所在区域",
		props: "area",
		width: 220
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
		label: "上传时间",
		props: "createTime",
		width: 220,
	},
	{
		label: "操作",
		props: "controls",
		width: 180,
		fixed: "right"
	},
];

const ledgerProcedure = [{
		title: '作业方案审批情况',
		url: 'https://n.sinaimg.cn/translate/737/w584h953/20191013/c629-ifvwftk4688104.jpg'
	},
	{
		title: '作业人员培训情况',
		url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg,https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
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
