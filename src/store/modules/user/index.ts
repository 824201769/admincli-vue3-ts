import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
  LoginData,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserState } from './types';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: 0,
    user_id: 0,
    nick_name: undefined,
    user_name: undefined,
    avatar: undefined,
    status: 0,
    phone_number: undefined,
    sex: undefined,
    last_login_ip: undefined,
    last_login_time: undefined,
    permissions: [],
    roles: [],
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();
      /**
       * 组合成自己需要的权限数组
       */
      const user = res.data;
      const routerRoles: any[] | undefined = [];
      const routerPermissions: any[] | undefined = [];

      // @ts-ignore
      user.posts.forEach((item: object) => {
        // @ts-ignore
        routerRoles.push(item.post_code);
      });
      // @ts-ignore
      user.permissions.forEach((item: object) => {
        // @ts-ignore
        routerPermissions.push(item.code);
      });
      user.roles = routerRoles;
      user.permissions = routerPermissions;
      this.setInfo(user);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
