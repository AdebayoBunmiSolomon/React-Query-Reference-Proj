import { Stores } from "@src/types/api";
import { employeeData, subscriptionType } from "@src/types/types";

export const productList = [
  {
    id: 1,
    name: "Nike Air Jordan",
    category: "Clothes & Shoes",
    image: require("@src/assets/images/nike.png"),
    store: "Nike",
    price: 36000,
    status: "In Stock",
    quantity: 36,
    discount: 300,
    sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45", "EU 46"],
    colors: ["#F8A735", "#3ABEAB", "#6A7A7A", "#211404", "#D4D0B5"],
  },
  {
    id: 2,
    name: "Nike Air Max",
    category: "Clothes & Shoes",
    image: require("@src/assets/images/nike-air.jpg"),
    price: 26700,
    store: "Nike",
    status: "Out of Stock",
    quantity: 23,
    discount: 100,
    sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45", "EU 46"],
    colors: ["#F8A735", "#3ABEAB", "#6A7A7A", "#211404", "#D4D0B5"],
  },
  {
    id: 3,
    name: "Iphone 15",
    category: "Gadgets",
    image: require("@src/assets/images/gadgets.png"),
    store: "Apple",
    price: 150000,
    status: "In Stock",
    quantity: 10,
    discount: 1000,
    sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45", "EU 46"],
    colors: ["#F8A735", "#3ABEAB", "#6A7A7A", "#211404", "#D4D0B5"],
  },
  {
    id: 4,
    name: "JBL 5",
    category: "Home Appliances",
    image: require("@src/assets/images/nike-jordan.png"),
    price: 50000,
    store: "Samsung",
    status: "Low in Stock",
    quantity: 10,
    discount: 100,
    sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45", "EU 46"],
    colors: ["#F8A735", "#3ABEAB", "#6A7A7A", "#211404", "#D4D0B5"],
  },
  {
    id: 5,
    name: "Samsung Galaxy",
    category: "Gadgets",
    image: require("@src/assets/images/clothes.png"),
    price: 300000,
    store: "Samsung",
    status: "In Stock",
    quantity: 10,
    discount: 520,
    sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45", "EU 46"],
    colors: ["#F8A735", "#3ABEAB", "#6A7A7A", "#211404", "#D4D0B5"],
  },
  {
    id: 6,
    name: "Nike Air Max",
    category: "Clothes & Shoes",
    image: require("@src/assets/images/nike-air.jpg"),
    price: 37000,
    store: "Nike",
    status: "Out of Stock",
    quantity: 23,
    discount: 120,
    sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45", "EU 46"],
    colors: ["#F8A735", "#3ABEAB", "#6A7A7A", "#211404", "#D4D0B5"],
  },
  {
    id: 7,
    name: "Iphone 11",
    category: "Gadgets",
    image: require("@src/assets/images/gadgets.png"),
    price: 150000,
    store: "Apple",
    status: "In Stock",
    quantity: 10,
    discount: 20,
    sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45", "EU 46"],
    colors: ["#F8A735", "#3ABEAB", "#6A7A7A", "#211404", "#D4D0B5"],
  },
  {
    id: 8,
    name: "Wallpaper",
    category: "Home Appliances",
    image: require("@src/assets/images/gadgets.png"),
    store: "Apple",
    price: 24000,
    status: "In Stock",
    quantity: 10,
    discount: 1000,
    sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45", "EU 46"],
    colors: ["#F8A735", "#3ABEAB", "#6A7A7A", "#211404", "#D4D0B5"],
  },
  {
    id: 9,
    name: "Nike Air Max",
    category: "Clothes & Shoes",
    image: require("@src/assets/images/nike-air.jpg"),
    price: 6300,
    store: "Nike",
    status: "In Stock",
    quantity: 23,
    discount: 120,
    sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45", "EU 46"],
    colors: ["#F8A735", "#3ABEAB", "#6A7A7A", "#211404", "#D4D0B5"],
  },
];

export const variantData = [
  {
    title: "Size variants",
    description: "Add a size variant to your product",
  },
  {
    title: "Color Variants",
    description: "Add a color variant to your product",
  },
  {
    title: "Others",
    description: "Add other variant if there is",
  },
];

export const storeAccessData = [
  {
    title: "Ama's Stores",
  },
  {
    title: "Zara's Stores",
  },
  {
    title: "Diamond Stores",
  },
];

export const productSizeData = [
  {
    title: "Clothe",
  },
  {
    title: "Shoe",
  },
  {
    title: "Other",
  },
];

export const storeData = [
  {
    title: "Zara's Store",
  },
  {
    title: "Diamond Pizza",
  },
  {
    title: "Ama's Food",
  },
];

export const clotheSizeVariant = [
  {
    title: "S",
  },
  {
    title: "M",
  },
  {
    title: "X",
  },
  {
    title: "XL",
  },
  {
    title: "XXL",
  },
];

export const shoeSizeVariant = [
  {
    title: "EU 22",
  },
  {
    title: "EU 30",
  },
  {
    title: "EU 34",
  },
  {
    title: "EU 36",
  },
  {
    title: "EU 38",
  },
  {
    title: "EU 40",
  },
  {
    title: "EU 43",
  },
  {
    title: "EU 44",
  },
  {
    title: "EU 45",
  },
];

export const receiptList = [
  {
    id: 1,
    amount: 2000,
    time: "12:30 PM",
    receiptNumber: "#RC-1232",
    paidWith: "Cash",
  },
  {
    id: 2,
    amount: 5000,
    time: "3:15 PM",
    receiptNumber: "#RC-1233",
    paidWith: "Card",
  },
  {
    id: 3,
    amount: 15000,
    time: "5:30 PM",
    receiptNumber: "#RC-1234",
    paidWith: "POS",
  },
  {
    id: 4,
    amount: 7800,
    time: "7:45 PM",
    receiptNumber: "#RC-1235",
    paidWith: "Cash",
  },
  {
    id: 5,
    amount: 12000,
    time: "9:00 PM",
    receiptNumber: "#RC-1236",
    paidWith: "Card",
  },
];

export const customerList = [
  {
    id: 1,
    name: "Nemerem",
    avatar: require("@src/assets/images/customer-avatar.png"),
    dateAdded: "13 Jan, 2024",
  },
  {
    id: 2,
    name: "Emma",
    avatar: require("@src/assets/images/customer-avatar2.png"),
    dateAdded: "15 Jan, 2024",
  },
  {
    id: 3,
    name: "John",
    avatar: require("@src/assets/images/customer-avatar3.png"),
    dateAdded: "17 Feb, 2024",
  },
  {
    id: 4,
    name: "Jane Doe",
    avatar: require("@src/assets/images/customer-avatar2.png"),
    dateAdded: "20 Feb, 2024",
  },
  {
    id: 5,
    name: "Jane Doe",
    avatar: require("@src/assets/images/customer-avatar.png"),
    dateAdded: "20 Feb, 2024",
  },
  {
    id: 6,
    name: "Jane Doe",
    avatar: require("@src/assets/images/customer-avatar3.png"),
    dateAdded: "20 Feb, 2024",
  },
  {
    id: 7,
    name: "Jane Doe",
    avatar: require("@src/assets/images/customer-avatar.png"),
    dateAdded: "20 Feb, 2024",
  },
  {
    id: 8,
    name: "Jane Doe",
    avatar: require("@src/assets/images/customer-avatar2.png"),
    dateAdded: "20 Feb, 2024",
  },
  {
    id: 9,
    name: "Jane Doe",
    avatar: require("@src/assets/images/customer-avatar3.png"),
    dateAdded: "20 Feb, 2024",
  },
  {
    id: 10,
    name: "John Doe",
    avatar: require("@src/assets/images/customer-avatar.png"),
    dateAdded: "23 Feb, 2024",
  },
  {
    id: 11,
    name: "Jane Smith",
    avatar: require("@src/assets/images/customer-avatar2.png"),
    dateAdded: "25 Feb, 2024",
  },
  {
    id: 12,
    name: "John Smith",
    avatar: require("@src/assets/images/customer-avatar3.png"),
    dateAdded: "27 Feb, 2024",
  },
];

export const employeeDataList: employeeData[] = [
  {
    employeeID: 1,
    name: "Nemerem",
    email: "Nemerem@gmail.com",
    phone: "+2349076544967",
    passcode: "admin",
  },
  {
    employeeID: 2,
    name: "Great",
    email: "great@gmail.com",
    phone: "+234815228167",
    passcode: "manager",
  },
  {
    employeeID: 3,
    name: "Bunmi",
    email: "bunmi@gmail.com",
    phone: "+2348023640617",
    passcode: "cashier",
  },
  {
    employeeID: 4,
    name: "Excel",
    email: "excel@gmail.com",
    phone: "+23409083736288",
    passcode: "secretary",
  },
  {
    employeeID: 5,
    name: "John Doe",
    email: "johndoes@gmail.com",
    phone: "+23481687620833",
    passcode: "cashier",
  },
  {
    employeeID: 6,
    name: "John Doe",
    email: "johndoes@gmail.com",
    phone: "+23481687620833",
    passcode: "cashier",
  },
  {
    employeeID: 7,
    name: "Great",
    email: "great@gmail.com",
    phone: "+23481687620833",
    passcode: "admin",
  },
  {
    employeeID: 8,
    name: "Bunmi",
    email: "bunmi@yahoo.com",
    phone: "+23481687620833",
    passcode: "cashier",
  },
  {
    employeeID: 9,
    name: "Eric",
    email: "eric@yahoo.com",
    phone: "+23481687620833",
    passcode: "manager",
  },
  {
    employeeID: 10,
    name: "John Wick",
    email: "johnwicks@gmail.com",
    phone: "+23481687620833",
    passcode: "admin",
  },
  {
    employeeID: 11,
    name: "Ephraim",
    email: "ephraim@gmail.com",
    phone: "+23481687620833",
    passcode: "manager",
  },
  {
    employeeID: 12,
    name: "Great",
    email: "Ihevueme@gmail.com",
    phone: "+23481687620833",
    passcode: "admin",
  },
];

export const userPurchasesList = [
  {
    id: 1,
    name: "Can Malt x2",
    icon: "credit-card",
    dateAdded: "13 Jan, 2024",
    amount: 3000,
  },
  {
    id: 2,
    name: "Malta Guinness x1",
    icon: "cash",
    dateAdded: "13 Feb, 2024",
    amount: 24000,
  },
  {
    id: 3,
    name: "Bread Beans x3",
    icon: "cash",
    dateAdded: "29 Jan, 2024",
    amount: 10000,
  },
  {
    id: 4,
    name: "Amstel Malta x2",
    icon: "credit-card",
    dateAdded: "13 March, 2024",
    amount: 9000,
  },
  {
    id: 5,
    name: "Can Malt x2",
    icon: "cash",
    dateAdded: "13 Jan, 2024",
    amount: 32700,
  },
];

export const settingsData = [
  {
    iconName: "receipt-outline",
    text: "Receipt Settings",
    rightIcon: true,
    navigateTo: "ReceiptSettings",
  },
  {
    iconName: "printer-outline",
    text: "Tax Settings",
    rightIcon: true,
    navigateTo: "TaxList",
  },
  {
    iconName: "credit-card",
    text: "Payment Types",
    rightIcon: true,
    navigateTo: "PaymentTypes",
  },
  {
    iconName: "printer-outline",
    text: "Connect Printer",
    rightIcon: true,
    navigateTo: "ConnectPrinter",
  },
  {
    iconName: "moon-outline",
    text: "Theme",
    rightIcon: false,
  },
  {
    iconName: "barcode-outline",
    text: "Code scanning",
    rightIcon: false,
  },
  {
    iconName: "language",
    text: "Language",
    rightIcon: true,
    navigateTo: "Language",
  },
  {
    iconName: "exchange",
    text: "Currency",
    rightIcon: true,
    navigateTo: "Currency",
  },
  {
    iconName: "help-circle-outline",
    text: "Help",
    rightIcon: true,
    navigateTo: "Help",
  },
  {
    iconName: "trash-outline",
    text: "Delete Account",
    rightIcon: true,
    navigateTo: "DeleteAccount",
  },
];

export const categoryData = [
  {
    id: 1,
    item: "Phone",
    itemCount: 88,
  },
  {
    id: 2,
    item: "Laptop",
    itemCount: 45,
  },
  {
    id: 3,
    item: "Watch",
    itemCount: 12,
  },
  {
    id: 4,
    item: "Men Shoe",
    itemCount: 25,
  },
  {
    id: 5,
    item: "Shein Clothes",
    itemCount: 35,
  },
];

export const employeeRoleData = [
  {
    id: 1,
    name: "Owner",
    status: "Default",
  },
  {
    id: 2,
    name: "Admin",
    status: "Number in total - 3",
  },
  {
    id: 3,
    name: "Cashier",
    status: "Number in total -4",
  },
  {
    id: 4,
    name: "Manager",
    status: "Number in total - 2",
  },
];

export const roleUsersData = [
  {
    id: 1,
    name: "Nemerem",
    avatar: require("@src/assets/images/customer-avatar.png"),
    phoneNumber: "+2349076544967",
  },
  {
    id: 2,
    name: "Great",
    avatar: require("@src/assets/images/customer-avatar.png"),
    phoneNumber: "+234815228167",
  },
  {
    id: 3,
    name: "Bunmi",
    avatar: require("@src/assets/images/customer-avatar.png"),
    phoneNumber: "+2348023640617",
  },
  {
    id: 4,
    name: "Excel",
    avatar: require("@src/assets/images/customer-avatar.png"),
    phoneNumber: "+23409083736288",
  },
  {
    id: 5,
    name: "John Doe",
    avatar: require("@src/assets/images/customer-avatar.png"),
    phoneNumber: "+23481687620833",
  },
  {
    id: 6,
    name: "John Doe",
    avatar: require("@src/assets/images/customer-avatar.png"),
    phoneNumber: "+23481687620833",
  },
  {
    id: 7,
    name: "Great",
    avatar: require("@src/assets/images/customer-avatar.png"),
    phoneNumber: "+23481687620833",
  },
  {
    id: 8,
    name: "Bunmi",
    avatar: require("@src/assets/images/customer-avatar.png"),
    phoneNumber: "+23481687620833",
  },
  {
    id: 9,
    name: "Eric",
    avatar: require("@src/assets/images/customer-avatar.png"),
    phoneNumber: "+23481687620833",
  },
];

export const existingStoreData = [
  {
    id: 1,
    name: "Zara's Store",
    status: "active",
  },
  {
    id: 2,
    name: "Hype Supermarket",
    status: "switch",
  },
  {
    id: 3,
    name: "Destiny Port",
    status: "switch",
  },
];

export const paymentTypesData = [
  {
    id: 1,
    name: "Bank Card",
    status: "active",
    iconName: "credit-card",
  },
  {
    id: 2,
    name: "Cash",
    status: "active",
    iconName: "cash-multiple",
  },
  {
    id: 3,
    name: "POS",
    status: "active",
    iconName: "printer-pos",
  },
];

export const icons = [
  "credit-card-settings-outline",
  "card-bulleted-outline",
  "cash-multiple",
  "printer-pos",
  "bank-outline",
  "credit-card",
  "cash-minus",
  "credit-card-settings",
  "cash",
  "credit-card-outline",
];

export const subscriptionPlan: subscriptionType[] = [
  {
    image: require("@src/assets/icons/basic-plan.png"),
    plan: "Basic",
    price: 5000,
    description:
      "Won't be able to create stores, or add employees Can't have more than 300 sales in a month ",
    buttonText: "Choose Plan",
  },
  {
    image: require("@src/assets/icons/standard-plan.png"),
    plan: "Standard",
    price: 10000,
    description:
      "Cannot have more than 2 stores and 4 employees for each stores (If they want to add more employees under this plan, it's either they upgrade or they'll be charged 2500 monthly for each employee) Not more than 600 sales in a month",
    buttonText: "Choose Plan",
  },
  {
    image: require("@src/assets/icons/premium-plan.png"),
    plan: "Premium",
    price: 15000,
    description:
      "This plan can have up to 5 stores 10 employees for each stores 1200 Sales monthly ",
    buttonText: "Choose Plan",
  },
  {
    image: require("@src/assets/icons/enterprise-plan.png"),
    plan: "Enterprise",
    price: 35000,
    description: "35,000 monthly 10 Stores 25 Employees for each store ",
    buttonText: "Choose Plan",
  },
];

export const taxListData = [
  {
    taxId: 1,
    name: "tech devices",
    ratePercentage: "30",
    type: "Tax included in the price",
  },
  {
    taxId: 2,
    name: "Shoes",
    ratePercentage: "20",
    type: "Tax added to the price",
  },
];

export const addProductTab = ["Products", "Services"];

export const categoriesConstantData = [
  {
    id: 1,
    name: "Beverages",
  },
  {
    id: 2,
    name: "Foods",
  },
];

export const storeConstantData: Stores[] = [
  {
    storeID: 1,
    name: "Great-Kene",
    address: "Paysharperly",
    city: "Ikeja",
    state: "Lagos",
    country: "Nigeria",
    phoneNumber: "09076544967",
    description: "testing",
  },
  {
    storeID: 2,
    name: "Trillion clues",
    address: "Paysharperly",
    city: "Ikeja",
    state: "Lagos",
    country: "Nigeria",
    phoneNumber: "09076544967",
    description: "testing",
  },
  {
    storeID: 3,
    name: "Black Panther",
    address: "Paysharperly",
    city: "Ikeja",
    state: "Lagos",
    country: "Nigeria",
    phoneNumber: "09076544967",
    description: "testing",
  },
];

export const discountConstantData = [
  {
    id: 1,
    name: "30%",
    desc: "Off on shoe",
  },
  {
    id: 2,
    name: "50%",
    desc: "Off on bag",
  },
  {
    id: 3,
    name: "70%",
    desc: "Off on Clothes",
  },
];
