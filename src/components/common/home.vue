<template>
    <div class="layout">
        <div class="layout-menu">
            <div class="layout-header-bar">
                <div class="header-item">
                    <div class="header-item-title">element后台demo</div>
                    <div class="header-item-bar" v-if="bar.length > 0">
                        <el-menu :default-active="selectBarIndex" @select="changeBar" mode="horizontal" background-color="#ebf1f6" text-color="#000000" active-text-color="#409EFF">
                            <el-menu-item v-for="item in bar" :index="item.index">
                                <i v-if="item.iconClass" :class="item.iconClass"></i>
                                <i v-else :class="item.icon"></i>
                                {{item.name}}
                            </el-menu-item>
                        </el-menu>
                    </div>
                </div>
                <div class="header-item">
                    <template class="el-dropdown-link">
                        <i class="el-icon-s-custom" style="margin-right: 7px;"></i>
                        <el-dropdown style="margin-right: 12px;" @command="handleCommand">
                            <span class="el-dropdown-link">用户</span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="exit">
                                    <i class="iconfont icontuichu1" style="font-size: 14px;"></i>退&#8195;&#8195;出
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <i class="iconfont iconxiugaimima" style="font-size: 17px;"></i>修改密码
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </div>
            </div>

            <el-menu :default-active="selectMenuIndex" class="side-menu" v-if="menu && menu.length > 0" background-color="#ebf1f6">
                <template v-for="item in menu">
                    <el-submenu v-if="item.subMenu" :index="item.index.role">
                        <template slot="title">
                            <i v-if="item.index.iconClass" :class="item.index.iconClass"></i>
                            <i v-else :class="item.index.icon"></i>
                            <span slot="title">{{item.index.name}}</span>
                        </template>
                        <template v-for="sub in item.subMenu">
                            <div v-if="sub.menuShow && !sub.child" @click="changeMenu(item.parent, sub.path)">
                                <el-menu-item :index="sub.index">
                                    <i v-if="sub.iconClass" :class="sub.iconClass"></i>
                                    <i v-else :class="sub.icon"></i>
                                    <span slot="title">{{sub.name}}</span>
                                </el-menu-item>
                            </div>
                            <div v-if="sub.child && sub.subMenu">
                                <el-submenu :index="sub.index.role">
                                    <template slot="title">
                                        <i v-if="sub.index.iconClass" :class="sub.index.iconClass"></i>
                                        <i v-else :class="sub.index.icon"></i>
                                        <span slot="title">{{sub.index.name}}</span>
                                    </template>
                                    <template v-for="su in sub.subMenu">
                                        <div v-if="su.menuShow" @click="changeMenu(item.parent, su.path)">
                                            <el-menu-item :index="su.index">
                                                <i v-if="su.iconClass" :class="su.iconClass"></i>
                                                <i v-else :class="su.icon"></i>
                                                <span slot="title">{{su.name}}</span>
                                            </el-menu-item>
                                        </div>
                                    </template>
                                </el-submenu>
                            </div>
                        </template>
                    </el-submenu>
                    <div v-else-if="item.onlyIndex" @click="changeMenu(item.parent, item.onlyIndex.index, item.onlyIndex.path)">
                        <el-menu-item :index="item.onlyIndex.index">
                            <i v-if="item.index.iconClass" :class="item.index.iconClass"></i>
                            <i v-else :class="item.index.icon"></i>
                            <span slot="title">{{item.index.name}}</span>
                        </el-menu-item>
                    </div>
                </template>
            </el-menu>

            <div class="side-right" v-if="menu && menu.length > 0">
                <div class="main-body scrollbar">
                    <el-tabs v-if="selectRole" v-model="selectRole.index" type="border-card" style="min-height: 98%;" @tab-click="tabClick">
                        <el-tab-pane v-for="item in selectIndex" :label="item.name" :name="item.index">
                            <transition name="slide-fade">
                                <router-view v-if="selectRole.index === item.index"></router-view>
                            </transition>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
	import '../../css/index.css';
    import {route} from './js/route';
    import underscore from 'underscore';
    export default {
        data: function () {
            return {
                selectMenuIndex: null,
                drawer: false,
                user: null,
                bar: [],
                menu: [],
                menus: []
            }
        },

        computed: {

            selectBarIndex() {
                return this.$store.getters.GET_BAR_INDEX;
            },

            selectRole() {
                return this.$store.getters.GET_ROLE;
            },

            selectIndex() {
                return this.$store.getters.GET_INDEX;
            }
        },

        watch: {
            '$route' (to, from) {
                this.routerChange(to);
            }
        },

        methods: {

            tabClick(tab) {
                const index = tab.name;
                const obj = underscore.find(this.selectIndex, {index: index});
                if (!obj) {
                    this.$router.push({path: '/'});
                    return;
                }
                this.$router.push({path: obj.path});
            },

            routerChange(to) {
                const role = to.meta.role;
                const obj = {index: to.meta.index, path: to.path, name: to.meta.name};
                let selectRole = this.selectRole ? this.selectRole : {};
                if (role === selectRole.role) {
                    const index = underscore.findIndex(this.selectIndex, {index: obj.index});
                    if (index === -1) {
                        const selectIndex = JSON.parse(JSON.stringify(this.selectIndex));
                        selectIndex.push(obj);
                        this.$store.commit('SET_INDEX', selectIndex);
                    }
                    selectRole.index = obj.index;
                    this.$store.commit('SET_ROLE', selectRole);
                    return;
                }
                this.$store.commit('SET_ROLE', {role: role, index: obj.index});
                this.$store.commit('SET_INDEX', [obj]);
            },

            changeMenu(barIndex, path) {
                if (barIndex) {
                    this.$store.commit('SET_BAR_INDEX', barIndex);
                }
                if (path) {
                    this.$router.push(path);
                }
            },

            handleCommand(command) {
                if (command === 'exit') {
                    this.logOut();
                }
            },

            // 注销
            logOut() {
                // this.$axios.post('/index.php/index/Api/managersOut').then(res => {
                //     if (res.code !== 1) {
                //         this.$Message.warning('退出失败');
                //         return false;
                //     }
                //     localStorage.removeItem('mis_element_demo');
                //     this.$router.push({path: '/login'});
                // }).catch(error => {
                //     this.$Message.error(error);
                //     return false;
                // })
                localStorage.removeItem('mis_element_demo');
                this.$router.push({path: '/login'});
            },

            // 初始化
            initialize() {
                let user = localStorage.getItem('mis_element_demo');
                if (user) {
                    user = JSON.parse(user);
                    this.user = user;
                    this.checkPermission(this.user);
                    return;
                }
                localStorage.removeItem('mis_element_demo');
                this.$router.push({path: '/login'});
            },

            // bar的change事件
            changeBar(key, to) {
                if (key !== this.selectBarIndex || to) {
                    this.changeMenu(key);
                    const menu = underscore.map(this.menus, function (item) {
                        if (item.parent && item.parent === key) {
                            return item;
                        }
                        return null;
                    });
                    this.menu = underscore.compact(menu);
                    if (to && to.meta) {
                        this.routerChange(to);
                        this.selectMenuIndex = to.meta.index;
                    } else {
                        this.selectMenuIndex = null;
                    }
                }
            },

            // 检查权限
            checkPermission(user) {
                if (underscore.contains(user.permissions, 'all')) {
                    this.menus = JSON.parse(JSON.stringify(route.menu));
                } else {
                    let menu = underscore.map(route.menu, function (item) {
                        let menu = JSON.parse(JSON.stringify(item));
                        if (!menu.subMenu) {
                            if (!menu.onlyIndex.permission) {
                                return menu;
                            }
                            return underscore.contains(user.permissions, menu.onlyIndex.permission) ? (menu.onlyIndex.menuShow ? menu : null) : null;
                        }
                        let subMenu = underscore.map(menu.subMenu, function (sub) {
                            if (sub.child) {
                                let subMenu = underscore.map(sub.subMenu, function (child) {
                                    return underscore.contains(user.permissions, child.permission) ? child : null;
                                });
                                sub.subMenu = underscore.compact(subMenu);
                                return sub.subMenu.length > 0 ? sub : null;
                            }
                            return underscore.contains(user.permissions, sub.permission) ? sub : null;
                        });
                        menu.subMenu = underscore.compact(subMenu);
                        return menu.subMenu.length > 0 ? menu : null;
                    });
                    this.menus = underscore.compact(menu);
                }
                if (route.showParent) {
                    const _this = this;
                    this.bar = underscore.compact(underscore.map(route.parentMenu, function (item) {
                        if (item.only) {
                            return item;
                        }
                        return underscore.findIndex(_this.menus, {parent: item.index}) > -1 ? item : null;
                    }));
                }
                if (this.bar.length <= 0) {
                    this.menu = this.menus;
                    return;
                }
                this.changeBar(this.$route.meta.parent, this.$route);
            }

        },

        created() {
            this.initialize();
        }
    }
</script>
<style scoped>
    .user-info {
        font-weight: 400;
        font-size: 16px;
        color: #515a6e;
    }

    .layout{
        background: #ebf1f6;
        overflow: hidden;

        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: none;

    }
    .layout-header-bar{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 !important;

        position: absolute;
        left: 0;
        top: 0;
        height: 57px;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }

    .layout-menu {
        position: absolute;
        left: 0;
        top: 0;
        width: 100% !important;
        height: 100% !important;
    }

    .side-menu {
        position: absolute;
        top: 57px;
        left: 0;
        width: 190px !important;
        height:-webkit-calc(100% - 57px);
        height:-moz-calc(100% - 57px);
        height:calc(100% - 57px);
        border-color: #ebf1f6;

    }

    .header-item-title {
        height: 70%;
        min-width: 180px;
        margin-left: 5px;
        border-radius: 10px 0 10px 0;
        background-color: #666565;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-weight: bold;
        font-size: 18px;
    }

    .header-item-bar {
        height: 100%;
        margin-left: 10px;
    }

    .side-right {
        position: absolute;
        top: 57px;
        left: 190px;
        height:-webkit-calc(100% - 57px);
        height:-moz-calc(100% - 57px);
        height:calc(100% - 57px);
        width:-webkit-calc(100% - 200px);
        width:-moz-calc(100% - 200px);
        width:calc(100% - 200px);
        /*background: #ffffff;*/
    }

    .header-item {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .main-body {
        position: absolute;
        top: 0px;
        left: 0;
        width: 100%;
        height: 100%;
        /*height:-webkit-calc(100% - 5px);*/
        /*height:-moz-calc(100% - 5px);*/
        /*height:calc(100% - 5px);*/
        overflow-y: auto;
    }

    .content {
        position: absolute;
        top: 0;
        left: 0;
        background: #ffffff;
        width: 100% !important;
        min-height: 210px;
    }

    .scrollbar::-webkit-scrollbar {/*滚动条整体样式*/
        width: 3px !important;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px !important;
        background-color: rgba(255, 255, 255, 0) !important;
    }
    .scrollbar::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px !important;
        /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
        background: rgba(255, 255, 255, 0) !important;
    }
    .scrollbar::-webkit-scrollbar-track {/*滚动条里面轨道*/
        /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
        border-radius: 10px;
        background: rgba(255, 255, 255, 0) !important;
    }
    /*滑块效果*/
    .scrollbar::-webkit-scrollbar-thumb:hover
    {
        background: rgba(255, 255, 255, 0) !important;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }

    .el-dropdown-link {
        cursor: pointer;
    }
</style>

