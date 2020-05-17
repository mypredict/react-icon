// 二分查找
type RV = number | [number, number];

function binarySearch<T extends any>(arr: Array<T>, target: T): RV {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    const index = Math.floor((end - start) / 2) + start;
    if (arr[index] === target) return index;
    if (arr[index] > target) {
      end = index - 1;
    } else {
      start = index + 1;
    }
  }
  return [end, start];
}

export default binarySearch;
