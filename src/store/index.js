import Vue from 'vue';
import Vuex from 'vuex';
import actions from '../store/actions';
import mutations from '../store/mutations';

Vue.use(Vuex);

const state = {
	isLogin: false,
	loginProvider: '',
	weChatUserInfo: {},
	appUserInfo: {},
};

export default new Vuex.Store({
	state,
	actions,
	mutations,
});
