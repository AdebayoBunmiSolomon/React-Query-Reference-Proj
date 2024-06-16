import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  AppBtn,
  AppInput,
  AppText,
  MultiInputSelect,
  ScrollContainer,
  SheetModal,
} from "@src/components";
import { useOptionsStore } from "@src/state";
import { Colors, RPW, Sizes, verticalScale } from "@src/theme";
import { createProductInformation } from "@src/types/api";
import { sheetModalType } from "@src/types/types";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

export const CreateOption: React.FC<sheetModalType> = ({
  modalOpen,
  modalRef,
  onCloseModal,
  snapPoints,
}) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<createProductInformation>({ mode: "onChange" });

  const {
    addOption,
    deleteOption,
    updateOptionName,
    addValueToOption,
    removeValueFromOption,
    options,
  } = useOptionsStore();

  const handleAddOption = () => {
    addOption();
  };

  const handleDeleteOption = (index: number) => {
    deleteOption(index);
  };

  const onSubmit = () => {
    onCloseModal(true);
  };

  return (
    <>
      <SheetModal
        modalOpen={modalOpen}
        modalRef={modalRef}
        onCloseModal={onCloseModal}
        snapPoints={snapPoints}>
        <AppText fontBold semiMedium black style={styles.title}>
          Create Option
        </AppText>
        <ScrollContainer>
          <View style={{ flexDirection: "column", gap: Sizes.font16 }}>
            {options.map((option, index) => (
              <View key={index}>
                <View style={styles.optionNameContainer}>
                  <AppInput
                    label={`Option name ${index + 1}`}
                    value={option.optionName}
                    onChangeText={(text) => updateOptionName(index, text)}
                    placeholder={`Option name ${index + 1}`}
                    errors={errors.option_name?.message}
                    style={{
                      width: "81%",
                    }}
                  />
                  <AppBtn
                    title=''
                    icon={
                      <AntDesign
                        name='delete'
                        size={Sizes.font20}
                        color={Colors.red}
                      />
                    }
                    style={styles.deleteBtn}
                    onPress={() => handleDeleteOption(index)}
                  />
                </View>

                <MultiInputSelect
                  tags={option.values}
                  onAddTag={(tag) => addValueToOption(index, tag)}
                  onRemoveTag={(valueIndex) =>
                    removeValueFromOption(index, valueIndex)
                  }
                />
              </View>
            ))}
          </View>
          <AppBtn
            title='Add Option'
            icon={
              <Entypo name='plus' color={Colors.white} size={Sizes.font20} />
            }
            style={styles.optionBtn}
            onPress={handleAddOption}
          />
        </ScrollContainer>
        <AppBtn
          title='Done'
          onPress={() => {
            handleSubmit(onSubmit);
            onCloseModal(false);
          }}
          style={{
            marginBottom: Sizes.font50,
          }}
        />
      </SheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
  },
  optionBtn: {
    width: RPW(40),
    borderRadius: Sizes.font50,
    alignSelf: "flex-start",
    marginTop: Sizes.font10,
  },
  optionNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font6,
  },
  deleteBtn: {
    width: RPW(15),
    paddingVertical: Sizes.font14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEEDED",
    borderRadius: Sizes.font6,
  },
  valuesContainer: {
    flexDirection: "row",
    gap: Sizes.font10,
    paddingHorizontal: Sizes.font10,
    marginTop: verticalScale(-15),
    marginBottom: verticalScale(5),
  },
  valueListBtn: {
    paddingHorizontal: Sizes.font10,
    paddingVertical: Sizes.font4,
    borderRadius: Sizes.font45,
  },
});
