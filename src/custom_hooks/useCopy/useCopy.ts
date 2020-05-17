import { useCallback } from 'react';

export type ParamsTuple = Array<[string | number | RegExp, string | number]>;

export type RV = (data: string | number) => string;

function copying(data: string): string {
  const ele = document.createElement('textarea');
  ele.value = data;
  document.body.appendChild(ele);
  ele.select();
  document.execCommand('copy');
  document.body.removeChild(ele);
  return data;
}

function useCopy(params?: ParamsTuple): RV {
  const handleReplace = useCallback(
    content => {
      if (!params) {
        return content;
      }
      return params.reduce((newContent, [oldParam, newParam]) => {
        return newContent.replace(oldParam, newParam);
      }, content);
    },
    [params]
  );

  const handleCopy = useCallback(
    (content: string | number) => {
      const data = handleReplace(String(content));
      return copying(data);
    },
    [handleReplace]
  );

  return handleCopy;
}

export default useCopy;
