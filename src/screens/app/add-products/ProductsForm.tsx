import { Entypo } from "@expo/vector-icons";
import {
  AppBtn,
  AppInput,
  AppText,
  OptionsCombination,
  Representation,
  SoldBy,
  SwitchToggle,
  VariantOptions,
} from "@src/components";
import {
  generateOptionCombination,
  returnSelectedCategoryArrayId,
  returnSelectedStoreArrayId,
} from "@src/helper/helper";
import { useSelectedCategoryData } from "@src/hooks/services/useSelectedCategory";
import { useSelectedDiscountData } from "@src/hooks/services/useSelectedDiscount";
import { useSelectedStoreData } from "@src/hooks/services/useSelectedStore";
import { useVariantOptionStore } from "@src/hooks/services/useVariantOptionStore";
import { useSwitchToggle } from "@src/hooks/useSwitchToggle";
import { useCreateProduct } from "@src/services/mutations/productMutation";
import { useOptionsStore, useUser } from "@src/state";
import { Colors, RPH, RPW, Sizes } from "@src/theme";
import { createProductInformation } from "@src/types/api";
import { productFormProps } from "@src/types/types";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

const soldBy = ["each", "weight"];
const representationOnPos = ["color", "image"];

export const ProductsForm: React.FC<productFormProps> = ({
  openOptionModal,
  openStoreModal,
  openCategoryModal,
  openDiscountModal,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<createProductInformation>({ mode: "onChange" });
  const { selectedCategoryData } = useSelectedCategoryData();
  const { selectedStoreData } = useSelectedStoreData();
  const { selectedDiscountData } = useSelectedDiscountData();
  const { deleteOption, options } = useOptionsStore();
  const [editingOptions, setEditingOptions] = useState(false);
  const optionCombination = generateOptionCombination(options);
  const { toggledSwitch, setToggledSwitch } = useSwitchToggle();
  //for sold-by selection
  const [selectedSoldByItem, setSelectedSoldByItem] = useState<string>("each");
  //for product representation selection
  const [selectedProdRepItem, setSelProdRepItem] = useState<string>("color");
  const selectedCategory = returnSelectedCategoryArrayId(selectedCategoryData);
  const selectedStore = returnSelectedStoreArrayId(selectedStoreData);
  const { variantsStore } = useVariantOptionStore();
  const { storeId } = useUser();
  const { mutate, isPending } = useCreateProduct(storeId);

  const handleDeleteOption = (index: number) => {
    deleteOption(index);
  };

  const handleEditOption = () => {
    setEditingOptions(!editingOptions);
    openOptionModal();
  };
  const handleRegister = async (data: createProductInformation) => {
    data.categoriesId = selectedCategory.categoryIdArray;
    data.storeId = selectedStore.storeIdArray;
    data.discountId = selectedDiscountData.id;
    data.trackStock = toggledSwitch;
    data.soldBy = selectedSoldByItem;
    data.representationOnPos = selectedProdRepItem;
    data.variants = variantsStore;
    console.log(data);
    mutate(data);
  };

  return (
    <>
      <Controller
        control={control}
        render={({ field }) => (
          <AppInput
            label='Product Name'
            placeholder='John Doe LTD'
            value={field.value}
            onChangeText={(text) => field.onChange(text)}
            errors={errors?.name?.message}
          />
        )}
        rules={{
          required: {
            value: true,
            message: "Product name is required",
          },
        }}
        name='name'
        defaultValue=''
      />

      <Controller
        control={control}
        render={({ field }) => (
          <AppInput
            label='Category'
            placeholder='Select Product Category'
            value={selectedCategory.selectedCategoryName}
            onChangeText={(text) => {
              field.onChange(text);
            }}
            errors={errors?.categoriesId?.message}
            showDropDown
            clickDropDown={() => openCategoryModal()}
            showSoftInputOnFocus={true}
          />
        )}
        rules={{
          required: {
            value: true,
            message: "Category is required",
          },
        }}
        name='categoriesId'
        defaultValue={[]}
      />

      <Controller
        control={control}
        render={({ field }) => (
          <AppInput
            label='Select store to add product'
            placeholder='Select Store'
            value={selectedStore.selectedStoreName}
            onChangeText={(text) => field.onChange(text)}
            errors={errors?.storeId?.message}
            showDropDown
            clickDropDown={() => openStoreModal()}
            showSoftInputOnFocus={true}
          />
        )}
        rules={{
          required: {
            value: true,
            message: "Product store is required",
          },
        }}
        name='storeId'
        defaultValue={[]}
      />

      {/* sold by selection */}
      <AppText fontMedium black style={styles.typeLabel}>
        Sold By:
      </AppText>
      <View style={styles.radioSelection}>
        <SoldBy
          data={soldBy}
          onPressSelectedItem={(items) => setSelectedSoldByItem(items)}
          selectedSoldByItem={selectedSoldByItem}
        />
      </View>

      <View style={styles.variantContainer}>
        <AppText fontMedium black>
          Variant
        </AppText>
        <AppText fontMedium small gray>
          Use variants if an item has different sizes, color or other options
        </AppText>
        <AppBtn
          title={options.length > 0 ? "Edit Options" : "Add Option"}
          icon={<Entypo name='plus' color={Colors.white} size={Sizes.font20} />}
          style={styles.variantBtn}
          onPress={
            options.length > 0
              ? () => handleEditOption()
              : () => openOptionModal()
          }
        />
        <VariantOptions
          data={options}
          handleDeleteOption={(index) => handleDeleteOption(index)}
        />
      </View>

      <OptionsCombination data={optionCombination} />

      <Controller
        control={control}
        render={({ field }) => (
          <AppInput
            label='Discount'
            placeholder='Select Product Discount'
            value={selectedDiscountData.name}
            onChangeText={(text) => field.onChange(text)}
            errors={errors?.discountId?.message}
            showDropDown
            clickDropDown={() => openDiscountModal()}
            showSoftInputOnFocus={true}
          />
        )}
        rules={{
          required: {
            value: true,
            message: "Discount is required",
          },
        }}
        name='discountId'
        defaultValue=''
      />

      {/*product representation selection */}
      <AppText fontMedium black style={styles.typeLabel}>
        Product Representation:
      </AppText>
      <View style={styles.radioSelection}>
        <Representation
          data={representationOnPos}
          setSelectedProRepItem={(item) => setSelProdRepItem(item)}
          selectedProdRepItem={selectedProdRepItem}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <AppText fontMedium semiMedium gray>
          Track Stock
        </AppText>
        <SwitchToggle
          onToggle={(toggledSwitch) => setToggledSwitch(toggledSwitch)}
          toggleSwitch={toggledSwitch}
        />
      </View>

      <AppBtn
        title='Proceed'
        onPress={handleSubmit(handleRegister)}
        disabled={isPending}
      />
    </>
  );
};

const styles = StyleSheet.create({
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioSelection: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font18,
    marginBottom: Sizes.font14,
  },
  typeLabel: {
    marginBottom: Sizes.font6,
  },
  variantBtn: {
    width: RPH(20),
    borderRadius: Sizes.font50,
  },
  variantContainer: {
    marginBottom: Sizes.font20,
    gap: Sizes.font4,
  },
});
