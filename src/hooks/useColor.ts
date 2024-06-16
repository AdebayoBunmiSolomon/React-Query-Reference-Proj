import { useColorStore } from "./services/useColorStore";

export const useColor = () => {
  const { color, setColor } = useColorStore();
  const addColor = (colorValue: string) => {
    const colorExists = color.some(
      (color) => color.color.toLowerCase() === colorValue
    );
    if (colorExists) {
      console.log(colorValue, " already exist");
    } else {
      const updateColor = [...color, { color: colorValue }];
      setColor(updateColor);
    }
  };

  const removeColor = (colorValue: string) => {
    const colorExists = color.some(
      (color) => color.color.toLowerCase() === colorValue
    );
    if (colorExists) {
      const removedColor = color.filter((color) => color.color !== colorValue);
      const updatedColor = removedColor;
      setColor(updatedColor);
    } else {
      console.log("Color cannot be removed");
    }
  };

  return {
    addColor,
    removeColor,
  };
};
