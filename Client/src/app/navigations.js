export const navigations = [
  { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
  { label: "PAGES", type: "label" },
  {
    name: "User",
    icon: "security",
    children: [
      { name: "Users", iconText: "SI", path: "/dashboard/listusers" },
      { name: "Roles", iconText: "SI", path: "/dashboard/roles" },
    ],
  },
  {
    name: "Departments",
    icon: "apartment",
    path: "/dashboard/departments",
  },
  {
    name: "Interview",
    icon: "person",
    path: "/dashboard/entretien",
  },
  {
    name: "Jobs",
    icon: "work",
    path: "/dashboard/jobs",
  },
  {
    name: "Salary",
    icon: "apartment",
    path: "/dashboard/salary",
  },
  {
    name: "Leave",
    icon: "apartment",
    path: "/dashboard/leave",
  },
  {
    name: "Employees",
    icon: "person",
    path: "/dashboard/employees",
  },

  {
    name: "Events",
    iconText: "account_circle",
    path: "/dashboard/events",
    icon: " cake",
  },
];
