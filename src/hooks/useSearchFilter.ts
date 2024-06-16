import { useEffect, useState } from "react";

export const useSearchFilter = <T>(initialData: T[], keyExtractor: (item: T) => string) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<T[]>(initialData);

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    setSearchQuery(lowerCaseQuery);
  };

  const filterData = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    return initialData?.filter((item: T) => {
      const key = keyExtractor(item).toLowerCase();
      return key.includes(lowerCaseQuery);
    }) || [];
  };

  useEffect(() => {
    setFilteredData(filterData());
  }, [searchQuery, initialData]);

  return {
    searchQuery,
    handleSearch,
    filteredData,
  };
};
