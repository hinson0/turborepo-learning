## TODO LIST

- 1todo

  ```ts
  async function fetchUsers(): Promise<User[]> {
    const res = await fetch(`${API_BASE}/api/users`);
    const json = await res.json();
    return json.data;
  }
  ```

  `Promise<User[]>` 这段语法是什么意思???

  note 表示:
  - fetchUsers 这个异步函数,最终会返回一个User[],但不是立即返回,而是包在Promise里
  - 拆开看:
    User[] 表示User类型的数组,比如:

    ```ts
    [
      { id: 1, name: "Tom" },
      { id: 2, name: "Jack" },
    ];
    ```

    而: `Promise<User[]>`
    表示: 一个Promise, 成功拿到数据的类型是User[]

    也就是:

    `const users = await fetchUsers();`
    这个users的类型就是: `User[]`

    同步函数,这是同步函数,直接返回数组.

    ```ts
    function getUsers(): User[] {
      return [{ id: 1, name: "Tom" }];
    }
    ```

    这是异步函数,及时return 的是数组,外面拿到的也是Promise<User []>;
    因为 async 函数会自动把返回值包成 Promise。

    ```ts
    async function fetchUsers(): Promise<User[]> {
      return [{ id: 1, name: "Tom" }];
    }
    ```

- todo

  ③ CommonJS 依赖被包装成 ESM: ??? 这是什么意思

  ```js
  import **vite**cjsImport4_react from "/node_modules/.vite/deps/react.js?v=96a9aa3a";
  const useEffect = **vite**cjsImport4_react["useEffect"];
  ```

  react 内部是老式 CommonJS 写的,浏览器原生 ESM 用不了。预构建时 esbuild 顺手把它转成 ESM,再解构出 useEffect/useState。这是"预构建"除了打包之外的第二个作用:CJS→ESM 转换。

- 1todo

  下次可接的方向(你自己挑):
  - vite build 生产打包——看开发的"不打包"到生产怎么切回 Rollup、产物长什么样(和今天的开发模式正好形成完整闭环)。
  - Vite 插件机制——vite.config.ts 里 plugins: [react()] 那个 react() 到底做了什么(今天你已经看到它注入 Fast Refresh 的结果了)。
  - 或者回到你原定的 turbo 进阶计划 1(watch 开发流)。

- t1odo

  ***

  模块 2:Vite 插件机制 —— react() 到底做了什么

  先给你一个**"其实你早就见过它的作品"**的钩子:

  ★ Insight ─────────────────────────────────────
  模块 1 里,有好几个现象你默认接受了、没追问,它们其实全是同一行代码变出来的——vite.config.ts 里的 plugins: [react()]:
  - 你 App.tsx 从头到尾没写过 import React,可 <Button/>、<h1> 这些 JSX 照样能用;
  - 模块 1 curl dev 的 main.tsx,里面有 fileName: ".../main.tsx", lineNumber: 7 这种报错定位信息;
  - dev 用的是 jsxDEV(React 开发版)。

  这一节就干一件事:把 react() 这一个函数调用背后藏的活,全抖出来。 我已经读过它的真身了(@vitejs/plugin-react@4.7.0),手里攥着证据,等你先预测。
  ─────────────────────────────────────────────────

  按老规矩,先预测(这次只有 3 题,而且都扣着你已经见过的东西):

  预测题
  1. 它是几个插件? vite.config.ts 里你只写了一次 react()。你猜 react() 这个函数返回的是 1 个插件,还是好几个打包在一起?
  2. 谁替你 import 了 React? App.tsx 里没有 import React 这行,可 JSX 能正常用。你觉得是谁、在什么时候,把"让 JSX 跑起来所需的 import"补上的?(不用答准确名字,答"谁干的、大概怎么干"即可)
  3. 回调模块 1(陷阱):你在 dev 的 main.tsx 里看到的 fileName/lineNumber 报错定位信息——是谁塞进去的?生产 build 打包之后,这些信息还在不在? 为什么?

  三题写下你的猜测(没把握就说"跳过"),我就重启 dev、curl 出 App.tsx 被 react() 改写后的真身,一条条给你验。
