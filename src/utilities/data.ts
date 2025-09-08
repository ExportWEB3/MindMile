import dayjs from "dayjs";
import type {
  AdminUsersData,
  CreditCardFormField,
  durationMonthAttributes,
  EmailCampaignTable,
  FAQuestionsAttributes,
  HeaderMenuAttributes,
  headerStringValues,
  LoginField,
  Plan,
  PointsAdminSummary,
  RegisterFieldAttributes,
  StepItem,
  subscriptionPlansResponseAttributes,
  Tier,
  userEditDataFieldAttributes,
  UsersData,
} from "./types.declarationts";

export const headerMenuData: HeaderMenuAttributes[] = [
  {
    menuName: "Home",
    slug: "home",
    link: "/",
  },
  {
    menuName: "About Us",
    slug: "about",
    link: "#",
  },
  {
    menuName: "Dashboard",
    slug: "dashboard",
    link: "",
  },
  {
    menuName: "Trips",
    slug: "trips",
    link: "/trips/record?eventtype=all",
  },
  {
    menuName: "Pricing",
    slug: "pricing",
    link: "/plans",
  },
  {
    menuName: "Contact",
    slug: "contact",
    link: "/contact",
  },
  {
    menuName: "Login",
    slug: "login",
    link: "/auth/login",
  },

  {
    menuName: "Sign Up",
    slug: "signup",
    link: "/auth/register",
  },
  {
    menuName: "Report",
    slug: "report",
    link: "/platform/report",
  },
  {
    menuName: "My Account",
    slug: "myAccount",
    link: "/myaccount",
  },
  {
    menuName: "Setting",
    slug: "setting",
    link: "/platform/setting",
  },
  {
    menuName: "Log Out",
    slug: "logout",
    link: "#",
  },
];

export const adminSideBarData: HeaderMenuAttributes[] = [
  {
    menuName: "Subscription",
    slug: "subscription",
    link: "/dashboard/subscription",
  },
  {
    menuName: "Manage Trip",
    slug: "tripManagement",
    link: "/dashboard/tripManagement",
  },
  {
    menuName: "Manage User",
    slug: "userManagement",
    link: "/dashboard/userManagement",
  },
  {
    menuName: "Manage Point",
    slug: "pointManagement",
    link: "/dashboard/pointManagement",
  },
  {
    menuName: "Admin Users",
    slug: "adminUsers",
    link: "/platform/points",
  },
  {
    menuName: "Email",
    slug: "email",
    link: "/platform/email",
  },

  {
    menuName: "Log Out",
    slug: "logout",
    link: "/login",
  },
];

export const subscriptionData: Tier[] = [
  {
    _id: "1",
    name: `Passport`,
    monthlyFee: `29`,
    pointsPerMonth: `29`,
    loyaltyBonus: {
      isActive: false,
      reward: "0",
      type: "point",
      durationCondition: "1",
    },
    newMemberBonus: {
      isActive: true,
      reward: "10",
      type: "point",
      durationCondition: "2",
    },
    birthdayBonus: {
      isActive: false,
      reward: "0",
      type: "point",
      durationCondition: "1",
    },
    tangibleGiftsFrequency: {
      frequency: "none",
    },
    redeemableAfterDays: "2",

    referralBonus: {
      isActive: false,
      reward: "0",
      type: "point",
      durationCondition: "1",
    },
    isActive: true,
    dateCreated: dayjs().format(`DD/MM/YYYY`),
    perks: [
      "Newsletter access",
      "MIT travel starter kit (digital)",
      "Private travel community access",
      "Early trip notifications",
      "Bi-annual giveaway entry",
    ],
  },

  {
    _id: "2",
    name: `Explorer`,
    monthlyFee: `75`,
    pointsPerMonth: `75`,
    loyaltyBonus: {
      isActive: false,
      reward: "10",
      type: "point",
      durationCondition: "6",
    },
    newMemberBonus: {
      isActive: true,
      reward: "20",
      type: "point",
      durationCondition: "2",
    },
    birthdayBonus: {
      isActive: false,
      reward: "0",
      type: "point",
      durationCondition: "1",
    },
    tangibleGiftsFrequency: {
      frequency: "none",
    },
    redeemableAfterDays: "2",
    referralBonus: {
      isActive: false,
      reward: "0",
      type: "point",
      durationCondition: "1",
    },
    isActive: true,
    dateCreated: dayjs().format(`DD/MM/YYYY`),
    perks: [
      "Newsletter access",
      "MIT travel starter kit (digital)",
      "Private travel community access",
      "Early trip notifications",
      "Bi-annual giveaway entry",
      "Quarterly digital travel guide",
      "Printable travel tools",
      "Priority access to flash sales",
      "",
    ],
  },

  {
    _id: "3",
    name: `Adventurer`,
    monthlyFee: `150`,
    pointsPerMonth: `150`,
    loyaltyBonus: {
      isActive: false,
      reward: "25",
      type: "point",
      durationCondition: "6",
    },
    newMemberBonus: {
      isActive: true,
      reward: "40",
      type: "point",
      durationCondition: "2",
    },
    birthdayBonus: {
      isActive: true,
      reward: "25",
      type: "point",
      durationCondition: "1",
    },
    tangibleGiftsFrequency: {
      frequency: "bi-annually",
    },
    redeemableAfterDays: "2",
    referralBonus: {
      isActive: false,
      reward: "0",
      type: "point",
      durationCondition: "1",
    },
    isActive: true,
    dateCreated: dayjs().format(`DD/MM/YYYY`),
    perks: [
      "Newsletter access",
      "MIT travel starter kit (digital)",
      "Private travel community access",
      "Early trip notifications",
      "Bi-annual giveaway entry",
      "Quarterly digital travel guide",
      "Printable travel tools",
      "Priority access to flash sales",
      "Bi-annual MIT merch (tote, passport cover, etc.)",
      "2 guest passes/year for early pricing access",
      "Monthly MIT digital postcard",
      "Community recognition badge",
      "",
    ],
  },

  {
    _id: "4",
    name: `Voyager`,
    monthlyFee: `350`,
    pointsPerMonth: `350`,
    loyaltyBonus: {
      isActive: false,
      reward: "50",
      type: "point",
      durationCondition: "6",
    },
    newMemberBonus: {
      isActive: true,
      reward: "75",
      type: "point",
      durationCondition: "2",
    },
    birthdayBonus: {
      isActive: true,
      reward: "50",
      type: "money",
      durationCondition: "1",
    },
    tangibleGiftsFrequency: {
      frequency: "bi-annually",
    },
    redeemableAfterDays: "2",
    referralBonus: {
      isActive: false,
      reward: "0",
      type: "point",
      durationCondition: "1",
    },
    isActive: true,
    dateCreated: dayjs().format(`DD/MM/YYYY`),
    perks: [
      "Newsletter access",
      "MIT travel starter kit (digital)",
      "Private travel community access",
      "Early trip notifications",
      "Bi-annual giveaway entry",
      "Quarterly digital travel guide",
      "Printable travel tools",
      "Priority access to flash sales",
      "Bi-annual MIT merch (tote, passport cover, etc.)",
      "2 guest passes/year for early pricing access",
      "Monthly MIT digital postcard",
      "Community recognition badge",
      "1x 30-minute trip planning call per year",
      "10% off MIT merchandise or add-ons",
      "Behind-the-scenes destination content",
      "Social media shoutout (opt-in)",
    ],
  },

  {
    _id: "5",
    name: `Globetrotter`,
    monthlyFee: `1000`,
    pointsPerMonth: `1000`,
    loyaltyBonus: {
      isActive: false,
      reward: "100",
      type: "point",
      durationCondition: "6",
    },
    newMemberBonus: {
      isActive: true,
      reward: "150",
      type: "point",
      durationCondition: "2",
    },
    birthdayBonus: {
      isActive: true,
      reward: "100",
      type: "money",
      durationCondition: "1",
    },
    tangibleGiftsFrequency: {
      frequency: "annually ",
    },
    redeemableAfterDays: "2",
    referralBonus: {
      isActive: true,
      reward: "100",
      type: "point",
      durationCondition: "3",
    },
    isActive: true,
    dateCreated: dayjs().format(`DD/MM/YYYY`),
    perks: [
      "Newsletter access",
      "MIT travel starter kit (digital)",
      "Private travel community access",
      "Early trip notifications",
      "Bi-annual giveaway entry",
      "Quarterly digital travel guide",
      "Printable travel tools",
      "Priority access to flash sales",
      "Bi-annual MIT merch (tote, passport cover, etc.)",
      "2 guest passes/year for early pricing access",
      "Monthly MIT digital postcard",
      "Community recognition badge",
      "1x 30-minute trip planning call per year",
      "10% off MIT merchandise or add-ons",
      "Behind-the-scenes destination content",
      "Social media shoutout (opt-in)",
      "Complimentary domestic flight (value capped, set in admin)",
      "Concierge trip support",
      "Annual luxury travel gear gift box",
      "Quarterly virtual call with Jay Cameron or guest",
      "",
    ],
    domesticFlightComplimentary: {
      isActive: true,
      reward: "200",
      type: "money",
      durationCondition: "1",
    },
  },
];

export const faqsData: FAQuestionsAttributes[] = [
  {
    _id: "1",
    FAQ: "How does it work?",
    answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
  },

  {
    _id: "2",
    FAQ: "How do I make monthly subscriptions",
    answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
  },
  {
    _id: "3",
    FAQ: "What are points?",
    answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
  },

  {
    _id: "4",
    FAQ: "Any refund?",
    answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
  },

  {
    _id: "5",
    FAQ: "Do points expire?",
    answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
  },
];
export const registerData: RegisterFieldAttributes[] = [
  {
    field: "First Name",
    name: "firstName",
    placeHolder: "Enter First Name",
  },
  {
    field: "Last Name",
    name: "lastName",
    placeHolder: "Enter Last Name",
  },
  {
    field: "Email Address",
    name: "email",
    placeHolder: "Enter email",
  },
  {
    field: "Phone Number",
    name: "phoneNumber",
    placeHolder: "Enter phone number, start with your international code",
  },
  {
    field: "Create Password",
    name: "password",
    placeHolder: "******",
  },
];

export const loginData: LoginField[] = [
  {
    name: "Email Address",
    type: "email",
    placeholder: "Enter Email",
  },
  {
    name: "Password",
    type: "password",
    placeholder: "******",
  },
];

export const onboardingSteps: StepItem[] = [
  { id: "welcome", label: "Welcome" },
  { id: "plans", label: "Plan" },
  { id: "confirm", label: "Confirm" },
  { id: "payment", label: "Payment" },
  { id: "thankyou", label: "Thanks" },
];

export const featuresData = [
  {
    id: "subscription",
    icon: "ri-exchange-dollar-line",
    title: "Easy Subscription Management",
  },
  {
    id: "points",
    icon: "ri-code-box-line",
    title: "Clear Points System",
  },
  {
    id: "payments",
    icon: "ri-bank-card-line",
    title: "Automated Payments",
  },
  {
    id: "secure",
    icon: "ri-timer-line",
    title: "Secure & Integrated",
  },
];

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Perfect for occasional travelers",
    priceMonthly: 150,
    priceYearly: 1800,
    pointsPerMonth: 150,
    pointsPerYear: 1800,
    expirationMonths: 36,
  },
  {
    id: "enhanced",
    name: "Enhanced",
    tagline: "Great for regular travelers",
    priceMonthly: 350,
    priceYearly: 4200,
    pointsPerMonth: 350,
    pointsPerYear: 4200,
    expirationMonths: 36,
    bonus: "MIT affiliates receive 10% bonus points",
    mostPopular: true,
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Ideal for frequent travelers",
    priceMonthly: 1000,
    priceYearly: 12000,
    pointsPerMonth: 1000,
    pointsPerYear: 12000,
    expirationMonths: 36,
  },
];

export const creditCardFormFields: CreditCardFormField[] = [
  {
    id: "cardHolder",
    label: "Cardholder Name*",
    type: "text",
    placeholder: "Full name as shown on card",
    maxLength: undefined,
    group: "full", // full width input before expiry + CVV row
  },
  {
    id: "cardNumber",
    label: "Card Number*",
    type: "text",
    placeholder: "**** **** **** ****",
    maxLength: 19,
    group: "full",
  },
  {
    id: "expiry",
    label: "Expiration Date*",
    type: "text",
    placeholder: "MM/YY",
    maxLength: 5,
    group: "half", // half width input — will be placed side-by-side with CVV
  },
  {
    id: "cvv",
    label: "Security code (CVV)*",
    type: "password",
    placeholder: " ",
    maxLength: 4,
    group: "half",
  },
  {
    id: "postalCode",
    label: "Postal Code / Zip Code*",
    type: "text",
    placeholder: " ",
    maxLength: 10,
    group: "full", // full width input after expiry + CVV row
  },
];

export const agreementText = [
  { text: "I agree to the ", color: "text-black" },
  { text: "Terms of Service", color: "!text-primary cursor-pointer" },
  { text: " and ", color: "text-black" },
  { text: "Privacy Policy", color: "!text-primary cursor-pointer" },
];

export const resendText = [
  {
    text: "Didn't receive an email?",
    color: "!text-primay-very-dark",
  },
  {
    text: "Resend email",
    color: "!text-primary cursor-pointer",
  },
];
export const otpLength = 4;

export const otpFields = Array.from({ length: otpLength }, (_, index) => ({
  id: index,
  value: "",
}));

export const passwordResetData = [
  {
    name: "New Password",
    type: "password",
    placeholder: "*** *** ***",
  },
  {
    name: "Confirm Password",
    type: "password",
    placeholder: "*** *** ***",
  },
];

export const pointsSummary = [
  {
    totalPoints: "12500",
    pointsValue: "$125.00 USD",
    pointsExpiration: "Dec 31, 2025",
    lastPointsEarned: "Apr 15, 2025",
  },
];

export const profilePointsSummary = [
  { label: "Points Value", value: "$125.00 USD" },
  { label: "Points Expiration", value: "Dec 31, 2025" },
  { label: "Last Points Earned", value: "Apr 15, 2025" },
];

export const pointsRedemptionHistory = [
  {
    date: "Apr 10, 2025",
    trip: "Miami Beach",
    pointsUsed: "2500",
  },
  {
    date: "Mar 22, 2025",
    trip: "Miami Beach",
    pointsUsed: "5000",
  },
];

export const paymentHistory = [
  {
    date: "Apr 26, 2025",
    amount: "$29.99",
    paymentMethod: "Visa**** 4692",
    status: "Paid",
    receiptUrl: "#",
  },
  {
    date: "Mar 26, 2025",
    amount: "$29.99",
    paymentMethod: "Visa**** 4692",
    status: "Paid",
    receiptUrl: "#",
  },
  {
    date: "Feb 26, 2025",
    amount: "$29.99",
    paymentMethod: "Visa**** 4692",
    status: "Paid",
    receiptUrl: "#",
  },
];

export const paymentMethods = [
  { type: "Visa", details: "ending in 4692", primary: true },
  { type: "Paypal", details: "myemail@example.com", primary: false },
];

export const activeSessions = [
  {
    device: "Chrome on macOS",
    activeStatus: "Active",
    disabledStatus: "Disabled",
    time: "Today at 11:40 AM",
  },
];

export const tabs = [
  { key: "profile", label: "Profile", path: "/user/profile" },
  { key: "security", label: "Security", path: "/user/profile/security" },
];

export const personalInfo = [
  { label: "Name", value: "Tina Johnson" },
  { label: "Email", value: "tinajohnson@example.com" },
  { label: "Member Since", value: "March 12, 2024" },
];

export const subscriptionInfo = [
  {
    label: "plan:",
    value: "Premium Travel Pass",
  },
  {
    label: "Next Billing Date:",
    value: "Premium Travel Pass",
  },
  {
    label: "Price:",
    value: "$29.99/month",
  },
];

export const dashboardSubStatus = [
  {
    plan: "premium",
    amount: "$29.99/month",
    onStatus: "active",
  },
];

export const securityPasswordInput = [
  {
    label: "Current Password",
    name: "password",
    placeholder: "******",
  },
  {
    label: "New Password",
    name: "password",
    placeholder: " ",
  },
];

export const subscriptionPlansResponseData: subscriptionPlansResponseAttributes =
  {
    headerData: [
      { title: "Active Plans", value: "5" },
      { title: "Active Subscribers", value: "2500" },
      { title: "Monthly Revenue", value: "$56,886" },
      { title: "Avg Retention", value: "8 Months" },
    ],

    planTable: [
      { planName: "Passport", points: "29", price: "$29", subscribers: "950" },
      { planName: "Explorer", points: "75", price: "$75", subscribers: "950" },
      {
        planName: "Adventurer",
        points: "150",
        price: "$150",
        subscribers: "950",
      },
      { planName: "Voyager", points: "350", price: "$350", subscribers: "950" },
      {
        planName: "Globetrotter",
        points: "1000",
        price: "$1000",
        subscribers: "950",
      },
    ],
  };

export const pointsRedemptionData = {
  pointsTable: [
    { date: "Apr 10,2025", trip: "miami beach", pointsUsed: "2500" },
    { date: "Mar 22,2025", trip: "miami beach", pointsUsed: "5000" },
    { date: "Mar 22,2025", trip: "miami beach", pointsUsed: "5000" },
  ],
};

export const paymentHistoryData = {
  paymentTable: [
    {
      date: "Apr 26,2025",
      amount: "$29.99",
      paymentMethod: "Visa****4625",
      status: "Paid",
      Receipt: "View",
    },
    {
      date: "Mar 26,2025",
      amount: "$29.99",
      paymentMethod: "Visa****4625",
      status: "Paid",
      Receipt: "View",
    },
    {
      date: "Feb 26,2025",
      amount: "$29.99",
      paymentMethod: "Visa****4625",
      status: "Paid",
      Receipt: "View",
    },
    // Page 2
    {
      date: "Jan 26,2025",
      amount: "$29.99",
      paymentMethod: "Visa****4625",
      status: "Paid",
      Receipt: "View",
    },
    {
      date: "Dec 26,2024",
      amount: "$29.99",
      paymentMethod: "Visa****4625",
      status: "Paid",
      Receipt: "View",
    },
    {
      date: "Nov 26,2024",
      amount: "$29.99",
      paymentMethod: "Visa****4625",
      status: "Paid",
      Receipt: "View",
    },
    // Page 3
    {
      date: "Oct 26,2024",
      amount: "$29.99",
      paymentMethod: "Visa****4625",
      status: "Paid",
      Receipt: "View",
    },
    {
      date: "Sep 26,2024",
      amount: "$29.99",
      paymentMethod: "Visa****4625",
      status: "Paid",
      Receipt: "View",
    },
    {
      date: "Aug 26,2024",
      amount: "$29.99",
      paymentMethod: "Visa****4625",
      status: "Paid",
      Receipt: "View",
    },
    // ...add more as needed for more pages
  ],
};

export const tierFields: {
  key: keyof Omit<Tier, "_id">;
  label: string;
  type: "text" | "select" | "toggle" | "bonus" | "tags" | "domestic";
  options?: string[];
  placeHolder?: string;
  description?: string;
  isRequired: boolean;
}[] = [
  {
    key: "isActive",
    label: "Active",
    type: "toggle",
    description: "Turn on or off this Plan",
    isRequired: true,
  },
  {
    key: "name",
    label: "Plan Name",
    type: "text",
    placeHolder: "Enter Plan Name",
    isRequired: true,
  },

  // Bonus fields (all have same structure: isActive, reward, durationCondition, type)
  {
    key: "newMemberBonus",
    label: "New Member Bonus",
    type: "bonus",
    description: `Only whole numerical value is allowed`,
    options: Array.from({ length: 12 }, (_, i) =>
      i.toString()
    ) as durationMonthAttributes[],
    isRequired: false,
  },
  {
    key: "loyaltyBonus",
    label: "Loyalty Bonus",
    description: `Only whole numerical value is allowed`,
    type: "bonus",
    options: Array.from({ length: 12 }, (_, i) =>
      i.toString()
    ) as durationMonthAttributes[],
    isRequired: false,
  },
  {
    key: "birthdayBonus",
    label: "Birthday Bonus",
    description: `Only whole numerical value is allowed`,
    type: "bonus",
    options: Array.from({ length: 12 }, (_, i) =>
      i.toString()
    ) as durationMonthAttributes[],
    isRequired: false,
  },
  {
    key: "referralBonus",
    description: `Only whole numerical value is allowed`,
    label: "Referral Bonus",
    type: "bonus",
    options: Array.from({ length: 12 }, (_, i) =>
      i.toString()
    ) as durationMonthAttributes[],
    isRequired: false,
  },

  // Domestic flight complimentary
  {
    key: "domesticFlightComplimentary",
    label: "Domestic Flight Complimentary",
    type: "domestic", // contains value + type
    options: Array.from({ length: 12 }, (_, i) =>
      i.toString()
    ) as durationMonthAttributes[],
    isRequired: false,
  },

  {
    key: "monthlyFee",
    label: "Monthly Fee",
    type: "text",
    placeHolder: "$",
    description: "Only whole numerical characters are allowed",
    isRequired: true,
  },
  {
    key: "pointsPerMonth",
    label: "Points Per Month",
    type: "text",
    placeHolder: "Enter Point Values",
    description: "Only whole numerical characters are allowed",
    isRequired: true,
  },

  // Perks (tags input style)
  {
    key: "perks",
    label: "Perks",
    type: "tags",
    description:
      "Write each perk and press enter. Item will be displayed based on the order they were written",
    isRequired: false,
  },

  {
    key: "redeemableAfterDays",
    label: "Redeemable After (Months)",
    type: "select",
    options: Array.from({ length: 12 }, (_, i) =>
      i.toString()
    ) as durationMonthAttributes[],
    isRequired: true,
  },

  // Tangible gifts
  {
    key: "tangibleGiftsFrequency",
    label: "Tangible Gifts Frequency",
    type: "select",
    options: ["None", "Bi-Annually", "Annually"],
    isRequired: false,
  },
];

export const pointsAdminSummary: PointsAdminSummary[] = [
  {
    label: "Active Points",
    value: "289,450",
  },
  {
    label: "Expiring in 30 Days",
    value: "45,780",
  },
  {
    label: "Redeemed",
    value: "25,450",
  },
];

export const pointsManagementData = {
  pointsTable: [
    {
      timeFrame: "1 Month or Less",
      subscribers: "24 Subscribers",
      pointsExpiring: "12,450 Points",
    },
    {
      timeFrame: "3 Month or Less",
      subscribers: "54 Subscribers",
      pointsExpiring: "28,330 Points",
    },
  ],
};

export const subscriberPointsData = [
  {
    id: 1,
    name: "Adam John",
    membership: "Premium Member",
    totalPoints: 3850,
    redeemedPoints: 1400,
    currentBalance: 2450,
    expiration: "Jul 19, 2025",
  },
  {
    id: 2,
    name: "John Brown",
    membership: "Enhanced Member",
    badge: "MIT Affiliate",
    totalPoints: 1250,
    redeemedPoints: 400,
    currentBalance: 850,
    expiration: "Dec 05, 2025",
  },
];

export const usersAdminSummary: PointsAdminSummary[] = [
  {
    label: "Total Users",
    value: "2,453",
    change: "+12.3% this month",
  },
  {
    label: "Active Subscriptions",
    value: "1,280,000",
    change: "+12.3% this month",
  },
  {
    label: "Expiring (Next 30 Days)",
    value: "32,450",
    change: "+12.3% this month",
  },
  {
    label: "Total Revenue",
    value: "456,850",
    change: "+2.4% this month",
  },
];

// --- User Management Table Data ---
export const usersData: UsersData[] = [
  {
    name: {
      userName: "John Smith",
      id: "ID.MS-1028974",
      userImg: "JS",
    },
    joinDate: "Jan 1, 2023",
    lastLogin: "Aug 20, 2023",
    contact: {
      email: "john.smith@email.com",
      phone: "+123 456 7890",
    },
    subscription: "Premium ",
    expiryDate: "Jan 1, 2024",
    pointsBalance: {
      points: "980 Points",
      pointsExpiry: "250 expiring in 2mo",
    },
    status: "Affiliate",
    lastPayment: "Jul 25, 2023",
  },
  {
    name: {
      userName: "Joe Rask",
      id: "ID.MS-1028974",
      userImg: "JS",
    },
    joinDate: "Jan 1, 2023",
    lastLogin: "Aug 20, 2023",
    contact: {
      email: "john.smith@email.com",
      phone: "+123 456 7890",
    },
    subscription: "Premium ",
    expiryDate: "Jan 1, 2024",
    pointsBalance: {
      points: "980 Points",
      pointsExpiry: "250 expiring in 2mo",
    },
    status: "Non MIT",
    lastPayment: "Jul 25, 2023",
  },
];

export const userDetails = {
  contactInfo: {
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+123 456 7890",
    address: "California, USA",
    joinDate: "Jan 1, 2023",
    lastLogin: "Aug 20, 2023",
    mitPlan: "Affiliate",
  },
  subscriptionDetails: {
    currentPlan: "Premium Traveler",
    name: "Active",
    monthlyPayment: "$99.00",
    nextBilling: "Aug 25, 2023",
    lastPayment: "Jul 25, 2023",
    totalSpent: "$1,188.00",
    upgradedHistory: "Enhanced Premium ( Jan 15, 2025 )",
  },
};

export const userAdmintabs = [
  { key: "overview", label: "Overview" },
  { key: "pointsHistory", label: "Points History" },
  { key: "tripHistory", label: "Trip History" },
  { key: "paymentHistory", label: "Payment History" },
  { key: "activityLog", label: "Activity Log" },
  { key: "emailHistory", label: "Email History" },
];

export const adminUsersData: AdminUsersData[] = [
  {
    name: "John Rack",
    email: "john.smith@email.com",
    role: "Super Admin",
    status: "Active",
  },
  {
    name: "Abel Smith",
    email: "abel.smith@email.com",
    role: "Points Manager",
    status: "Inactive",
  },
  {
    name: "John Rougue",
    email: "john.smith@email.com",
    role: "Trip Manager",
    status: "Active",
  },
  {
    name: "John Smith",
    email: "john.smith@email.com",
    role: "Support Agent",
    status: "Active",
  },
];

export const emailCampaignSummary: PointsAdminSummary[] = [
  {
    label: "Active",
    value: "42",
  },
  {
    label: "Open Rate",
    value: "68%",
  },
  {
    label: "Expiring Points",
    value: "126",
  },
];

export const emailCampaignTableData: EmailCampaignTable[] = [
  {
    name: {
      campaignName: "Points Expiration Reminder",
      campaignStat: "Automated. Last sent: 2 days ago",
    },
    type: "Alert",
    status: "Active",
    performance: "68% open rate",
  },
  {
    name: {
      campaignName: "Summer Getaway Promotion",
      campaignStat: "Automated. Last sent: 2 days ago",
    },
    type: "Promotion",
    status: "Inactive",
    performance: "68% open rate",
  },
  {
    name: {
      campaignName: "Points Expiration Reminder",
      campaignStat: "Integrated. Last sent: 2 days ago",
    },
    type: "Onboard",
    status: "Active",
    performance: "68% open rate",
  },
];

export const reportsSummaryData = [
  {
    label: "Total Reports",
    value: "1,250",
    change: "+12% this month",
  },
  {
    label: "Resolved Reports",
    value: "1,000",
    change: "+12% this month",
  },
  {
    label: "Pending Reports",
    value: "250",
    change: "+12% this month",
  },
];

export const reportsLineChartData = [
  { month: "Jan", premium: 30, enhanced: 20, basic: 10 },
  { month: "Feb", premium: 65, enhanced: 40, basic: 20 },
  { month: "Mar", premium: 80, enhanced: 65, basic: 30 },
  { month: "Apr", premium: 120, enhanced: 85, basic: 40 },
];
export const reportsPieChartData = {
  Premium: { name: "Premium", value: 45, color: "var(--color-primary)" },
  Enhanced: {
    name: "Enhanced",
    value: 40,
    color: "var(--color-secondary-red)",
  },
  Basic: { name: "Basic", value: 15, color: "var(--color-primary-dark)" },
};

export const reportsBarChartData = {
  Affiliates: { value: 32, color: "#a67c00" },
  NonAffiliates: { value: 68, color: "#b0b0b0" },
};

export const settingsPlatformInfoData = {
  platformInfo: [
    {
      key: "platformName",
      label: "Platform Name",
      type: "text",
      placeHolder: "TravelPoints Premium",
      isRequired: true,
    },
    {
      key: "supportEmail",
      label: "Support Email",
      type: "text",
      placeHolder: "support@travelpoints.com",
      isRequired: true,
    },
    {
      key: "supportPhone",
      label: "Support Phone",
      type: "text",
      placeHolder: "+1 (555) 123-4567",
      isRequired: true,
    },
  ],
  timeZone: [
    {
      key: "timeZone",
      label: "Time Zone",
      type: "dropdown",
      options: [
        { value: "UTC-0", label: "UTC-0" },
        { value: "UTC-1", label: "UTC-1" },
        { value: "UTC-2", label: "UTC-2" },
      ],
      isRequired: true,
    },
  ],
  platformPointSettings: [
    {
      key: "pointsCurrency",
      label: "Points Currency Name",
      placeHolder: "Travel Points",
    },
    {
      key: "pointsCurrency",
      label: "Points Abbreviation Expiration",
      placeHolder: "TP",
    },
    {
      key: "pointsCurrency",
      label: "( Months )",
      placeHolder: "24",
    },
    {
      key: "pointsCurrency",
      label: "Points-to-Currency Ratio",
      placeHolder: "100 points= $100",
    },
    {
      key: "pointsCurrency",
      placeHolder: "500",
      label: "Minimum Points for Redemption",
    },
  ],
  enabled: [
    {
      key: "enabled",
      type: "dropdown",
      label: "Points System",
      options: [{ value: "disabled", label: "Disabled" }],
      isRequired: true,
    },
  ],
  platformExpirationSettings: [
    {
      text: "6 Months Reminder Email",
    },
    {
      text: "6 Months Reminder Email",
    },
    {
      text: "6 Months Reminder Email",
    },
  ],
  platformExpirationSettingsInput: [
    {
      key: "customReminders",
      label: "Custom Reminders",
      placeHolder: "45 (days)",
    },
  ],
};
export const manageTripCardData = [
  { title: "Active Trips", value: "5" },
  { title: "Points Used", value: "2500" },
  { title: "Pending Points", value: "100" },
  { title: "Participants", value: "100" },
];

// Array-driven fields
export const userEditDataField: userEditDataFieldAttributes[] = [
  {
    key: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter full name",
  },
  {
    key: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter First Name",
  },

  {
    key: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter Last Name",
  },

  { key: "email", label: "Email", type: "text", placeholder: "Enter Email" },
  {
    key: "phoneNumber",
    label: "Phone Number",
    type: "text",
    placeholder: "Enter Phone Number",
  },
  {
    key: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter Address",
  },

  {
    key: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter Password",
  },
  {
    key: "mitAffiliateID",
    label: "MIT Affiliate ID",
    type: "text",
    placeholder: "Enter MIT Affiliate ID",
  },
];
export const headingTagData: headerStringValues[] = [
  "H1",
  "H2",
  "H3",
  "Normal",
];
export const adminAccountData = [
  {
    name: "Sarah Johnson",
    role: "Platform Administrator",
    lastLogin: "Today, 9:23 PM",
    img: "SJ",
  }
];

export const adminAccountFormData = {
personalInfo: [
    {
    key: "firstName",
    label: "First Name",
    type: "text",
    placeHolder: "Sarah",
    isRequired: true,
  },
  {
    key: "lastName",
    label: "Last Name",
    type: "text",
    placeHolder: "Johnson",
    isRequired: true,
  },
  {
    key: "emailAddress",
    label: "Email Address",
    type: "text",
    placeHolder: "sarah.johnson@example.com",
    isRequired: true,
  },
  {
    key: "phoneNumber",
    label: "Phone Number",
    type: "text",
    placeHolder: "+1 (555) 123-4567",
    isRequired: true,
  },
],
  roleData: [
      {
        key: "enabled",
        type: "dropdown",
        label: "Points System",
        options: [
          { value: "disabled", label: "Disabled" },
        ],
        isRequired: true,
      },
    ],
    departmentData: [
      {
        key: "enabled",
        type: "dropdown",
        label: "Points System",
        options: [
          { value: "operations", label: "Operations" },
        ],
        isRequired: true,
      },
    ],
  };

  export const adminAccountNotificationData = [
    {
      key: "emailNotifications",
      label: "Email notifications for new subscribers"
    },
    {
      key: "dailyReport",
      label: "Daily report summary"
    },
    {
      key: "systemAlerts",
      label: "System alerts"
    },
    {
      key: "browserNotifications",
      label: "Browser notifications"
    }
  ]

  export const adminAccountSecurityStatus = [
    {
      lastLogin: "Today at 08:45 AM",
      status: "Enabled",
      risk: "Low",
      vulnerability: "0"
    }
  ]

  export const adminAccountSecurityData = [
    {
      role: "Super Admin",
      users: "5",
      accessLevel: "Full Access",
    },
        {
      role: "System Admin",
      users: "3",
      accessLevel: "Can view own data and manage subscription",
    },
        {
      role: "Subscriber",
      users: "1,245",
      accessLevel: "Can manage subscribers and transactions",
    },
  ]
export const adminTabs = [
    { key: "profile", label: "Profile", path: "/myaccount" },
  { key: "security", label: "Security", path: "/myaccount/security" },
]