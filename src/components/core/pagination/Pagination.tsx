import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../../shared/AppText";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "@src/theme";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  goToPage,
}) => {
  const [showPages, setShowPages] = useState(false);

  const toggleShowPages = () => {
    setShowPages(!showPages);
  };

  const handlePageSelection = (page: number) => {
    setShowPages(false);
    goToPage(page);
  };

  const handleGoToPreviousPage = () => {
    const nextPage = currentPage - 1;
    if (nextPage >= 1) {
      goToPage(nextPage);
    }
    return nextPage;
  };
  const handleGoToNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      goToPage(nextPage);
    }
    return nextPage;
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      const isLastItem = i === totalPages;
      pageNumbers.push(
        <TouchableOpacity
          key={i}
          onPress={() => handlePageSelection(i)}
          style={[
            styles.pageNumberButton,
            !isLastItem && {
              borderBottomWidth: 1,
              borderBottomColor: Colors.gray,
            },
          ]}
        >
          <AppText>{i}</AppText>
        </TouchableOpacity>
      );
    }
    return pageNumbers;
  };

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity onPress={toggleShowPages} style={styles.currentPage}>
        <AppText gray fontRegular>
          {currentPage}
        </AppText>
        <Entypo name="chevron-down" size={18} color={Colors.gray} />
      </TouchableOpacity>
      <AppText gray fontRegular>
        of {totalPages} pages
      </AppText>
      <View style={styles.gotToPageContainer}>
        <TouchableOpacity onPress={handleGoToPreviousPage}>
          <Entypo name="chevron-left" size={18} color={Colors.gray} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoToNextPage}>
          <Entypo
            name="chevron-right"
            size={18}
            color={currentPage === totalPages ? Colors.veryLight : Colors.gray}
          />
        </TouchableOpacity>
      </View>
      <Modal
        visible={showPages}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowPages(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.pageNumbersContainer}>{renderPageNumbers()}</View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  currentPage: {
    backgroundColor: Colors.light,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 5,
    flexDirection: "row",
    gap: 5,
  },
  gotToPageContainer: {
    flexDirection: "row",
    gap: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pageNumbersContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    position: "absolute",
  },
  pageNumberButton: {
    padding: 20,
  },
});
