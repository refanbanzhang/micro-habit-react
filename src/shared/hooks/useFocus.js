import { useEffect, useRef } from "react";

const useFocus = ({ visible }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (visible) {
      ref.current?.focus();
    }
  }, [visible])

  return {
    ref,
  }
}

export default useFocus
