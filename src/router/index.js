import Vue from 'vue';
import Router from 'vue-router';
import {route, homePage} from './../components/common/js/route';
import _ from 'underscore';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            component: resolve => require(['../components/login.vue'], resolve),
        },
        {
            path: '/',
            component: resolve => require(['../components/common/home.vue'], resolve),
            redirect: homePage.home.onlyIndex.path,
            children: _.flatten(_.map(route.menu, function (item) {
                if (item.onlyIndex) {
                    return {
                        path: item.onlyIndex.path,
                        component: resolve => require(['../components/page' + item.onlyIndex.component], resolve),
                        meta: {
                            parent: item.parent,
                            permission: item.onlyIndex.permission,
                            role: item.index.role,
                            name: item.index.name,
                            index: item.onlyIndex.index
                        }
                    };
                }
                return _.map(item.subMenu, function (sub) {
                    if (sub.child) {
                        return _.map(sub.subMenu, function (child) {
                            return {
                                path: child.path,
                                component: resolve => require(['../components/page' + child.component], resolve),
                                meta: {
                                    parent: item.parent,
                                    permission: child.permission,
                                    role: item.index.role,
                                    name: child.name,
                                    index: child.index
                                }
                            };
                        });
                    }
                    return {
                        path: sub.path,
                        component: resolve => require(['../components/page' + sub.component], resolve),
                        meta: {
                            parent: item.parent,
                            permission: sub.permission,
                            role: item.index.role,
                            name: sub.name,
                            index: sub.index
                        }
                    };
                })
            }))
        },
    ]
})
