import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/test',
  name: 'Test',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '测试',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
    hideChildrenInMenu: true,
  },
  redirect: '/test/index',
  children: [
    {
      path: 'index/:id',
      name: 'TestIndex',
      component: () => import('@/views/test/test.vue'),
      meta: {
        title: '测试',
        requiresAuth: true,
        activeMenu: 'Test',
        roles: ['test'],
      },
    },
  ],
};

export default DASHBOARD;
