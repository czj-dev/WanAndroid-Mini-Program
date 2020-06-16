import { AUTHORIZE, SAVE_WECHAT_USER } from './mutation-type.js';

export default {
	[AUTHORIZE](state, info) {},
	[SAVE_WECHAT_USER](state, info) {
		state.weChatUserInfo = { ...info };
	},
};
