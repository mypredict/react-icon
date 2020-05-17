# 自动清除的 setInterval 定时器

## demo

```js
import React from 'react';
import { useInterval } from './custom_hooks/index';

function Demo() {
  const { run } = useInterval((...args) => console.log(args[0]), 1000);

  return <button onClick={() => run('触发')}>触发</button>;
}
```

## params

```ts
fn: Function; // 需要延迟执行的函数
delay?: number; // 时间间隔
```

## result

```ts
run: Function; // 调用的方法
runNow: Function; // 立即调用的方法
clear: Function; // 立即取消触发函数
```
