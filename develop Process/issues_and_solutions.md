# 开发过程中的问题与解决方案

## 问题 1: `useSubmit` must be used within a data router

* **描述**：使用 `Form` 组件时遇到错误提示。
* **原因**：`react-router-dom` 中的 `Form` 必须配合 `data router` 使用。
* **解决方案**：确保使用 `createBrowserRouter` 和 `RouterProvider` 来创建和提供路由。

```tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
```

---

## 问题 2: 缺少“登录”按钮

* **描述**：登录页面没有“登录”按钮，用户无法提交表单。
* **解决方案**：在 `LoginPage` 组件中的 `<form>` 内添加一个 `<button type="submit">登录</button>`。

```tsx
<form onSubmit={handleSubmit}>
  <button type="submit">登录</button>
</form>
```

---

## 问题 3: 将按钮组件化

* **描述**：希望将“登录”按钮组件化，便于复用和统一样式。
* **解决方案**：创建 `LoginButton` 组件，在 `LoginPage` 中导入并使用它。

```tsx
// LoginButton.tsx
interface LoginButtonProps {
  label: string;
  onClick: () => void;
}

export default function LoginButton({ label, onClick }: LoginButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

```tsx
// LoginPage.tsx
import LoginButton from '../components/LoginButton';

<LoginButton label="登录" onClick={handleSubmit} />
```

---

## 问题 4: CSS Module 样式未生效

* **描述**：`LoginButton` 组件的样式没有正确显示。
* **原因**：CSS 模块的类名可能拼写不一致，或者没有正确导入。
* **解决方案**：确保样式名与组件中使用的类名完全一致。

```css
/* LoginButton.module.css */
.loginButton {
  background-color: #111;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 16px;
}
```

```tsx
import styles from './LoginButton.module.css';

<button className={styles.loginButton}>{label}</button>
```

---

## 问题 5: onClick 类型错误

* **描述**：TS 报错“不能将类型 `(e: React.FormEvent) => void` 分配给类型 `() => void`”。
* **原因**：组件传入的 `onClick` 需要是 `() => void` 类型，而你传入的是带参数的函数。
* **解决方案**：用箭头函数包裹传入的函数，变成 `() => handleSubmit()`。

```tsx
<LoginButton label="登录" onClick={() => handleSubmit()} />
```

---

## 问题 6: 输入框位置无法向右偏移

* **描述**：尝试使用 `margin-left: '10px';` 让输入框向右移动，但无效果。
* **原因**：CSS 中不能使用带引号的字符串作为数值。
* **解决方案**：将 `'10px'` 改为不带引号的 `10px`。

```css
.input {
  width: 80%;
  padding: 10px;
  margin-top: 12px;
  margin-left: 10px; /* 正确写法 */
  border: 1px solid #111;
  border-radius: 4px;
  background: #fff;
  color: #111;
}
```

---

## 问题 7: 样式未生效或被覆盖

* **描述**：修改了 `.input` 样式但页面没有反应。
* **原因**：可能有其他更高优先级的样式（例如内联样式）覆盖了该类名样式。
* **解决方案**：

  * 检查是否有 `style={{}}` 直接写在 `input` 元素上。
  * 使用浏览器开发者工具 (F12) 检查样式是否被覆盖。
  * 使用 `!important` 临时测试样式是否生效（不推荐长期使用）。
