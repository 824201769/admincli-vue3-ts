export interface UserState {
  id: number;
  user_id: number;
  nick_name?: string; // 用户名
  user_name?: string; // 账号
  avatar?: string; // 头像
  status: number; // 状态
  phone_number?: number; // 手机号
  sex?: string; // 性别
  last_login_ip?: string; // 最近登录ip
  last_login_time?: string; // 最近登录时间
  permissions?: any[]; // 权限
  roles?: any[]; // 角色
}

// export type RoleType = '' | '*' | 'admin' | 'user';
//
// export interface UserState {
//   name?: string;
//   avatar?: string;
//   job?: string;
//   organization?: string;
//   location?: string;
//   email?: string;
//   introduction?: string;
//   personalWebsite?: string;
//   jobName?: string;
//   organizationName?: string;
//   locationName?: string;
//   phone?: string;
//   registrationDate?: string;
//   accountId?: string;
//   certification?: number;
//   role: RoleType;
// }
