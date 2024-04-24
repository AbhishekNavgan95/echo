import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "my-profile",
    icon: "VscAccount",
    // type: ACCOUNT_TYPE.STUDENT,
  },
  {
    id: 2,
    name: "Dashboard",
    path: "instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Courses",
    path: "my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",
  },
  {
    id: 6,
    name: "Cart",
    path: "cart",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscBookmark",
  },
  {
    id: 7,
    name: "Admin Panel",
    path: "admin-dashboard",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscHistory",
  },
  {
    id: 7,
    name: "Add Category",
    path: "add-category",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscDiffAdded",
  },
  {
    id: 8,
    name: "Settings",
    path: "settings",
    icon: "VscSettingsGear",
    type: ACCOUNT_TYPE.STUDENT,
  }
];
