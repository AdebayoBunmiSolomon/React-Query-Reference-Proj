import { useState } from "react";

export const usePhoneNumber = () => {
  const [phNumber, setPhNumber] = useState<string>("");
  return {
    setPhNumber,
    phNumber,
  };
};
