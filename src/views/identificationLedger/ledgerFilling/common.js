const spaceTypeOptions = [{
		label: "第一类：封闭、半封闭设备",
		value: '第一类：封闭、半封闭设备',
	},
	{
		label: "第二类：地下有限空间",
		value: '第二类：地下有限空间',
	},
	{
		label: "第三类：地上有限空间",
		value: '第三类：地上有限空间',
	},
]
const enterprise = [
	// {
	//   label: "上传人",
	//   props: "createByUsername",
	//   enums: {
	//     enums: userEnums.value,
	//     value: "username",
	//     label: "name",
	//   },
	// },
	{
		label: "有限空间名称",
		props: "name",
		width: 220
	},
	{
		label: "所在区域",
		props: "area",
		width: 220
	},
	{
		label: "编号",
		props: "number",
		width: 160
	},
	{
		label: "有限空间类型",
		props: "spaceType",
		width: 220,
		enums: {
			enums: spaceTypeOptions,
		},
	},
	{
		label: "有限空间形状/体积",
		props: "shapeVolume",
		width: 160
	},
	{
		label: "主要介质名称",
		props: "mainMedium",
		width: 160
	},
	{
		label: "主要危险有害因素",
		props: "mainHazards",
		hover: {
			length: 28
		},
		minWidth: 220
	},
	{
		label: "作业分级",
		props: "jobGrading",
		width: 220
	},
	{
		label: "管理责任人",
		props: "managementResponsiblePerson",
		width: 160,
	},
	{
		label: "主要负责人",
		props: "workResponsiblePerson",
		width: 160,
	},
	{
		label: "操作",
		props: "controls",
		width: 300,
		fixed: "right"
	},
];

const county = [
	// {
	//   label: "上传人",
	//   props: "createByUsername",
	//   enums: {
	//     enums: userEnums.value,
	//     value: "username",
	//     label: "name",
	//   },
	// },
	{
		label: "企业（单位）名称",
		props: "enterpriseName",
		width: 220,
		hover: {
			length: 13
		},
	},
	{
		label: "行业类别",
		props: "industryCategory",
		width: 160
	},
	{
		label: "地址",
		props: "address",
		width: 220
	},
	{
		label: "密闭设备数",
		props: "confinedDevices",
		width: 100
	},
	{
		label: "地下有限空间",
		props: "limitedSpaceUnderground",
		width: 120
	},
	{
		label: "地上有限空间",
		props: "limitedSpaceAboveGround",
		width: 120
	},
	{
		label: "主要危险有害因素",
		props: "mainHazards",
		hover: {
			length: 28
		},
		minWidth: 220
	},
	{
		label: "主要负责人",
		props: "managementResponsiblePerson",
		width: 160,
	},
	{
		label: "管理责任人",
		props: "workResponsiblePerson",
		width: 160
	},
	{
		label: "区县政府责任人",
		props: "districtCountyPersons",
		width: 160,
	},
	{
		label: "乡镇/街道责任人",
		props: "streetResponsible",
		width: 180,
		hover: {
			length: 20
		},
	},
	{
		label: "市级责任部门名称",
		props: "municipalResponsibleDepartments",
		width: 160,
	},
	{
		label: "市级主要责任人",
		props: "municipalMainPerson",
		width: 160
	},
	{
		label: "市级分管责任人",
		props: "municipalChargePerson",
		width: 160,
	},
	{
		label: "县级责任部门名称",
		props: "countyResponsibleDepartments",
		width: 160,
	},
	{
		label: "县级主要责任人",
		props: "countyMainPerson",
		width: 160
	},
	{
		label: "县级分管责任人",
		props: "countyChargePerson",
		width: 160,
	},
	{
		label: "操作",
		props: "controls",
		width: 220,
		fixed: "right"
	},
];
const city = [{
		label: "区县",
		props: "companyId",
		width: 180
	},
	{
		label: "企业（单位）名称",
		props: "enterpriseName",
		width: 220,
		hover: {
			length: 13
		},
	},
	{
		label: "行业类别",
		props: "industryCategory",
		width: 160
	},
	{
		label: "地址",
		props: "address",
		width: 220
	},
	{
		label: "密闭设备数",
		props: "confinedDevices",
		width: 100
	},
	{
		label: "地下有限空间",
		props: "limitedSpaceUnderground",
		width: 120
	},
	{
		label: "地上有限空间",
		props: "limitedSpaceAboveGround",
		width: 120
	},
	{
		label: "主要危险有害因素",
		props: "mainHazards",
		hover: {
			length: 28
		},
		minWidth: 220
	},
	{
		label: "主要负责人",
		props: "managementResponsiblePerson",

		width: 160,
	},
	{
		label: "管理责任人",
		props: "workResponsiblePerson",
		width: 160
	},
	{
		label: "区县政府责任人",
		props: "districtCountyPersons",
		width: 160,
	},
	{
		label: "乡镇/街道责任人",
		props: "streetResponsible",
		width: 180,
		hover: {
			length: 20
		},
	},
	{
		label: "市级责任部门名称",
		props: "municipalResponsibleDepartments",
		width: 160,
	},
	{
		label: "市级主要责任人",
		props: "municipalMainPerson",
		width: 160
	},
	{
		label: "市级分管责任人",
		props: "municipalChargePerson",
		width: 160,
	}, {
		label: "县级责任部门名称",
		props: "countyResponsibleDepartments",
		width: 160,
	},
	{
		label: "县级主要责任人",
		props: "countyMainPerson",
		width: 160
	},
	{
		label: "县级分管责任人",
		props: "countyChargePerson",
		width: 160,
	},
	{
		label: "操作",
		props: "controls",
		width: 220,
		fixed: "right"
	},
];
const spaceTypeEnums = []

export {
	city,
	county,
	enterprise,
	spaceTypeEnums,
	spaceTypeOptions
}
