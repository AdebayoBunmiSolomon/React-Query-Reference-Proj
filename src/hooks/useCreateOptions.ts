import { useState } from "react";
import { useAddedValueStore } from "./services/useAddedValueStore";

type Option = {
  option_name: string;
  value: string;
};

export const useCreateOptions = () => {
  const [options, setOptions] = useState<{ optionName: string; values: string[] }[]>([]);

  const { optionValues, setOptionValues } = useAddedValueStore();
 
  //save option values when enter key is pressed in the text input field
  const onPressEnterToAddValue = (value: string, valueIndex: number) => {
    const valueExists = optionValues.values.some(
      (item) => item.value === value && item.index === valueIndex
    );
    if (!valueExists) {
      setOptionValues({
        ...optionValues,
        values: [...optionValues.values, { value, index: valueIndex }],
      });
    } else {
    }
  };

  const onPressToRemoveValue = (value: string, valueIndex: number) => {
    const filteredValues = optionValues.values.filter(
      (item) => !(item.value === value && item.index === valueIndex)
    );
    setOptionValues({
      ...optionValues,
      values: filteredValues,
    });
  };

  const handleAddOption = () => {
    setOptions([...options, { optionName: "", values: [] }]);
  };

    // Function to delete an option
    const handleDeleteOption = (index: number) => {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    };
  
    // Function to update option name
    const updateOptionName = (index: number, optionName: string) => {
      const newOptions = [...options];
      newOptions[index].optionName = optionName;
      setOptions(newOptions);
    };
  
    // Function to add value to an option
    const addValueToOption = (index: number, value: string) => {
      const newOptions = [...options];
      newOptions[index].values.push(value);
      setOptions(newOptions);
    };

  return {
    options,
    optionValues,
    setOptionValues,
    onPressEnterToAddValue,
    onPressToRemoveValue,
    handleAddOption,
    handleDeleteOption,
  };
};
