import { DirectiveBinding } from 'vue';
import { useUserStore } from '@/store';

function accessButtonPermissions(value: [] | any) {
  let isNext = false;
  value.forEach((item: string) => {
    // @ts-ignore
    if (useUserStore().permissions.includes(item as never)) {
      isNext = true;
    }
  });

  return isNext;
}

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding;
  if (!Array.isArray(value)) {
    throw new Error(`权限是一个数组`);
  }
  if (value.length > 0) {
    if (!accessButtonPermissions(value) && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }

  // const { value } = binding;
  // const userStore = useUserStore();
  // const { permissions } = userStore;

  // if (Array.isArray(value)) {
  //   if (value.length > 0) {
  //     const permissionValues = value;
  //
  //     const hasPermission = permissionValues.includes(role);
  //     if (!hasPermission && el.parentNode) {
  //       el.parentNode.removeChild(el);
  //     }
  //   }
  // } else {
  //   throw new Error(`need roles! Like v-permission="['admin','user']"`);
  // }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
};
