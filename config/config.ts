import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
import proxy from './proxy';
import webpackPlugin from './plugin.config';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins: IPlugin[] = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://proapi.azurewebsites.net',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            }, // {
            //   path: '/admin',
            //   name: 'admin',
            //   icon: 'crown',
            //   component: './Admin',
            //   authority: ['admin'],
            //   routes: [
            //     {
            //       path: '/admin/sub-page',
            //       name: 'sub-page',
            //       icon: 'smile',
            //       component: './Welcome',
            //       authority: ['admin'],
            //     },
            //   ],
            // },
            {
              path: '/statisticalAnalysis',
              name: '统计分析',
              icon: 'crown',
              //component: './systemSetting',
              routes: [
                {
                  name: '工作台',
                  icon: 'smile',
                  path: '/statisticalanalysis/dashboardworkplace',
                  component: './statisticalAnalysis/DashboardWorkplace',
                },
                {
                  name: '分析页',
                  icon: 'smile',
                  path: '/statisticalanalysis/dashboardanalysis',
                  component: './statisticalAnalysis/DashboardAnalysis',
                },
              ],
            },
            {
              path: '/basicinfoManage',
              name: '基础信息',
              icon: 'crown',
              //component: './basicinfoManage',
              routes: [
                {
                  name: '用户管理',
                  icon: 'smile',
                  path: '/basicinfomanage/userlisttablelist',
                  component: './basicInfoManage/Userlisttablelist',
                },
                {
                  name: '学生管理',
                  icon: 'smile',
                  path: '/basicinfomanage/studentslisttablelist',
                  component: './basicInfoManage/StudentsListTableList',
                },
                {
                  name: '教师管理',
                  icon: 'smile',
                  path: '/basicinfomanage/teacherlisttablelist',
                  component: './basicInfoManage/TeacherListTableList',
                },
                {
                  name: '课程管理',
                  icon: 'smile',
                  path: '/basicinfomanage/courselisttablelist',
                  component: './basicInfoManage/CourseListTableList',
                },
                {
                  name: '班级管理',
                  icon: 'smile',
                  path: '/basicinfomanage/classlisttablelist',
                  component: './basicInfoManage/ClassListTableList',
                },
              ],
            },
            {
              path: '/infoManage',
              name: '考勤管理',
              icon: 'crown',
              //component: './systemSetting',
              routes: [
                {
                  name: '考勤表',
                  icon: 'smile',
                  path: '/infomanage/attendancesheetlist',
                  component: './infoManage/AttendanceSheetList',
                },
                {
                  name: '考勤记录',
                  icon: 'smile',
                  path: '/infomanage/arecordlisttablelist',
                  component: './infoManage/ARecordListTableList',
                },
                {
                  name: '考勤规则',
                  icon: 'smile',
                  path: '/infomanage/rulelisttablelist',
                  component: './infoManage/RuleListTableList',
                },
              ],
            },
            {
              path: '/systemSetting',
              name: '系统设置',
              icon: 'crown',
              //component: './systemSetting',
              routes: [
                // {
                //   name: '基础表单',
                //   icon: 'smile',
                //   path: '/systemsetting/formbasicform',
                //   component: './systemSetting/FormBasicForm',
                // },
              ],
            }, // {
            //   name: 'list.table-list',
            //   icon: 'table',
            //   path: '/list',
            //   component: './ListTableList',
            // },
            {
              name: '个人设置',
              icon: 'smile',
              path: '/accountsettings',
              component: './AccountSettings',
            }, // {
            //   name: '查询表格',
            //   icon: 'smile',
            //   path: '/booktable',
            //   component: './BookTable',
            // },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
} as IConfig;
