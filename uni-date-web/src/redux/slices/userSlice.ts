import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/types';

// Redux 中 user 状态的初始值
interface UserState {
    user: User | null; // 当前登录的用户（初始为 null 表示未登录）
}

// 初始状态
const initialState: UserState = {
    user: null,
};

// 创建用户的 slice，用于管理 user 状态
const userSlice = createSlice({
    name: 'user', // slice 名称
    initialState, // 初始状态
    reducers: {
        //  登录成功或注册成功后调用，设置用户信息
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        //  用户上传照片后调用，更新用户的照片列表
        setUserPhoto: (state, action: PayloadAction<string>) => {
            if (state.user) {
                state.user.photos.push(action.payload);
            }
        },
        //  用户删除照片后调用，更新用户的照片列表
        deleteUserPhoto: (state, action: PayloadAction<string>) => {
            if (state.user) {
                state.user.photos = state.user.photos.filter((photo) => photo !== action.payload);
            }
        },
        //  用户上传头像后调用，更新用户的头像
        setUserAvatar: (state,action: PayloadAction<string>)=>{
            if (state.user) {
                state.user.avatar = action.payload;
            }
        },

        //  用户点击退出登录时调用，清空用户信息
        clearUser: (state) => {
            state.user = null;
        },

        //  更新用户资料（只更新部分字段）
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = {
                    ...state.user,
                    ...action.payload,
                };
            }
        },
    },
});

//  导出 action，用于组件中触发
export const { setUser, clearUser, updateUser } = userSlice.actions;
//  导出 reducer，用于组合进 store
export default userSlice.reducer;