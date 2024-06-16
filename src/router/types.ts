import { type ParamListBase } from "@react-navigation/native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { type DrawerScreenProps } from "@react-navigation/drawer";
import { CreateReceiptDTO } from "@src/types/api";
import { UseMutateFunction } from "@tanstack/react-query";

export interface AuthStackParamList extends ParamListBase {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  ResetPasswordEmailOtp: undefined;
  OnBoarding: undefined;
  LoginPasscode: undefined;
  SetPasscode: undefined;
  VerifyEmail: undefined;
  SubscriptionPlan: undefined;
}

export type AuthScreenProps<ScreenName extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, ScreenName>;

export interface TabStackParamList extends ParamListBase {
  Home: undefined;
  Products: undefined;
  Customers: undefined;
  Discounts: undefined;
  Account: undefined;
  Inventories: undefined;
  Order: undefined;
  Reciepts: undefined;

  // ProductPreview: undefined;
}

export type TabScreenProps<ScreenName extends keyof TabStackParamList> =
  BottomTabScreenProps<TabStackParamList, ScreenName>;

export interface RootStackParamsList extends ParamListBase {
  HomeScreen: undefined;
  AddProducts: undefined;
  ProductVariants: undefined;
  ProductPreview: undefined;
  CartPreview: undefined;
  Order: undefined;
  OrderReceipt: undefined;
  OrderPayment: undefined;
  OrderRefund: undefined;
  ProductInformation: undefined;
  AddCustomer: undefined;
  EditCustomer: undefined;
  CustomerProfile: undefined;
  UserPurchases: undefined;
  EmployeeList: undefined;
  AddEmployee: undefined;
  Discounts: undefined;
  EditDiscount: undefined;
  AddDiscount: undefined;
  EmployeeRoleList: undefined;
  RoleUsers: undefined;
  AddRole: undefined;
  EditEmployee: undefined;
  CreateStore: undefined;
  StoreInfo: undefined;
  ConnectPrinter: undefined;
  PaymentTypes: undefined;
  AddPaymentType: undefined;
  EditPaymentType: undefined;
  TaxList: undefined;
  AddTax: undefined;
  SnapToAdd: undefined;
  ReceiptSettings: undefined;
  UpdateReceipt: undefined;
  PreviewReceipt: {
    onSubmit: () => Promise<void>;
    data: CreateReceiptDTO;
  };
}

export type RootStackProps<ScreenName extends keyof RootStackParamsList> =
  NativeStackScreenProps<RootStackParamsList, ScreenName>;

export type DrawerStackScreenProps<
  ScreenName extends keyof DrawerStackParamList
> = DrawerScreenProps<DrawerStackParamList, ScreenName>;

export interface DrawerStackParamList extends ParamListBase {
  Employee: undefined;
  Customer: undefined;
  Stores: undefined;
  Discount: undefined;
  Cart: undefined;
  Category: undefined;
}
