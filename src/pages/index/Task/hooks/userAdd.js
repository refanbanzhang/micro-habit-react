import { useState } from "react";

const useAdd = () => {
  const [visible, setVisible] = useState(false);

  return {
    visible,
    setVisible,
  }
}

export default useAdd