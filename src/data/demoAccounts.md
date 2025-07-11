# Demo Accounts for UEL Event Management System

## Student Accounts (3 accounts)

### Student 1 - Nguyễn Văn A

- **Username:** `student1`
- **Password:** `123456`
- **Email:** nguyen.van.a@student.uel.edu.vn
- **Student ID:** 21110001
- **Class:** DHKT15A1HN
- **Faculty:** Khoa Công nghệ thông tin
- **Registered Events:** EVT001, EVT003

### Student 2 - Trần Thị B

- **Username:** `student2`
- **Password:** `123456`
- **Email:** tran.thi.b@student.uel.edu.vn
- **Student ID:** 21110002
- **Class:** DHKT15A2HN
- **Faculty:** Khoa Kinh tế
- **Registered Events:** EVT002

### Student 3 - Lê Văn C

- **Username:** `student3`
- **Password:** `123456`
- **Email:** le.van.c@student.uel.edu.vn
- **Student ID:** 21110003
- **Class:** DHQT15A1HN
- **Faculty:** Khoa Quản trị kinh doanh
- **Registered Events:** EVT001, EVT002, EVT003

---

## Organization Accounts (3 accounts)

### Organization 1 - UEL Tech Club

- **Username:** `org1`
- **Password:** `123456`
- **Email:** tech.club@uel.edu.vn
- **Organization:** Câu lạc bộ Công nghệ UEL
- **President:** Phạm Văn D
- **Faculty:** Khoa Công nghệ thông tin
- **Member Count:** 150
- **Created Events:** EVT001, EVT004
- **Status:** Active, Verified

### Organization 2 - UEL Business Club

- **Username:** `org2`
- **Password:** `123456`
- **Email:** business.club@uel.edu.vn
- **Organization:** Câu lạc bộ Kinh doanh UEL
- **President:** Nguyễn Thị E
- **Faculty:** Khoa Quản trị kinh doanh
- **Member Count:** 200
- **Created Events:** EVT002
- **Status:** Active, Verified

### Organization 3 - UEL Volunteer Team

- **Username:** `org3`
- **Password:** `123456`
- **Email:** volunteer.team@uel.edu.vn
- **Organization:** Đội tình nguyện UEL
- **Leader:** Hoàng Văn F
- **Faculty:** Liên khoa
- **Member Count:** 300
- **Created Events:** EVT003
- **Status:** Active, Pending Verification

---

## Union Office Accounts (3 accounts)

### Union Office 1 - Admin

- **Username:** `union1`
- **Password:** `admin123`
- **Email:** admin.union@uel.edu.vn
- **Name:** Trần Văn Admin
- **Position:** Trưởng ban Đoàn thanh niên
- **Department:** Ban Đoàn thanh niên
- **Office:** Phòng 101, Tòa A
- **Permissions:** Full admin access (approve events, manage organizations, view reports, system admin)

### Union Office 2 - Manager

- **Username:** `union2`
- **Password:** `admin123`
- **Email:** manager.union@uel.edu.vn
- **Name:** Lê Thị Manager
- **Position:** Phó ban Đoàn thanh niên
- **Department:** Ban Đoàn thanh niên
- **Office:** Phòng 102, Tòa A
- **Permissions:** Approve events, manage organizations, view reports

### Union Office 3 - Supervisor

- **Username:** `union3`
- **Password:** `admin123`
- **Email:** supervisor.union@uel.edu.vn
- **Name:** Phạm Văn Supervisor
- **Position:** Chuyên viên Đoàn thanh niên
- **Department:** Ban Đoàn thanh niên
- **Office:** Phòng 103, Tòa A
- **Permissions:** View reports, manage registrations

---

## Quick Test Accounts

### For Students:

```
Username: student1
Password: 123456
```

### For Organizations:

```
Username: org1
Password: 123456
```

### For Union Office:

```
Username: union1
Password: admin123
```

---

## Role Permissions

### Student Role

- View events
- Register for events
- View own registrations
- Update profile

### Organization Role

- View events
- Create events
- Edit own events
- View own registrations
- Generate QR codes
- View event reports
- Update profile

### Union Office Role

- View all events
- Approve/reject events
- Manage organizations
- View all reports
- System administration
- Manage users
- View statistics
- Update profile

---

## Notes

1. All passwords are simple for demo purposes
2. Student accounts have different registered events for testing
3. Organization accounts have different verification statuses
4. Union office accounts have different permission levels
5. Use these accounts to test role-based access control
6. Data is stored in localStorage for session management
