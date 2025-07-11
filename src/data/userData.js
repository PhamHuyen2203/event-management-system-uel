export const mockUsers = [
  // STUDENT ACCOUNTS
  {
    id: "S001",
    username: "student1",
    password: "123456",
    email: "tran.le.buu.tanh@student.uel.edu.vn",
    role: "student",
    profile: {
      fullName: "Trần Lê Bữu Tánh",
      studentId: "K234111366",
      class: "K23411",
      faculty: "Khoa Hệ thống thông tin",
      gender: "Nam",
      phone: "0901234567",
      address: "Huế",
      dateOfBirth: "2005-01-15",
      year: "Năm 2",
    },
    registeredEvents: ["EVT001", "EVT003"],
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "S002",
    username: "student2",
    password: "123456",
    email: "tran.thi.b@student.uel.edu.vn",
    role: "student",
    profile: {
      fullName: "Trần Thị B",
      studentId: "21110002",
      class: "DHKT15A2HN",
      faculty: "Khoa Kinh tế",
      gender: "Nữ",
      phone: "0901234568",
      address: "Hồ Chí Minh",
      dateOfBirth: "2003-05-20",
      year: "Năm 3",
    },
    registeredEvents: ["EVT002"],
    createdAt: "2024-01-16T00:00:00Z",
  },
  {
    id: "S003",
    username: "student3",
    password: "123456",
    email: "le.van.c@student.uel.edu.vn",
    role: "student",
    profile: {
      fullName: "Lê Văn C",
      studentId: "21110003",
      class: "DHQT15A1HN",
      faculty: "Khoa Quản trị kinh doanh",
      gender: "Nam",
      phone: "0901234569",
      address: "Đà Nẵng",
      dateOfBirth: "2003-03-10",
      year: "Năm 3",
    },
    registeredEvents: ["EVT001", "EVT002", "EVT003"],
    createdAt: "2024-01-17T00:00:00Z",
  },

  // ORGANIZATION ACCOUNTS
  {
    id: "O001",
    username: "org1",
    password: "123456",
    email: "tech.club@uel.edu.vn",
    role: "organization",
    profile: {
      fullName: "Đoàn Khoa Hệ thông thông tin",
      name: "Đoàn Khoa Hệ thông thông tin",
      description:
        "Đoàn Khoa Hệ Thông Thông Tin, Khoa Hệ Thông Thông Tin (UEL - ĐHQG.HCM)",
      type: "Đoàn khoa",
      contactEmail: "dkhethongthongtin@st.uel.edu.vn",
      contactPhone: "0913115480",
      faculty: "Information System",
      // Legacy fields for compatibility
      organizationName: "Đoàn Khoa Hệ thông thông tin",
      organizationType: "Đoàn khoa",
      presidentName: "Phạm Văn D",
      establishedYear: "2020",
      memberCount: 150,
    },
    createdEvents: ["EVT001", "EVT002", "EVT003", "EVT004"],
    createdAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "O002",
    username: "org2",
    password: "123456",
    email: "business.club@uel.edu.vn",
    role: "organization",
    profile: {
      fullName: "Tuổi trẻ Kinh tế - Luật",
      name: "Tuổi trẻ Kinh tế - Luật",
      description:
        "Kênh thông tin chính thức của Đoàn Thanh niên - Hội Sinh viên Việt Nam Trường Đại học Kinh tế - Luật.",
      type: "Đoàn trường",
      contactEmail: "doanthanhnien@uel.edu.vn",
      contactPhone: "028 3724 4510",
      faculty: "",
      // Legacy fields for compatibility
      organizationName: "Tuổi trẻ Kinh tế - Luật",
      organizationType: "Đoàn trường",
      presidentName: "Nguyễn Thị E",
      establishedYear: "2019",
      memberCount: 200,
    },
    createdEvents: ["EVT005", "EVT006", "EVT007", "EVT008", "EVT009"],
    createdAt: "2024-01-11T00:00:00Z",
  },
  {
    id: "O003",
    username: "org3",
    password: "123456",
    email: "volunteer.team@uel.edu.vn",
    role: "organization",
    profile: {
      fullName: "Đội tình nguyện UEL",
      name: "Đội tình nguyện UEL",
      description:
        "Đội tình nguyện phục vụ cộng đồng và xã hội của trường Đại học Kinh tế - Luật",
      type: "Đội tình nguyện",
      contactEmail: "volunteer@uel.edu.vn",
      contactPhone: "028 3724 4520",
      faculty: "Liên khoa",
      // Legacy fields for compatibility
      organizationName: "UEL Volunteer Team",
      organizationType: "Đội tình nguyện",
      presidentName: "Hoàng Văn F",
      establishedYear: "2018",
      memberCount: 300,
    },
    createdEvents: ["EVT010", "EVT011", "EVT012", "EVT013", "EVT014"],
    createdAt: "2024-01-12T00:00:00Z",
  },

  // UNION OFFICE ACCOUNTS
  {
    id: "U001",
    username: "union1",
    password: "admin123",
    email: "admin.union@uel.edu.vn",
    role: "union_office",
    profile: {
      fullName: "Đoàn Thanh niên - Hội Sinh viên",
      name: "Đoàn Thanh niên - Hội Sinh viên",
      description:
        "Đoàn Thanh niên - Hội Sinh viên Trường Đại học Kinh tế - Luật, Đại học Quốc gia TP.HCM",
      type: "Đoàn trường",
      contactEmail: "doanthanhnien@uel.edu.vn",
      contactPhone: "028 3724 4539",
      faculty: "Student Affairs",
      // Legacy fields for compatibility
      position: "Trưởng ban Đoàn thanh niên",
      department: "Ban Đoàn thanh niên",
      employeeId: "UNION001",
      phone: "028 3724 4539",
      office: "Phòng 101, Tòa A",
      workingYears: 5,
      permissions: [
        "approve_events",
        "manage_organizations",
        "view_reports",
        "system_admin",
      ],
    },
    approvalHistory: [
      { eventId: "EVT001", action: "approved", date: "2024-01-20T00:00:00Z" },
      { eventId: "EVT002", action: "approved", date: "2024-01-21T00:00:00Z" },
      { eventId: "EVT003", action: "approved", date: "2024-01-22T00:00:00Z" },
      { eventId: "EVT004", action: "approved", date: "2024-01-23T00:00:00Z" },
      { eventId: "EVT005", action: "approved", date: "2024-01-24T00:00:00Z" },
      { eventId: "EVT006", action: "approved", date: "2024-01-25T00:00:00Z" },
      { eventId: "EVT007", action: "approved", date: "2024-01-26T00:00:00Z" },
      { eventId: "EVT008", action: "approved", date: "2024-01-27T00:00:00Z" },
      { eventId: "EVT009", action: "approved", date: "2024-01-28T00:00:00Z" },
      { eventId: "EVT010", action: "approved", date: "2024-01-29T00:00:00Z" },
      { eventId: "EVT011", action: "approved", date: "2024-01-30T00:00:00Z" },
      { eventId: "EVT012", action: "approved", date: "2024-01-31T00:00:00Z" },
      { eventId: "EVT013", action: "approved", date: "2024-02-01T00:00:00Z" },
      { eventId: "EVT014", action: "approved", date: "2024-02-02T00:00:00Z" },
      { eventId: "EVT015", action: "approved", date: "2024-02-03T00:00:00Z" },
      { eventId: "EVT016", action: "approved", date: "2024-02-04T00:00:00Z" },
      { eventId: "EVT017", action: "approved", date: "2024-02-05T00:00:00Z" },
      { eventId: "EVT018", action: "approved", date: "2024-02-06T00:00:00Z" },
      { eventId: "EVT019", action: "approved", date: "2024-02-07T00:00:00Z" },
    ],
    createdAt: "2024-01-01T00:00:00Z",
    createdEvents: ["EVT015", "EVT016", "EVT017", "EVT018", "EVT019"],
  },
];

// Authentication helpers
export const authenticateUser = (username, password) => {
  const user = mockUsers.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

export const getUserByRole = (role) => {
  return mockUsers.filter((user) => user.role === role);
};

export const getUserById = (id) => {
  return mockUsers.find((user) => user.id === id);
};

export const getUserByUsername = (username) => {
  return mockUsers.find((user) => user.username === username);
};

// Role permissions
export const rolePermissions = {
  student: [
    "view_events",
    "register_events",
    "view_own_registrations",
    "update_profile",
  ],
  organization: [
    "view_events",
    "create_events",
    "edit_own_events",
    "view_own_registrations",
    "generate_qr_codes",
    "view_event_reports",
    "update_profile",
  ],
  union_office: [
    "view_all_events",
    "approve_events",
    "reject_events",
    "manage_organizations",
    "view_all_reports",
    "system_admin",
    "manage_users",
    "view_statistics",
    "update_profile",
  ],
};

export const hasPermission = (userRole, permission) => {
  return rolePermissions[userRole]?.includes(permission) || false;
};

// Default login credentials for testing
export const defaultCredentials = {
  student: { username: "student1", password: "123456" },
  organization: { username: "org1", password: "123456" },
  union_office: { username: "union1", password: "admin123" },
};
