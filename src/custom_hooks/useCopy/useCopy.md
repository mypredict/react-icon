# 复制内容到剪切板

## demo1

```js
import React from 'react';
import { useCopy } from './custom_hooks/index';

function Demo() {
  const copy = useCopy();

  return <button onClick={() => copy('被复制内容')}>复制</button>;
}
```

## demo2

```js
import React from 'react';
import { useCopy } from './custom_hooks/index';

function Demo() {
  const copy = useCopy([
    [/^d$/, ''],
    ['a', 'b']
  ]);

  return <button onClick={() => copy('被复制内容12, 数字会被替换空')}>复制</button>;
}
```

## params

```ts
params?: Array<[string | number | RegExp, string | number]>; // 复制时进行替换的规则
```

## result

```ts
handleCopy: (data: string | number) => string; // 用于复制的函数
```
