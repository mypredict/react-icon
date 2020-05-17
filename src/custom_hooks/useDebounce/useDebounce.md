# 函数防抖

## demo

```js
import React from 'react';
import { useDebounce } from './custom_hooks/index';

function Demo() {
  const { run } = useDebounce((...args) => console.log(args[0]), 1000);

  return <button onClick={() => run('触发')}>触发</button>;
}
```

## params

```ts
fn: Function; // 需要防抖的函数
delay?: number; // 防抖的时间间隔
```

## result

```ts
run: Function; // 持续调用的方法, 其会节流触发目标函数
runNow: Function; // 立即调用的方法
clear: Function; // 立即取消触发函数
```
