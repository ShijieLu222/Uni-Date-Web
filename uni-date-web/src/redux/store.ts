import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// 创建 Redux Store，把 userReducer 添加进来
export const store = configureStore({
  reducer: {
    user: userReducer, // state.user 就是 userSlice 管的状态
  },
});

// 定义类型：RootState 表示整个 Redux 状态结构
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
