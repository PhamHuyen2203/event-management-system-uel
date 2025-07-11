# 🎯 Hệ Thống Quản Lý Sự Kiện UEL (UEL Event Management System)

## 📋 Tổng Quan Dự Án

**Hệ Thống Quản Lý Sự Kiện UEL** là một ứng dụng web toàn diện được phát triển cho Trường Đại học Kinh tế - Luật (Đại học Quốc gia TP.HCM), nhằm quản lý và tổ chức các hoạt động sự kiện trong môi trường đại học.

### 🎯 Mục Tiêu Dự Án

- **Số hóa quy trình**: Chuyển đổi số toàn bộ quy trình quản lý sự kiện từ giấy tờ sang digital
- **Tối ưu hiệu quả**: Giảm thiểu thời gian và công sức trong việc tổ chức, phê duyệt và theo dõi sự kiện
- **Tăng cường tương tác**: Cải thiện trải nghiệm người dùng thông qua giao diện thân thiện và tính năng hiện đại
- **Quản lý tập trung**: Cung cấp nền tảng thống nhất cho tất cả các hoạt động sự kiện của trường

## 🏗️ Kiến Trúc Hệ Thống

### 📱 Frontend Architecture

```
├── React 19.1.0 (UI Framework)
├── React Router DOM 7.6.3 (Routing)
├── Vite 7.0.3 (Build Tool)
├── Context API (State Management)
└── Local Storage (Data Persistence)
```

### 🔧 Core Technologies

- **Framework**: React với Hooks và Functional Components
- **Build Tool**: Vite với Hot Module Replacement (HMR)
- **Styling**: CSS Modules với responsive design
- **Icons**: React Icons 5.5.0
- **QR Code**: React QR Code 2.0.18 + QRCode 1.5.4
- **PDF Generation**: jsPDF 3.0.1 + jsPDF AutoTable 5.0.2

## 👥 Hệ Thống Người Dùng

### 1. 🎓 Sinh Viên (Student)

**Quyền hạn và chức năng:**

- Xem danh sách tất cả sự kiện của trường
- Đăng ký tham gia các sự kiện
- Quản lý danh sách sự kiện đã đăng ký
- Cập nhật thông tin cá nhân và hồ sơ
- Quét QR Code để check-in sự kiện
- Xem chi tiết sự kiện và thông tin tổ chức

### 2. 🏢 Tổ Chức/Đoàn Thể (Organization)

**Quyền hạn và chức năng:**

- Tạo và quản lý sự kiện mới
- Chỉnh sửa thông tin sự kiện đã tạo
- Tạo QR Code cho check-in sự kiện
- Xem danh sách người đăng ký tham gia
- Quản lý thông tin tổ chức
- Xuất báo cáo danh sách tham gia (PDF)

### 3. 🏛️ Đoàn Thanh Niên - Ban Công Tác Sinh Viên (Union Office)

**Quyền hạn và chức năng:**

- Phê duyệt hoặc từ chối sự kiện
- Tạo sự kiện chính thức của trường
- Xem báo cáo tổng quan tất cả sự kiện
- Quản lý và giám sát hoạt động của các tổ chức
- Truy cập đầy đủ dữ liệu hệ thống

## 🚀 Tính Năng Chính

### 📅 Quản Lý Sự Kiện

- **Tạo sự kiện**: Form đầy đủ với validation và image upload
- **Phân loại**: Academic, Community, Cultural, Sport, Other
- **Trạng thái**: Pending, Approved, Rejected
- **Giới hạn**: Số lượng tham gia và deadline hủy đăng ký

### 📱 Hệ Thống QR Code

- **Tạo QR**: Nhiều loại QR (Check-in, Event Info, Feedback)
- **Quét QR**: Mobile-optimized scanning experience
- **Tích hợp dữ liệu**: QR chứa thông tin chi tiết sự kiện
- **Offline support**: Hoạt động ngay cả khi mất kết nối

### 📊 Báo Cáo và Thống Kê

- **Danh sách tham gia**: Real-time participant tracking
- **Xuất PDF**: Professional report generation
- **Thống kê**: Event analytics và user engagement
- **Lịch sử**: Tracking toàn bộ hoạt động

### 🔐 Bảo Mật và Phân Quyền

- **Authentication**: Session-based với token validation
- **Authorization**: Role-based access control (RBAC)
- **Data validation**: Input sanitization và validation
- **Route protection**: Protected routes theo role

## 📁 Cấu Trúc Dự Án

```
event-management-client/
├── 📂 public/
│   ├── 📂 events/assets/          # Event images
│   └── vite.svg
├── 📂 src/
│   ├── 📂 components/             # Reusable UI components
│   │   ├── AuthLayout.jsx         # Authentication layout
│   │   ├── EventCard.jsx          # Event display card
│   │   ├── Header.jsx             # Navigation header
│   │   ├── Footer.jsx             # Page footer
│   │   ├── MainLayout.jsx         # Main application layout
│   │   └── ProtectedRoute.jsx     # Route protection
│   ├── 📂 contexts/
│   │   └── AuthContext.jsx        # Authentication context
│   ├── 📂 data/
│   │   ├── eventData.js           # Event data structure
│   │   ├── userData.js            # User data and permissions
│   │   └── demoAccounts.md        # Demo account information
│   ├── 📂 pages/                  # Application pages
│   │   ├── HomePage.jsx           # Landing page
│   │   ├── LoginPage.jsx          # User authentication
│   │   ├── RegisterPage.jsx       # User registration
│   │   ├── UserDashboardPage.jsx  # User dashboard
│   │   ├── UELEventsPage.jsx      # Event listing
│   │   ├── EventDetailPage.jsx    # Event details
│   │   ├── CreateEventPage.jsx    # Event creation
│   │   ├── ManageEventsPage.jsx   # Event management
│   │   ├── QRCodePage.jsx         # QR code generation
│   │   ├── QRDemoPage.jsx         # QR code display
│   │   └── ... (25+ pages total)
│   ├── 📂 services/
│   │   ├── authService.js         # Authentication logic
│   │   ├── storageService.js      # Local storage management
│   │   └── relationshipService.js # Data relationship management
│   ├── 📂 utils/
│   │   ├── testDataMigration.js   # Data migration testing
│   │   ├── testQRFlow.js          # QR flow testing
│   │   └── testRelationshipFix.js # Relationship testing
│   ├── 📂 assets/                 # Static assets
│   └── 📂 styles/                 # Global styles
├── 📄 package.json                # Dependencies and scripts
├── 📄 vite.config.js              # Vite configuration
├── 📄 QR_SYSTEM_GUIDE.md          # QR system documentation
├── 📄 RELATIONSHIP_SYSTEM.md      # Data relationship guide
└── 📄 README.md                   # This file
```

## 🛠️ Cài Đặt và Chạy Dự Án

### 📋 Yêu Cầu Hệ Thống

- **Node.js**: 18.0.0 hoặc cao hơn
- **npm**: 8.0.0 hoặc cao hơn
- **Browser**: Chrome, Firefox, Safari, Edge (latest versions)
- **RAM**: Tối thiểu 4GB
- **Storage**: Tối thiểu 1GB trống

### ⚡ Cài Đặt Nhanh

```bash
# 1. Clone repository
git clone [repository-url]
cd event-management-client

# 2. Cài đặt dependencies
npm install

# 3. Chạy development server
npm run dev

# 4. Mở browser tại
http://localhost:5173
```

### 🔧 Scripts Có Sẵn

```bash
# Development server với hot reload
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Linting code
npm run lint
```

## 📚 Hướng Dẫn Sử Dụng

### 🎯 Tài Khoản Demo

**Sinh viên:**

- Username: `student1` | Password: `123456`
- Username: `student2` | Password: `123456`

**Tổ chức:**

- Username: `org1` | Password: `123456`
- Username: `org2` | Password: `123456`

**Đoàn thanh niên:**

- Username: `union1` | Password: `admin123`

### 📖 Workflow Cơ Bản

#### 1. 🏢 Tổ Chức Tạo Sự Kiện

1. Đăng nhập với tài khoản tổ chức
2. Vào "Manage Events" → "Create Event"
3. Điền thông tin sự kiện (tên, mô tả, thời gian, địa điểm...)
4. Upload hình ảnh sự kiện
5. Submit để gửi phê duyệt

#### 2. 🏛️ Đoàn Thanh Niên Phê Duyệt

1. Đăng nhập với tài khoản union office
2. Vào "Evaluate Events"
3. Xem chi tiết sự kiện cần phê duyệt
4. Approve hoặc Reject với lý do

#### 3. 🎓 Sinh Viên Đăng Ký

1. Đăng nhập với tài khoản sinh viên
2. Vào "UEL Events" xem danh sách sự kiện
3. Click "Chi tiết" để xem thông tin đầy đủ
4. Click "Đăng ký" để tham gia sự kiện

#### 4. 📱 Check-in Bằng QR Code

1. Tổ chức tạo QR Code trong "QR Code" section
2. In QR Code hoặc hiển thị trên screen
3. Sinh viên quét QR Code bằng camera điện thoại
4. Thông tin sự kiện hiển thị trên mobile browser

## 🔍 Tính Năng Nâng Cao

### 📊 Hệ Thống Báo Cáo

**Báo cáo cho Tổ chức:**

- Danh sách đăng ký theo sự kiện
- Thống kê tham gia theo thời gian
- Export PDF professional

**Báo cáo cho Union Office:**

- Tổng quan tất cả sự kiện
- Thống kê theo tổ chức
- Analytics và trends

### 🔄 Data Migration System

Hệ thống tự động migration dữ liệu đảm bảo:

- **ID Standardization**: Chuyển đổi ID format cũ sang mới
- **Relationship Linking**: Liên kết đúng giữa User-Event-Registration
- **Data Consistency**: Đồng bộ dữ liệu across toàn hệ thống
- **Backward Compatibility**: Tương thích với dữ liệu cũ

### 📱 Mobile-First QR System

**Tính năng QR Code:**

- Multiple QR types: Check-in, Event Info, Feedback
- Mobile-optimized display
- Offline capability
- Real-time data embedding

## 🧪 Testing và Debug

### 🔬 Development Testing

```javascript
// Console commands for testing
testDataMigration(); // Test data migration
testQRFlow(); // Test QR code flow
testUserRegistrations("S001"); // Test user registrations
testEventParticipants(1); // Test event participants
```

### 🐛 Debug Tools

**Chrome DevTools:**

- Application → Local Storage để xem data
- Console → Chạy test functions
- Network → Monitor API calls (nếu có)

**Development Logs:**

- Migration process với emoji indicators
- Authentication flow tracking
- QR generation và parsing logs

## 🚀 Deployment

### 📦 Production Build

```bash
# Build cho production
npm run build

# Files sẽ được generate trong thư mục dist/
# Upload thư mục dist/ lên hosting service
```

### 🌐 Hosting Options

**Recommended:**

- **Vercel**: Tối ưu cho React applications
- **Netlify**: Easy deployment với GitHub integration
- **GitHub Pages**: Free hosting cho static sites

**Enterprise:**

- **AWS S3 + CloudFront**: Scalable và professional
- **Azure Static Web Apps**: Microsoft cloud integration

### ⚙️ Environment Configuration

```javascript
// vite.config.js
export default {
  base: "/event-management/", // Nếu deploy trên subdirectory
  build: {
    outDir: "dist",
    sourcemap: false, // Disable cho production
  },
};
```

## 📖 API Documentation

### 🔐 Authentication Service

```javascript
// Login
authService.login(username, password);
// Returns: { success, user, token, message }

// Register
authService.register(username, password, confirmPassword);
// Returns: { success, user, token, message }

// Get current user
authService.getCurrentUser();
// Returns: User object hoặc null
```

### 📅 Event Management

```javascript
// Get all events
storageService.getAllEvents();

// Get events by creator
relationshipService.getEventsByCreator(userId);

// Register for event
storageService.registerUserForEvent(userId, eventId);
```

### 📱 QR Code System

```javascript
// Generate QR data
const qrData = {
  eventId: 1,
  type: "Check-in QR Code",
  creatorInfo: { name, role, email },
  // ... more fields
};

// Create QR URL
const qrUrl = `/qr-demo?data=${encodeURIComponent(JSON.stringify(qrData))}`;
```

## 🤝 Đóng Góp và Phát Triển

### 📝 Coding Standards

**JavaScript/React:**

- ES6+ syntax với arrow functions
- Functional components với Hooks
- Destructuring và spread operator
- Consistent naming conventions

**CSS:**

- Mobile-first responsive design
- CSS Modules hoặc scoped styling
- Consistent spacing và typography
- Accessibility considerations

### 🔄 Git Workflow

```bash
# Feature development
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Bug fixes
git checkout -b fix/bug-description
git commit -m "fix: resolve bug issue"
git push origin fix/bug-description
```

### 📋 Pull Request Process

1. **Code Review**: Ensure code quality và standards
2. **Testing**: Test thoroughly trước khi merge
3. **Documentation**: Update docs nếu cần thiết
4. **Migration**: Consider data migration impacts

## 📞 Hỗ Trợ và Liên Hệ

### 🆘 Troubleshooting

**Lỗi thường gặp:**

1. **Local Storage bị đầy**:

   ```javascript
   // Clear storage
   localStorage.clear();
   // Reload page để reset
   ```

2. **QR Code không hoạt động**:

   - Check URL encoding
   - Verify data format
   - Test với console commands

3. **Authentication issues**:
   - Clear browser cache
   - Check localStorage data
   - Verify user credentials

### 📧 Liên Hệ Support

- **Technical Issues**: [email@uel.edu.vn]
- **Feature Requests**: [feature-request@uel.edu.vn]
- **Bug Reports**: [bug-report@uel.edu.vn]

### 🌟 Acknowledgments

**Phát triển bởi:**

- Trường Đại học Kinh tế - Luật
- Đại học Quốc gia TP.HCM
- Đoàn Thanh niên - Hội Sinh viên UEL

**Công nghệ được sử dụng:**

- React Team cho React framework
- Vitejs Team cho build tool
- Open source community cho various libraries

---

## 📄 License

Dự án này được phát triển cho mục đích giáo dục và nội bộ của Trường Đại học Kinh tế - Luật. Mọi quyền được bảo lưu.

---

**🎯 Version**: 1.0.0  
**📅 Last Updated**: January 2025  
**👨‍💻 Maintained by**: UEL Development Team
