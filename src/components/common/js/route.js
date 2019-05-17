/**
 * created by xiaodong.han
 */
import  Vue from 'vue'
/**
 * 首页菜单配置(homePage)
 */
export const homePage = new Vue({
    data: {
        homeParent: {
            index: 'p_home',
            name: '首页',
            icon: 'ios-paper',
            iconClass: 'iconfont icon1'
        },
        home: {
            parent: 'p_home',
            index: {
                role: 'home_index',
                name: '首页',
                icon: 'ios-paper',
                iconClass: 'iconfont iconneirongguanli'
            },
            onlyIndex: {
                component: '/index.vue',
                path: '/home_page',
                index: 'home_page',
                permission: null,
                menuShow: true
            }
        }
    }
});

/**
 * 路由菜单配置(route)
 */
export const route = new Vue({
    data: {
        showParent: true,
        parentMenu: [
            homePage.homeParent
        ],
        menu: [
            homePage.home
        ]
    }
});
