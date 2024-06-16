import { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
import { GetCategory, GetDiscount, Products } from "./api";

export interface ProductData {
  id: number;
  name: string;
  category: string;
  sizes: string[];
  colors: string[];
  image: any;
  store: string;
  discount: number;
  price: number;
  status: string;
  quantity: number;
}

export interface scrollContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface dialPadProps {
  onPress: (itemPressed: string) => void;
  padType: "confirm-passcode" | "login-passcode";
}

export interface passCodeTopContainerProps {
  image?: boolean;
  loggedInName?: string;
  title?: string;
  passCodeTitle?: string;
  topDescr?: string;
  bottomDescr?: string;
}

export interface headerProps {
  backBtn?: boolean;
  rightIcon?: boolean;
  rightDoneIcon?: boolean;
  rightDoneText?: string;
  leftTitle?: string;
  title?: string;
  bellIconPressed?: boolean;
  onPressRight?: () => void;
}

export interface ProductItemProps {
  product: Products;
}

export interface homeHeaderProps {
  onOpenSlideMenu?: () => void;
  loggedInName?: string;
}

export interface customDrawerProps {
  loggedInName: string;
  userName: string;
  props: any;
}

export interface PurchaseProps {
  id: number;
  name: string;
  icon: any;
  dateAdded: string;
  amount: number;
}
[];

export interface DiscountProps {
  title: string;
  used: number | null;
}

export interface CategoryProps {
  id: number;
  item: string;
  itemCount: number;
}

export interface Receipt {
  id: number;
  time: string;
  receiptNumber: string;
  amount: number;
  paidWith: string;
}
[];

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

export interface listItemProps {
  data: customerData | employeeData;
  onEditCustomer: (
    name: string,
    email: string,
    address: string,
    city: string,
    state: string,
    country: string,
    phone: string
  ) => void;
  onEditEmployee: (
    name: string,
    email: string,
    phone: string,
    passcode: string
  ) => void;
  onPressDelete: (dataId: number) => void;
  isEdit?: boolean;
  showStatus?: boolean;
}

export interface discountItemProps {
  data: GetDiscount;
  onEditNavigate: string;
}
export interface PaymentTypeProps {
  id: number;
  name: string;
  status: string;
  iconName: any;
}
export interface paymentItemProps {
  data: PaymentTypeProps;
  onEditNavigate: string;
}

export interface categoryItemProps {
  data: GetCategory;
  onEditNavigate: string;
}

//customer list data
export type customerData = {
  customerID: number;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
};

//employee list data
export type employeeData = {
  employeeID: number;
  name: string;
  email: string;
  phone: string;
  passcode: string;
};

export interface storeOverViewProps {
  onPressToday: () => void;
  onPressFilter: () => void;
  style?: StyleProp<ViewStyle>;
}

export interface dashBoardProps {
  grossVal: number;
  grossPercent: number;
  refundVal: number;
  refundPercent: number;
  discountVal: number;
  discountPercent: number;
  netSalesVal: number;
  netSalesPercent: number;
}

export type subscriptionType = {
  image: ImageSourcePropType;
  plan: string;
  price: number;
  description: string;
  buttonText: string;
};

export type taxItem = {
  data: {
    taxId: number;
    name: string;
    ratePercentage: string;
    type: string;
  };
};

export interface sheetModalProps {
  modalRef: any;
  modalOpen: boolean;
  onCloseModal: (modalClose: boolean) => void;
  children: React.ReactNode;
  snapPoints: string[];
}

export interface productFormProps {
  openOptionModal: () => void;
  openStoreModal: () => void;
  openCategoryModal: () => void;
  openDiscountModal: () => void;
}

export interface servicesFormProps {
  openStoreModal: () => void;
  openCategoryModal: () => void;
}

export type sheetModalType = {
  modalOpen: boolean;
  modalRef: any;
  onCloseModal: (modalClose: boolean) => void;
  snapPoints: string[];
};
