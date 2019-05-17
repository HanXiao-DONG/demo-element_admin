/**
 * Created by xiaodong.han on 2018/5/16.
 */
import axios from 'axios';
import router from '../../router';

axios.interceptors.request.use();

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
    response => {
        if (response.data.code === 3) {
            // 这里写清除token的代码
            localStorage.removeItem('mis_element_demo');
            router.push({path: '/login'});
            return Promise.resolve(response.data);
        }
        return Promise.resolve(response.data);
    },
    error => {
        switch (error.response.status) {
            case 403:
                // 这里写清除token的代码
                localStorage.removeItem('mis_element_demo');
                router.push({path: '/login'});
                return Promise.reject(error.response.data);
            default:
                return Promise.reject(error.response.data);
        }
    }
);

export default axios;
