import {
  getUserById,
  hasPermission,
  mockUsers,
  getUserByUsername,
} from "../data/userData.js";
import storageService from "./storageService.js";
import relationshipService from "./relationshipService.js";

class AuthService {
  constructor() {
    this.currentUser = null;
    this.loadUserFromStorage();
  }

  // Login method
  async login(username, password) {
    try {
      const user = this.authenticateUser(username, password);

      if (user) {
        // Generate session token
        const sessionToken = this.generateSessionToken();

        // Save to localStorage
        storageService.setCurrentUser(user);
        storageService.setSessionToken(sessionToken);

        this.currentUser = user;

        return {
          success: true,
          user: user,
          token: sessionToken,
          message: "Đăng nhập thành công",
        };
      } else {
        return {
          success: false,
          message: "Tên đăng nhập hoặc mật khẩu không đúng",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Có lỗi xảy ra khi đăng nhập",
      };
    }
  }

  // Local authenticate function using storageService
  authenticateUser(username, password) {
    const users = storageService.getAllUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  // Register method
  async register(username, password, confirmPassword) {
    try {
      // Validate inputs
      if (!username || !password || !confirmPassword) {
        return {
          success: false,
          message: "Vui lòng điền đầy đủ thông tin",
        };
      }

      if (password !== confirmPassword) {
        return {
          success: false,
          message: "Mật khẩu xác nhận không khớp",
        };
      }

      if (password.length < 6) {
        return {
          success: false,
          message: "Mật khẩu phải có ít nhất 6 ký tự",
        };
      }

      // Check if username already exists using storageService
      const existingUser = storageService.getUserByUsername(username);

      if (existingUser) {
        return {
          success: false,
          message: "Tên đăng nhập đã tồn tại",
        };
      }

      // Create new user
      const newUser = {
        id: `S${Date.now()}`, // Generate unique ID for student
        username: username,
        password: password,
        email: `${username}@student.uel.edu.vn`, // Auto-generate email
        role: "student", // Default role for registration
        profile: {
          fullName: "",
          studentId: "",
          class: "",
          faculty: "",
          gender: "",
          phone: "",
          address: "",
          dateOfBirth: "",
          year: "",
        },
        registeredEvents: [],
        createdAt: new Date().toISOString(),
      };

      console.log("AuthService - Creating new user:", newUser);

      // Add to stored users using storageService
      const addResult = storageService.addUser(newUser);
      if (!addResult.success) {
        return addResult;
      }

      console.log("AuthService - User added to storage successfully");

      // Auto-login after registration
      const sessionToken = this.generateSessionToken();
      storageService.setCurrentUser(newUser);
      storageService.setSessionToken(sessionToken);
      this.currentUser = newUser;

      console.log(
        "AuthService - Auto-login completed, currentUser:",
        this.currentUser
      );

      return {
        success: true,
        user: newUser,
        token: sessionToken,
        message: "Đăng ký thành công",
      };
    } catch (error) {
      console.error("Register error:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra khi đăng ký",
      };
    }
  }

  // Logout method
  logout() {
    storageService.clearAuth();
    this.currentUser = null;

    return {
      success: true,
      message: "Đăng xuất thành công",
    };
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.currentUser !== null && this.isValidSession();
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Get user role
  getUserRole() {
    return this.currentUser?.role || null;
  }

  // Check if user has specific permission
  checkPermission(permission) {
    if (!this.currentUser) return false;
    return hasPermission(this.currentUser.role, permission);
  }

  // Load user from localStorage
  loadUserFromStorage() {
    try {
      const storedUser = storageService.getCurrentUser();
      const storedToken = storageService.getSessionToken();

      if (storedUser && storedToken && this.isValidSession()) {
        this.currentUser = storedUser;
        console.log(
          "AuthService - Loaded user from storage:",
          this.currentUser
        );
      } else {
        console.log(
          "AuthService - Invalid session or no user in storage. Clearing auth."
        );
        // Clear invalid session
        this.logout();
      }
    } catch (error) {
      console.error("Error loading user from storage:", error);
      this.logout();
    }
  }

  // Generate session token
  generateSessionToken() {
    return `uel_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Validate session (simple check - can be enhanced)
  isValidSession() {
    const sessionToken = storageService.getSessionToken();
    return sessionToken !== null;
  }

  // Update user profile
  updateProfile(profileData) {
    if (!this.currentUser) {
      return {
        success: false,
        message: "Người dùng chưa đăng nhập",
      };
    }

    try {
      console.log(
        "AuthService - Updating profile for user:",
        this.currentUser.id,
        "with data:",
        profileData
      );

      // Update current user profile
      this.currentUser.profile = {
        ...this.currentUser.profile,
        ...profileData,
      };

      console.log("AuthService - Updated currentUser:", this.currentUser);

      // ✅ QUAN TRỌNG: Cập nhật user trong USERS list
      const updateResult = storageService.updateUser(this.currentUser.id, {
        profile: this.currentUser.profile,
      });

      if (!updateResult.success) {
        console.error(
          "AuthService - Failed to update user in storage:",
          updateResult.message
        );
        return updateResult;
      }

      console.log(
        "AuthService - Successfully updated user in USERS list:",
        updateResult.user
      );

      // ✅ Cập nhật AUTH_USER để sync
      storageService.setCurrentUser(this.currentUser);

      // ✅ Sync profile changes across related data (events, registrations, etc.)
      relationshipService.syncProfileChanges(
        this.currentUser.id,
        this.currentUser.profile
      );
      console.log("AuthService - Profile changes synced across system");

      console.log("AuthService - Profile update completed successfully");

      return {
        success: true,
        user: this.currentUser,
        message: "Cập nhật thông tin thành công",
      };
    } catch (error) {
      console.error("AuthService - Profile update error:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra khi cập nhật thông tin",
      };
    }
  }

  // Get dashboard route based on role
  getDashboardRoute() {
    if (!this.currentUser) return "/login";

    switch (this.currentUser.role) {
      case "student":
        return "/dashboard";
      case "organization":
        return "/dashboard";
      case "union_office":
        return "/dashboard";
      default:
        return "/login";
    }
  }

  // Role-based access control
  canAccessRoute(route) {
    if (!this.isAuthenticated()) return false;

    const role = this.getUserRole();

    // Define route access rules
    const routeRules = {
      "/dashboard": ["student"],
      "/events": ["student"],
      "/registrations": ["student"],
      "/profile": ["student", "organization", "union_office"],
      "/organization/*": ["organization"],
      "/union/*": ["union_office"],
      "/admin/*": ["union_office"],
    };

    // Check if route matches any rule
    for (const [routePattern, allowedRoles] of Object.entries(routeRules)) {
      if (this.matchRoute(route, routePattern)) {
        return allowedRoles.includes(role);
      }
    }

    // Default: allow access if no specific rule
    return true;
  }

  // Helper method to match route patterns
  matchRoute(route, pattern) {
    if (pattern.endsWith("/*")) {
      const basePath = pattern.slice(0, -2);
      return route.startsWith(basePath);
    }
    return route === pattern;
  }

  // Removed getStoredUsers and saveUsersToStorage - now using storageService directly
}

// Create singleton instance
const authService = new AuthService();

export default authService;
