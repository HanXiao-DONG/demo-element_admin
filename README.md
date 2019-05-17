  # 菜单配置

  ## 目录
  src/components/common/js/route.js

  ## 首页配置
  说明（一）：一级菜单非必须设置（如果没有设置一级菜单，则所有二级菜单变成一级菜单，此时页面没有head bar，只有side bar），
  二级菜单必须设置，其中首页必须设置（二级菜单）。
 
  说明（二）：icon和iconClass同时设置，则优先取iconClass。
  
  说明（三）：字段默认必须，可选会用"【可选】"标出。
  
  说明（四）：菜单最多支持4级。
  
  推荐index值配置规则：
       一级菜单：project_a
       二级菜单：project_a_b
       三级菜单：project_a_b_c
       四级菜单：project_a_b_c_d

  ## top bar配置
 
  首页菜单配置(homePage)
 
  ```ruby 
  homeParent: {                      // 首页（一级菜单）【可选】
       index: string,                // index值，唯一不能重复
       name: string,                 // 菜单标题
       icon: string,                 // iview自带icon【icon和iconClass必须设置一个】【可选】
       iconClass: string             // 阿里iconfont值【icon和iconClass必须设置一个】【可选】
  },
  home: {                            // 首页（二级菜单）
       parent: string,               // 对应首页一级菜单的index【(route.showParent === true: 必须); (route.showParent === false: 不填写)】【可选】
       index: {
           role: string,             // index值唯一不能重复
           name: string,             // 菜单标题
           icon: string,             // iview自带icon【icon和iconClass必须设置一个】【可选】
           iconClass: string         // 阿里iconfont值【icon和iconClass必须设置一个】【可选】
       },
       onlyIndex: {                  // 二级菜单唯一子菜单
           component: string,        // 页面路径，以page为跟路径，例：/index.vue
           path: string,             // 路径
           index: string,            // index值，唯一不能重复
           permission: string,       // 权限（字符串）
           menuShow: boolean         // 是否在页面显示该标签
       }
  }
  ```

  ## left bar配置
 
  路由菜单配置(route)
 
  ```ruby 
  showParent: boolean                                  // 是否显示一级菜单
  parentMenu: [                                        // 一级菜单【(showParent === true: 必须); (showParent === false: 不填写)】【可选】
       homePage.homeParent,                            // 首页的一级菜单【注意：如果homePage中没有配置，此处忽略】【可选】
       {
           index: string,                              // 一级菜单的index
           name: string,                               // 菜单标题
           icon: string,                               // iview自带icon【icon和iconClass必须设置一个】【可选】
           iconClass: string                           // 阿里iconfont值【icon和iconClass必须设置一个】【可选】
       }
  ]
  menu: [                                              // 一级菜单的所有子菜单
       homePage.home,                                  // 首页的二级菜单
       {                                               // 二级菜单
           parent: string,                             // 对应一级菜单的index【(showParent === true: 必须); (showParent === false: 不填写)】【可选】
           index: {
               role: string,                           // 二级菜单index值
               name: string,                           // 菜单标题
               icon: string,                           // iview自带icon【icon和iconClass必须设置一个】【可选】
               iconClass: string                       // 阿里iconfont值【icon和iconClass必须设置一个】【可选】
           },
           subMenu: [                                  // 二级菜单的所有子菜单【subMenu和onlyIndex必须设置其一】【可选】
               {                                       // 三级菜单
                   child: boolean,                     // 是否有四级子菜单【此处是无四级子菜单的例子，即child: false】【child === false时可选】
                   index: string,                      // 三级菜单index值
                   component: string,                  // 页面路径，以page为跟路径，例：/index.vue
                   name: string,                       // 菜单标题
                   icon: string,                       // iview自带icon【icon和iconClass必须设置一个】【可选】
                   iconClass: string,                  // 阿里iconfont值【icon和iconClass必须设置一个】【可选】
                   path: string,                       // 路径
                   permission: string,                 // 权限（字符串）
                   menuShow: boolean                   // 是否在页面显示该标签
               },
               {
                   child: boolean,                     // 是否有四级子菜单【此处是有四级子菜单的例子，即child: true】
                   index: {
                       role: string,                   // 三级菜单index值
                       name: string,                   // 菜单标题
                       icon: string,                   // iview自带icon【icon和iconClass必须设置一个】【可选】
                       iconClass: string               // 阿里iconfont值【icon和iconClass必须设置一个】【可选】
                   },
                   subMenu: [
                       {
                           index: string,              // 四级菜单index值
                           component: string,          // 页面路径，以page为跟路径，例：/index.vue
                           name: string,               // 菜单标题
                           icon: string,               // iview自带icon【icon和iconClass必须设置一个】【可选】
                           iconClass: string,          // 阿里iconfont值【icon和iconClass必须设置一个】【可选】
                           path: string,               // 路径
                           permission: string,         // 权限（字符串）
                           menuShow: boolean           // 是否在页面显示该标签
                       }
                   ]
               }
           ],
           onlyIndex: {                                // 二级菜单唯一子菜单【subMenu和onlyIndex必须设置其一】【可选】
               component: string,                      // 页面路径，以page为跟路径，例：/index.vue
               path: string,                           // 路径
               index: string,                          // index值，唯一不能重复
               permission: string,                     // 权限（字符串）
               menuShow: boolean                       // 是否在页面显示该标签
           }
       }
  }
  ```
 
 
