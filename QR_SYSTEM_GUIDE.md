# Hướng Dẫn Hệ Thống QR Code - UEL Event Management

## Tổng Quan Hệ Thống QR

Hệ thống QR code cho phép tạo và quét mã QR để hiển thị thông tin sự kiện trên thiết bị di động.

### 🔄 Workflow QR Code:

1. **Organization/Union** tạo QR code cho sự kiện
2. **QR Code** chứa URL với dữ liệu event được mã hóa
3. **User quét QR** → Browser mở URL
4. **QRDemoPage** parse dữ liệu và hiển thị thông tin

## 📱 Cách Test Hệ Thống QR

### Bước 1: Kiểm Tra Migration

```
1. Mở http://localhost:5175
2. Check Console logs:
   ✅ Data migration completed successfully
   📱 QR CODE FLOW TEST SUITE
```

### Bước 2: Test QR Generation

```
1. Login as organization: org1 / 123456
2. Vào Manage Events → QR CODE
3. Chọn một event bất kỳ
4. Điền form và click "Create"
5. Download QR code hoặc copy URL từ console
```

### Bước 3: Test QR Scanning Simulation

```
1. Mở Console và chạy:
   testQRScan(1)  // Test với event ID 1

2. Copy URL từ result
3. Mở URL trong tab mới (simulate mobile scan)
4. Verify thông tin hiển thị đúng
```

### Bước 4: Test Manual QR Demo

```
1. Truy cập: http://localhost:5175/qr-demo
2. Sẽ hiển thị demo data với UI enhanced
3. Test responsive bằng cách resize browser
```

## 🛠️ Console Commands cho Testing

### Test QR Flow

```javascript
// Test full QR generation và parsing flow
testQRFlow();

// Test QR scan với event specific
testQRScan(1); // Event ID 1
testQRScan(2); // Event ID 2

// Generate test URLs cho tất cả events
generateAllQRTestUrls();
```

### Test Với Real Data

```javascript
// Login as organization trước
testUserEventAccess("O001"); // Test organization events
testQRScan(1); // Generate QR for event 1
```

## 📊 Cấu Trúc Dữ Liệu QR Code

### Enhanced QR Data Structure:

```javascript
{
  // Event Information
  eventId: 1,
  eventTitle: "Event Name",
  organizer: "Organization Name",
  date: "2025-07-10",
  endDate: "2025-07-10",
  location: "Venue Address",
  category: "academic",
  description: "Event description",

  // QR Specific Info
  type: "Check-in QR Code",
  startTime: "8:00 AM",
  endTime: "11:00 AM",
  generatedAt: "2025-01-15T10:30:00Z",

  // Creator Information (✅ NEW)
  creatorInfo: {
    name: "Creator Full Name",
    role: "organization",
    email: "creator@uel.edu.vn",
    organization: "Organization Name"
  },

  // URLs for navigation
  eventUrl: "/event/1",
  feedbackUrl: "https://forms.gle/...",

  // Meta information
  generatedBy: "Current User Name",
  version: "1.0"
}
```

### URL Format:

```
http://localhost:5175/qr-demo?data=ENCODED_JSON_DATA
```

## 🎨 UI Features QRDemoPage

### ✅ Enhanced Features:

1. **Status Banners**:

   - Error banner nếu data bị lỗi
   - Demo banner nếu là test data

2. **Organized Information Sections**:

   - 📋 Thông tin sự kiện
   - 👤 Thông tin người tạo (NEW)
   - 🔗 Thông tin QR Code (NEW)

3. **Smart Actions**:

   - "Xem chi tiết sự kiện" → Event detail page
   - "Đánh giá sự kiện" → Feedback form
   - "Check-in ngay" → Demo check-in (for Check-in QR)

4. **Mobile Optimized**:
   - Responsive design
   - Touch-friendly buttons
   - Readable fonts on mobile

## 🔧 Types of QR Codes

### 1. Check-in QR Code

- **Purpose**: Student check-in to event
- **Action**: Shows "Check-in ngay" button
- **Use case**: Scan at event entrance

### 2. Event Info QR Code

- **Purpose**: Display event information
- **Action**: Shows event details
- **Use case**: Marketing materials, posters

### 3. Feedback QR Code

- **Purpose**: Collect feedback
- **Action**: Direct to feedback form
- **Use case**: Post-event surveys

## 📲 Mobile Experience

### Scanning Process:

```
1. 📱 User opens QR scanner app (camera)
2. 🔍 Scanner reads QR code
3. 🌐 Browser opens URL: /qr-demo?data=...
4. ⚡ QRDemoPage loads and parses data
5. 📋 Information displayed in mobile-friendly format
6. ⚡ User can take actions (view details, check-in, etc.)
```

### Mobile Features:

- **Auto-responsive**: Adapts to screen size
- **Touch-friendly**: Large buttons, easy navigation
- **Fast loading**: Minimal data transfer
- **Offline-capable**: Basic info cached after first load

## 🐛 Error Handling

### Common Issues & Solutions:

1. **QR Data Parsing Error**:

   ```
   Lỗi: "Không thể đọc dữ liệu QR Code"
   Solution: Falls back to demo data
   ```

2. **Missing Event Data**:

   ```
   Lỗi: Event not found
   Solution: Shows error message với back button
   ```

3. **Invalid URL Format**:
   ```
   Lỗi: Malformed URL
   Solution: Redirect to demo page
   ```

## 🧪 Testing Scenarios

### Scenario 1: Organization Creates QR

```
1. Login: org1 / 123456
2. Navigate: Manage Events → QR CODE
3. Select approved event
4. Fill form:
   - Code Type: "Check-in QR Code"
   - Start Time: "8:00 AM"
   - End Time: "11:00 AM"
   - Feedback URL: https://forms.gle/...
5. Click "Create"
6. Verify QR generated với enhanced data
```

### Scenario 2: Mobile QR Scan

```
1. Generate QR URL using testQRScan(1)
2. Copy URL to mobile device browser
3. Verify:
   ✅ Page loads quickly
   ✅ Information displayed correctly
   ✅ Creator info shows (if available)
   ✅ Actions work (event detail, feedback)
   ✅ Check-in button appears (for check-in QR)
```

### Scenario 3: Data Integration Test

```
1. Create event with org1
2. Update org1 profile name
3. Generate QR for that event
4. Verify QR shows updated organizer name
5. Verify creator info reflects new profile
```

## 📈 Performance & Analytics

### QR Data Tracking:

- Generation timestamp
- Creator information
- QR type usage
- Scan analytics (future feature)

### Performance Considerations:

- QR URL length < 2000 characters
- JSON data compression
- Mobile-optimized images
- Fast parsing algorithms

## 🚀 Future Enhancements

### Planned Features:

1. **QR Analytics**: Track scan counts, locations
2. **Dynamic QR**: QR codes that update content
3. **Offline Support**: Cache event data for offline viewing
4. **Push Notifications**: Alert when QR is scanned
5. **Advanced Check-in**: Integration with attendance tracking

### Integration Possibilities:

- **Google Analytics**: Track QR scan events
- **Push Notifications**: Real-time check-in alerts
- **Database Sync**: Real-time data updates
- **API Integration**: External event platforms

---

## Quick Test Commands

```javascript
// Full QR system test
testQRFlow();

// Generate test QR for event 1
testQRScan(1);

// Get all QR test URLs
generateAllQRTestUrls();

// Test specific organization events
testUserEventAccess("O001");
```

**QR System** đã sẵn sàng cho production với enhanced features và mobile optimization! 📱✨
