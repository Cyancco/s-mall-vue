import axios from 'axios'

export default{
	loginUser:(state,getters)=>{
		return state.loginUser
	},
	cartNum:(state,getters)=>{
		return state.loginUser.shopcarsList.length
	}

}
