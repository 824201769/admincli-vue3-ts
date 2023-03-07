import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store';

export default function usePermission() {
  const userStore = useUserStore();
  return {
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      let isNext = false;
      if (
        !route.meta?.requiresAuth ||
        !route.meta?.roles ||
        route.meta?.roles?.includes('*')
      ) {
        isNext = true;
      } else {
        route?.meta?.roles?.forEach((item: string) => {
          // @ts-ignore
          if (userStore.roles.includes(item as never)) {
            isNext = true;
          }
        });
      }

      return isNext;
      // return (
      //
      // );
    },
    // findFirstPermissionRoute(_routers: any, permissions: any) {
    //   const cloneRouters = [..._routers];
    //   while (cloneRouters.length) {
    //     const firstElement = cloneRouters.shift();
    //     console.log('-=====firstElement', firstElement);
    //     // if (
    //     //   firstElement?.meta?.roles?.find((el: string[]) => {
    //     //     return el.includes('*') || el.includes(role);
    //     //   })
    //     // )
    //
    //     if (
    //       firstElement?.meta?.roles?.find((r: string) => {
    //         console.log('====rrrrr', r);
    //         console.log('====', permissions.includes(r as never));
    //         return permissions.includes(r as never);
    //       })
    //     )
    //       return { name: firstElement.name };
    //     if (firstElement?.children) {
    //       cloneRouters.push(...firstElement.children);
    //     }
    //   }
    //   return null;
    // },
    // You can add any rules you want
  };
}
