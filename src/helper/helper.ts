export const firstCharInFirstNLastString = (text: string) => {
  const nameParts = text.split(" ");
  const firstCharacterFirstString = nameParts[0].charAt(0);
  const lastStringIndex = nameParts.length - 1;
  const firstCharacterLastString = nameParts[lastStringIndex].charAt(0);
  const joinedChar = String(
    firstCharacterFirstString + firstCharacterLastString
  ).toUpperCase();
  const nameWithoutSpaces = String(text.replace(/\s/g, "")).toLowerCase();
  return {
    joinedChar,
    nameWithoutSpaces,
  };
};

export const formatAmount = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getStatusColor = (productStatus: string) => {
  switch (productStatus) {
    case "In Stock":
      return "green";
    case "Out of Stock":
      return "red";
    case "Low Stock":
      return "yellow";
    default:
      return "gray";
  }
};

export const getStatusBackgroundColor = (productStatus: string) => {
  switch (productStatus) {
    case "In Stock":
      return "#508A8C1A";
    case "Out of Stock":
      return "#FF69611A";
    case "Low in Stock":
      return "#E899001A";
    default:
      return "#508A8C1A";
  }
};

export const truncateStatus = (str: string) => {
  return str.length > 7 ? str.substring(0, 5) + "...." : str;
};

export const truncateText = (str: string) => {
  return str.length > 20 ? str.substring(0, 15) + "...." : str;
};

export const generateOptionCombination = (options: any[]) => {
  if (options.length === 0) return [];

  const result: any = [];

  const generateCombinations = (currentIndex: number, combination: any) => {
    if (currentIndex === options.length) {
      result.push(combination.join(" / "));
      return;
    }

    options[currentIndex].values.forEach((optionValue: any) => {
      generateCombinations(currentIndex + 1, [...combination, optionValue]);
    });
  };

  generateCombinations(0, []);

  return result;
};

export const generateColorFromTheArray = (colorArr: any[]) => {
  const colors = colorArr.map((colorArr: any) => {
    return colorArr.split(" / ")[0];
  });
  const uniqueArray = [...new Set(colors)];
  return uniqueArray;
};

export const formatFirstCharacterToUpperCase = (text: string) => {
  const formattedText = text.charAt(0).toUpperCase() + text.slice(1);
  return formattedText;
};

export const returnSelectedCategoryArrayId = (selectedCategoryData: any[]) => {
  const selectedCategoryId = selectedCategoryData
    .map((items) => items.categoryId)
    .join(", ");
  const selectedCategoryName = selectedCategoryData
    .map((items) => items.name)
    .join(", ");
  const categoryIdArray = selectedCategoryId.split(",").map((id) => id.trim());
  return { categoryIdArray, selectedCategoryName };
};

export const returnSelectedStoreArrayId = (selectedStoreData: any[]) => {
  const selectedStoreId = selectedStoreData
    .map((items) => items.storeID)
    .join(", ");
  const selectedStoreName = selectedStoreData
    .map((items) => items.name)
    .join(", ");
  const storeIdArray = selectedStoreId.split(",").map((id) => id.trim());
  return { storeIdArray, selectedStoreName };
};
