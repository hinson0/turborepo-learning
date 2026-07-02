## TODO LIST

- todo

```ts
async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/api/users`);
  const json = await res.json();
  return json.data;
}
```

`Promise<User[]>` 这段语法是什么意思???

- todo

  ③ CommonJS 依赖被包装成 ESM: ??? 这是什么意思

  ```js
  import **vite**cjsImport4_react from "/node_modules/.vite/deps/react.js?v=96a9aa3a";
  const useEffect = **vite**cjsImport4_react["useEffect"];
  ```

  react 内部是老式 CommonJS 写的,浏览器原生 ESM 用不了。预构建时 esbuild 顺手把它转成 ESM,再解构出 useEffect/useState。这是"预构建"除了打包之外的第二个作用:CJS→ESM 转换。

- todo

  下次可接的方向(你自己挑):
  - vite build 生产打包——看开发的"不打包"到生产怎么切回 Rollup、产物长什么样(和今天的开发模式正好形成完整闭环)。
  - Vite 插件机制——vite.config.ts 里 plugins: [react()] 那个 react() 到底做了什么(今天你已经看到它注入 Fast Refresh 的结果了)。
  - 或者回到你原定的 turbo 进阶计划 1(watch 开发流)。
