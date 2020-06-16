import Vue from 'vue';
import App from './App';
import store from './store/index';

Vue.config.productionTip = false;
App.mpType = 'app';
Vue.$store = store;

const app = new Vue({
	store,
	...App,
});
app.$mount();
