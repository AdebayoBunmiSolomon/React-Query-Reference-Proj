import { useState } from "react";

export const useCheckedOptions = () => {
  const [checkedOptions, setCheckedOptions] = useState<string[]>([""]);
  const addCheckedOption = (title: string) => {
    const isOptionExist = checkedOptions.some((optTitle) => optTitle === title);
    if (isOptionExist) {
      const filteredOptions = checkedOptions.filter(
        (optTitle) => optTitle !== title
      );
      setCheckedOptions(filteredOptions);
    } else {
      const updatedOptions = [...checkedOptions, title];
      setCheckedOptions(updatedOptions);
    }
  };

  return {
    addCheckedOption,
    checkedOptions,
    setCheckedOptions,
  };
};
