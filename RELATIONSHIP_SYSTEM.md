# Hệ Thống Quản Lý Mối Quan Hệ Dữ Liệu (Relationship Management System)

## Tổng Quan

Hệ thống mới này giải quyết vấn đề **data consistency** và **relationship management** giữa các entities trong ứng dụng quản lý sự kiện UEL:

- **Users** (Students, Organizations, Union Office)
- **Events** (được tạo bởi Organizations/Union)
- **Registrations** (Students đăng ký Events)

## Vấn Đề Đã Được Giải Quyết

### ❌ Trước Khi Có Hệ Thống Mới:

1. **ID không nhất quán**: Mock users dùng "S001", registered users dùng timestamp-based ID
2. **Event-Creator relationship thiếu**: Events chỉ có tên organizer, không có creator ID
3. **Registration system không thống nhất**: Dùng fake data thay vì real registrations
4. **Profile changes không sync**: User update profile nhưng event data không được cập nhật

### ✅ Sau Khi Có Hệ Thống Mới:

1. **Standardized ID format**: Tất cả users có ID format chuẩn (S001, O001, U001, ...)
2. **Event-Creator linking**: Events có `createdBy` field link đến creator ID
3. **Real registration data**: Participant lists dùng actual registrations thay vì fake data
4. **Automatic data sync**: Profile changes được sync across all related data

## Cấu Trúc Hệ Thống

### 1. RelationshipService (`src/services/relationshipService.js`)

**Chức năng chính:**

- Data migration và standardization
- ID linking between entities
- Profile change synchronization
- Real participant data management

**Key Methods:**

```javascript
// Migration
migrateData(); // Run full data migration
standardizeUserIds(); // Convert timestamp IDs to standard format
linkEventsToCreators(); // Add createdBy field to events

// Data Management
getRealEventParticipants(eventId); // Get actual registered users for an event
syncProfileChanges(userId, profile); // Sync profile changes across system
getEventsByCreator(userId); // Get events created by specific user

// Utilities
createOrganizerMapping(); // Map organizer names to user IDs
getUserStats(userId); // Get user statistics
```

### 2. Enhanced StorageService

**New Methods:**

```javascript
updateAllUsers(users); // Bulk update user data
updateAllEvents(events); // Bulk update event data
getUserById(userId); // Get user by ID
```

### 3. Enhanced AuthService

**Profile Sync Integration:**

```javascript
updateProfile(profileData) {
  // ... existing profile update logic ...

  // ✅ NEW: Sync across system
  relationshipService.syncProfileChanges(userId, updatedProfile);
}
```

## Data Migration Process

### Automatic Migration

Hệ thống tự động chạy migration khi app khởi động lần đầu:

```javascript
// In RelationshipService constructor
if (!this.migrationCompleted) {
  this.migrateData();
}
```

### Migration Steps:

1. **Step 1 - ID Standardization**:

   - Convert `S1703070234567` → `S004`
   - Update registration mappings

2. **Step 2 - Event-Creator Linking**:

   - Map organizer names to user IDs
   - Add `createdBy` field to events

3. **Step 3 - Registration Migration**:
   - Convert `registeredEvents: ["EVT001"]` to actual registrations
   - Populate registration storage with real data

## Cách Sử Dụng

### 1. Testing Migration

Mở Developer Console và chạy:

```javascript
// Test full migration
testDataMigration();

// Test specific user registrations
testUserRegistrations("S001");

// Test specific event participants
testEventParticipants(1);

// Reset migration for testing
resetMigration();
```

### 2. Real Participant Data

**Trước:**

```jsx
// RegistrationListPage.jsx - OLD
const fakeParticipants = generateFakeParticipants(eventId);
setRegistrations(fakeParticipants);
```

**Sau:**

```jsx
// RegistrationListPage.jsx - NEW
const realParticipants = relationshipService.getRealEventParticipants(eventId);
setRegistrations(realParticipants);
```

### 3. Profile Sync

**Automatic Sync:**

```javascript
// When user updates profile in PersonalInfoPage
authService.updateProfile(profileData);

// Automatically syncs:
// - Event organizer names (for organizations)
// - Any other system references
```

## Data Formats

### Standardized User ID:

```javascript
// Students: S001, S002, S003, ...
// Organizations: O001, O002, O003, ...
// Union Office: U001, U002, U003, ...
```

### Event with Creator Link:

```javascript
{
  id: 1,
  title: "Event Title",
  organizer: "Đoàn Khoa Hệ thông thông tin", // Display name
  createdBy: "O001",                         // ✅ NEW: Creator ID link
  // ... other fields
}
```

### Real Participant Data:

```javascript
{
  id: "S001",
  studentId: "21110001",
  lastName: "Nguyễn Văn",
  firstName: "A",
  fullName: "Nguyễn Văn A",
  class: "DHKT15A1HN",
  faculty: "Khoa Công nghệ thông tin",
  birthDate: "2003-01-15",
  registrationDate: "2024-01-15T00:00:00Z"
}
```

## Testing & Debugging

### Migration Status Check:

```javascript
localStorage.getItem("uel_data_migration_v1"); // 'true' if completed
```

### Debug Logs:

- Migration process logs với emojis để dễ theo dõi
- Profile sync notifications
- Registration tracking

### Console Commands:

```javascript
// Available in development mode
window.testDataMigration();
window.testUserRegistrations("S001");
window.testEventParticipants(1);
window.resetMigration();
```

## Impact & Benefits

### ✅ Consistency

- Tất cả IDs theo format chuẩn
- Event-creator relationships được track đúng
- Registration data có thật thay vì fake

### ✅ Data Integrity

- Profile changes tự động sync across system
- Organizer names update khi organization change profile
- Registration data persistent và accurate

### ✅ Scalability

- Hệ thống dễ extend với new entity relationships
- Migration system cho future data changes
- Centralized relationship management

### ✅ User Experience

- Participant lists hiển thị real data
- Profile changes reflect everywhere
- Consistent data across all pages

## Future Enhancements

1. **Event Statistics**: Track views, popularity
2. **User Activity**: Comprehensive activity logs
3. **Notification System**: Alert on profile/event changes
4. **Advanced Filtering**: Filter events by creator, participants
5. **Data Export**: Export participant lists, reports

---

## Quick Start Testing

1. **Start Application**: Migration chạy tự động
2. **Check Console**: Xem migration logs với emojis 🔄 ✅
3. **Test Registration**: Đăng ký event và check participant list
4. **Test Profile Update**: Update organization profile, check event organizer name
5. **Run Tests**: Dùng console commands để verify data

**Migration hoàn thành khi thấy:** `✅ Data migration completed successfully`
