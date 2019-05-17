import Vue from 'vue';
import App from './App';
import router from './router';
import axios from './components/utils/httpUtil';
import underscore from 'underscore';
import moment from 'moment';
import elementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../src/assets/oper/iconfont.css';
import '../src/assets/oper/iconfont';
import '../src/assets/tab/iconfont.css';
import '../src/assets/tab/iconfont';
import store from './store/index';
import '../src/components/myComponent/index';
Vue.use(elementUi);
Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;
Vue.prototype.$formatDate = function (data) {
    return moment(data).format('YYYY-MM-DD HH:mm:ss');
};
Vue.prototype.$unixDate = function (data) {
    return moment.unix(data).format('YYYY-MM-DD HH:mm:ss');
};
Vue.prototype.$p = function (permission) {
    let user = localStorage.getItem('mis_element_demo');
    if (!user) {
        return false;
    }
    user = JSON.parse(user);
    if (underscore.contains(user.permissions, 'all') || underscore.contains(user.permissions, permission)) {
        return true;
    }
    return false;
};

router.beforeEach((to, from, next) => {
    const permission = to.meta.permission;
    let user = localStorage.getItem('mis_element_demo');
    if (!user && to.path !== '/login') {
        next('/login');
        return;
    }
    user = JSON.parse(user);
    if (user && to.path === '/login') {
        next('/');
        return;
    }
    if (!underscore.contains(['/', '/login'], to.path)) {
        if (!user.permissions) {
            next('/');
            return;
        }
        if (underscore.contains(user.permissions, 'all') || underscore.contains(user.permissions, permission) || !permission) {
            next();
            return;
        }
        next('/');
        return;
    }
    next();
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
