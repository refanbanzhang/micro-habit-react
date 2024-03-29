import { useState, useEffect } from "react";
import { shuffleArray } from "@/shared/utils";

const useIndexPool = (len) => {
  const [indexPool, set] = useState([]);
  const [indexItems, setIndexItem] = useState([])

  const add = (index) => {
    set(_items => ([index, ..._items]))
  }

  const reset = () => {
    set([]);
  }

  const getRandomIndex = () => {
    // 随机能避免已经在indexPool的吗？
    // 随机10个index，出来，直接从这里面的index返回，就不会存在重复了
    const [first, ...rest] = indexItems;
    if (indexPool.len === len) {
      alert('重置');
      setIndexItem(shuffleArray([...Array(len).keys()]))
    } else {
      setIndexItem(rest);
    }
    return first
  }

  useEffect(() => {
    if (len) {
      const arr = shuffleArray([...Array(len).keys()])
      debugger
      setIndexItem(arr);
    }
  }, [len])

  return {
    indexPool,
    add,
    reset,
    getRandomIndex
  }
}

export default useIndexPool;