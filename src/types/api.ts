export interface CreateAccountData {
  email: string;
  password: string;
  business_name: string;
  business_industry: string;
  country: string;
}

export interface VerifyDTO {
  emailPasscode: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export type StoreId = number | null;

export interface ActiveStore {
  storeId: number | null;
  name: string | null;
}

interface UserRole {
  createdAt: string | null;
  updatedAt: string | null;
  roleId: number;
  name: string;
  employeeAccessRight: EmployeeAccessRight[];
  employees: any[] | null;
  store: any | null;
  storeOwner: any | null;
}

interface EmployeeAccessRight {
  createdAt: string | null;
  updatedAt: string | null;
  accessId: number;
  name: string;
  accessToPOS: boolean;
  accessToAdmin: boolean;
  roles: any[] | null;
  store: any | null;
  isNotSynced?: boolean;
}

export interface UserProfile {
  userID: number;
  email: string;
  username: string | null;
  password: string | null;
  business_name: string;
  country: string;
  business_industry: string;
  emailVerified: string | null;
  roles: UserRole[];
  stores: Store[];
  passcode: string | null;
  isNotSynced?: boolean;
  activeStore: ActiveStore;
}

export interface createProductInformation {
  name: string;
  soldBy: string; //enum for each or weight
  trackStock: boolean;
  discountId: string;
  representationOnPos: string; //image or color
  categoriesId: string[];
  storeId: string[];
  variants: {
    variantName: string;
    price: number;
    cost: number;
    sku: string;
    quantity: number;
    barcode: string;
  }[];
}

export interface Products {
  //to get all products
  getProductResponse: {
    productID: number;
    itemID: string;
    name: string;
    variantName: string;
    soldBy: string;
    price: string;
    discountedPrice: string;
    cost: string;
    sku: string;
    barcodeNumber: string;
    trackStock: boolean;
    quantity: number;
    inStock: boolean;
    discount: {
      createdAt: any;
      updatedAt: any;
      discountId: number;
      name: string;
      percentage: number;
      products: any[];
      sales: any[];
      store: any;
    };
    representationOnPos: string;
    categories: any[];
  }[];
  totalPage: number;
  pageNo: number;
  pageSize: number;
  totalElement: number;
  last: boolean;
}

export interface GetProducts {
  //get a single product
  getProductResponses: {
    productID: number;
    itemID: string;
    name: string;
    variantName: string;
    soldBy: string;
    price: string;
    discountedPrice: string;
    cost: string;
    sku: string;
    barcodeNumber: string;
    trackStock: boolean;
    quantity: number;
    inStock: boolean;
    discount: {
      createdAt: any;
      updatedAt: any;
      discountId: number;
      name: string;
      percentage: number;
      products: any[];
      sales: any[];
      store: any;
    };
    representationOnPos: string;
    categories: any[];
  }[];
  totalPage: number;
  pageNo: number;
  pageSize: number;
  totalElement: number;
  last: boolean;
}

export interface updateProductDTO {
  name: string;
  soldBy: string;
  itemId: string;
  productId: string;
  price: string;
  cost: string;
  sku: string;
  barcodeNumber: string;
  trackStock: boolean;
  inStock: boolean;
  quantity: string;
  discount: string;
  variantName: string;
  representationOnPos: string;
  categories: string[];
}

export interface createSizeVariant {
  product_size: string;
  size_variations: string;
}

export interface createEmployee {
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
  pos_pin: string;
  store_access: string;
  profile_image: string;
}

export interface createEmployeeRole {
  role_name: string;
  pos: boolean;
  back_office: boolean;
}

export interface GetDiscount {
  discountId: number;
  name: string;
  percentage: string;
  store: Store;
  isNotSynced?: boolean;
}

export interface Discounts {
  discountId: number;
  name: string;
  percentage: string;
  store: Store;
}

export interface CreateDiscountDTO {
  name: string;
  percentage: string;
}
export interface UpdateDiscountDTO {
  name: string;
  percentage: string;
}

// categories

export interface ItemSold {
  itemsSoldId: number;
  productId: string;
  quantity: string;
  purchases: string;
  isNotSynced?: boolean;
}

export interface Receipt {
  receiptId: number;
  logo: string;
  address: string;
  phoneNumber: string;
  header: string;
  footer: string;
  totalPrice: number;
  balance: number;
  modeOfPayment: string;
  employee: string;
  itemsSoldObjectList: ItemSold[];
  store: string;
  purchase: string;
  isNotSynced?: boolean;
}

export interface Sale {
  salesId: number;
  posNumber: number;
  itemsSold: ItemSold[];
  totalCost: number;
  discountedTotalCost: number;
  modeOfPayment: string;
  refundReceipt: boolean;
  applyDiscountOnTotalSale: boolean;
  discount?: string;
  customer: GetCustomer;
  employee: string;
  store: string;
  receipts: Receipt[];
  isNotSynced?: boolean;
}

export interface Discount {
  discountId: number;
  name: string;
  percentage: number;
  products: Product[];
  sales: Sale[];
  store: Store;
}

export interface Product {
  itemId: number;
  name: string;
  soldBy: string;
  price: number;
  discountedPrice: number;
  cost: number;
  sku: string;
  quantity: number;
  barcodeNumber: number;
  trackStock: boolean;
  inStock: boolean;
  discount?: Discount;
  store: string;
  representationOnPos: string;
  categories: GetCategory[];
  isNotSynced?: boolean;
}

export interface GetCategory {
  categoryId: number;
  name: string;
  color: string;
  products: Product[];
  store: string;
  isNotSynced?: boolean;
}

export interface Categories {
  categoryId: number;
  name: string;
  color: string;
  products: Product[];
  store: string;
}

export interface UpdateCategoryDTO {
  name: string;
  color: string;
}
export interface CreateCategoryDTO {
  name: string;
  color: string;
}

export interface Passcode {
  passcodeId: number;
  value: string;
  employee: string[];
  storeOwner: string[];
  store: string;
}

export interface ItemSold {
  itemsSoldId: number;
  productId: string;
  quantity: string;
  purchases: string;
}

export interface Receipt {
  receiptId: number;
  logo: string;
  address: string;
  phoneNumber: string;
  header: string;
  footer: string;
  totalPrice: number;
  balance: number;
  modeOfPayment: string;
  employee: string;
  itemsSoldObjectList: ItemSold[];
  store: string;
  purchase: string;
  isNotSynced?: boolean;
}

export interface Employee {
  employeeId: number;
  name: string;
  email: string;
  phone: string;
  passcode: Passcode;
  role: Role;
  store: string;
  purchasesList: Sale[];
  receipts: Receipt[];
  isNotSynced?: boolean;
}
export interface Role {
  roleId: number;
  name: string;
  employeeAccessRight: string[];
  employees: string[];
  store: string;
  storeOwner: string[];
}
export interface receiptTemplates {
  createdAt: string | null;
  updatedAt: string | null;
  templateId: number;
  logo: string;
  address: string;
  phoneNumber: string;
  header: string;
  footer: string;
  store: string;
  receipt: string;
  receiptTemplates: any[] | null;
  passcodeList: any[] | null;
  receiptTemplateId?: 0;
  isNotSynced?: boolean;
}

export interface passcodeList {
  createdAt: string | null;
  updatedAt: string | null;
  passcodeId: number;
  value: string;
  employee: string[];
  storeOwner: string[];
  store: string;
}

export interface Tax {
  createdAt: string | null;
  updatedAt: string | null;
  taxId: number;
  name: string;
  ratePercentage: 0;
  type: string;
  store: string;
  isNotSynced?: boolean;
}

export interface storeOwner {
  createdAt: string | null;
  updatedAt: string | null;
  userID: number;
  email: string;
  password: string;
  business_name: string;
  country: string;
  business_industry: string;
  emailVerified: true;
  emailPasscode: string;
  roles: UserRole[];
  stores: Store[];
  passcode: Passcode[];
  isNotSynced?: boolean;
}

export interface Store {
  createdAt: string | null;
  updatedAt: string | null;
  storeID: number;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  phoneNumber: string | null;
  description: string | null;
  products: Product[];
  employees: Employee[];
  purchases: Sale[];
  discounts: Discount[];
  taxes: Tax[];
  storeOwner: storeOwner[];
  categories: GetCategory[];
  customers: Customers[];
  employeeAccessRights: EmployeeAccessRight[];
  roles: Role[];
  receipts: Receipt[];
  receiptTemplates: receiptTemplates[];
  passcodeList: passcodeList[];
  isNotSynced?: boolean;
}

export interface GetCustomer {
  createdAt: string;
  updatedAt: string;
  customerId: number;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  purchases: string[];
  store: string;
  isNotSynced?: boolean;
}

export interface Customers {
  createdAt: string;
  updatedAt: string;
  customerId: number;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  purchases: string[];
  store: string;
}

export interface CreateCustomerDTO {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
}

export interface UpdateCustomerDTO {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
}

export interface Stores {
  storeID: number;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phoneNumber: string;
  description: string;
}

export interface GetStores {
  storeID: number;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phoneNumber: string;
  description: string;
}

export interface CreateStoreDTO {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phoneNumber: string;
  description: string;
}

export interface UpdateStoreDTO {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phoneNumber: string;
  description: string;
  product: any[] | null;
}

export interface Taxes {
  taxId: number;
  name: string;
  ratePercentage: string;
  type: string;
}

export interface GetTaxes {
  taxId: number;
  name: string;
  ratePercentage: string;
  type: string;
  isNotSynced?: boolean;
}

export interface updateTaxesDTO {
  name: string;
  ratePercentage: string;
  type: string;
  storeName: string;
}

export interface createTaxesDTO {
  name: string;
  ratePercentage: string;
  type: string;
}

export interface ReceiptSettings {
  receiptTemplateId: number;
  logo?: string;
  address: string;
  phoneNumber: string;
  header?: string;
  footer: string;
  store: Store[];
}

export interface CreateReceiptDTO {
  logo?: string | null;
  address: string;
  phoneNumber: string;
  header?: string;
  footer: string;
}
