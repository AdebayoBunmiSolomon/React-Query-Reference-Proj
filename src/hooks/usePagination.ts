import { useState } from "react";
export const usePagination = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getTotalPages = (dataListLength: number, dataPerPage: number) => {
    const totalPages = Math.ceil(dataListLength / dataPerPage);
    return totalPages;
  };

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    setSearchQuery(lowerCaseQuery);
    setCurrentPage(1);
  };

  const isDataLoading = (dataList: any, dataPerPage: number) => {
    let isLoading: boolean = true;
    // Filter customers based on search query
    try {
      isLoading = true;
      const data = getFilteredDataListForCurrentPage(dataList, dataPerPage);
      isLoading = true;
      if (data && data.length > 0) {
        return (isLoading = false);
      } else {
        return (isLoading = true);
      }
    } catch (err: any) {
      console.log("Error", err);
      return (isLoading = true);
    }
  };

  // Filter and paginate customers based on search query and pagination
  const getFilteredDataListForCurrentPage = (
    dataList: any,
    dataPerPage: number
  ) => {
    // Filter customers based on search query
    try {
      if (dataList && dataList) {
        const filteredData = dataList.filter((items: any) =>
          items.name.toLowerCase().includes(searchQuery)
        );
        // Paginate filtered customers
        const startIndex = (currentPage - 1) * dataPerPage;
        const endIndex = startIndex + dataPerPage;
        return filteredData.slice(startIndex, endIndex);
      } else {
        console.log("The provide data is not an array");
      }
    } catch (err: any) {
      console.log("Error", err);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    handleSearch,
    getFilteredDataListForCurrentPage,
    getTotalPages,
    isDataLoading,
  };
};
