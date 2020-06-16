import { AUTHORIZE } from './mutation-type';

export default {
	async authorizeUser({ commit, provider = 'weixin' }) {
		uni.authorize({
			scope: 'scope.userInfo',
			success() {
				uni.login({
					provider: provider,
					success(loginResult) {
						uni.getUserInfo({
							provider: provider,
							success(info) {
								console.log(info);
							},
						});
					},
					fail() {
						console.log('登录失败');
					},
				});
			},
			fail(error) {
				uni.openSetting();
				console.log('授权失败:' + JSON.stringify(error));
			},
		});
	},
	async getUserInfo(state) {
		return await new Promise((reslove, reject) => {
			if (state.weChatUserInfo) {
				reslove(state.weChatUserInfo);
			}
			uni.getUserInfo({
				provider: state.loginProvider,
				success: (result) => {
					state.weChatUserInfo = { ...result.userInfo };
					reslove(state.weChatUserInfo);
				},
				fail: (error) => {
					if (~error.errMsg.indexOf('uni.login')) {
						uni.showModal({
							title: '获取用户信息失败',
							content: '错误原因' + error.errMsg,
							showCancel: false,
						});
						reject(error);
					}
				},
			});
		});
	},
};
