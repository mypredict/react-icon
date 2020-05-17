# 分页

通过传入总数、每页个数、当前页, 计算出开始下标、结束下标、和总页数.

## demo

```js
import React from 'react';
import { usePagination } from './custom_hooks/index';

const items = Array.from(Array(500)).map((_, index) => {
  return { id: index };
});

function Demo() {
  const { startIndex, endIndex, countPage } = usePagination({
    total: 500;
    rowsPerPage: 10;
    currentPage?: 1;
  });

  return (
    <ul>
      {
        ...
      }
    </ul>
  );
}
```

## params

```ts
total: number; // 传入总数
rowsPerPage: number; // 每页个数
currentPage?: number; // 当前页(默认为第一页)
```

## result

```ts
startIndex: number; // 开始下标
endIndex: number; // 结束下标
countPage: number; // 总页数
```
