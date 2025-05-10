import { useState } from "react";

export const useInput = (defVal) => {
  const [value, setValue] = useState(defVal);

  return {
    value,
    onChange: (event) => setValue(event.target.value),
  };
};
