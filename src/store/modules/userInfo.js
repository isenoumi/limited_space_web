import {
	defineStore
} from "pinia"

const useUserInfoStore = defineStore('userInfo', {
	// defineStore('userInfo',{})  userInfo就是这个仓库的名称name
	state: () => ({
		// username: '赫赫',
		// age: 30,
		// like: 'girl',
		// obj: {
		// 	money: 100,
		// 	friend: 10
		// },
		// hobby: [{
		// 		id: 1,
		// 		name: '篮球',
		// 		level: 1
		// 	},
		// 	{
		// 		id: 2,
		// 		name: 'rap',
		// 		level: 10
		// 	}
		// ],
		isCity: false,
		isCounty: false,
		isEnterprise: false,
		levelType: ''
	}),
	persist: true // 添加 persist 属性
})

export default useUserInfoStore
