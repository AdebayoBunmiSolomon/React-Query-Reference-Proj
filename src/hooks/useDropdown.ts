import { useState } from "react";

export const useDropdown = () => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const onPressDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  return { onPressDropDown, setShowDropDown, showDropDown };
};
