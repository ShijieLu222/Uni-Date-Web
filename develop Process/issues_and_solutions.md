# 开发过程中的问题与解决方案

## 问题 1: useSubmit must be used within a data router
- **描述**: 使用 `Form` 组件时遇到错误。
- **解决方案**: 确保使用 `createBrowserRouter` 和 `RouterProvider`，并正确配置路由。
  ```tsx
  import { createBrowserRouter, RouterProvider } from 'react-router-dom';

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  function App() {
    return (
      <RouterProvider router={router} />
    );
  }
  ```

## 问题 2: 缺少“登录”按钮
- **描述**: 登录页面没有“登录”按钮。
- **解决方案**: 在 `LoginPage` 组件中添加一个 `<button type="submit">登录</button>`。

## 问题 3: 将按钮组件化
- **描述**: 希望将“登录”按钮组件化以便复用。
- **解决方案**: 创建 `LoginButton` 组件，并在 `LoginPage` 中使用。

## 问题 4: CSS Module Class Not Found
- **描述**: `LoginButton` 组件的样式未正确应用。
- **解决方案**: 确保 CSS 模块中的类名与组件中使用的类名匹配。

## 问题 5: 添加按钮到登录页面
- **描述**: 需要在登录页面中添加一个提交按钮。
- **解决方案**: 在 `LoginPage` 中使用 `LoginButton` 组件，并确保 `handleSubmit` 函数处理表单提交。