import { useEffect, useRef } from "react";

const useFocus = ({ visible }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (visible) {
      // TODO: 搞清楚为什么要加定时器
      setTimeout(() => {
        ref.current?.focus();
      })
    }
  }, [visible])

  return {
    ref,
  }
}

export default useFocus
