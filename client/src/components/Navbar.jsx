import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Search,
  Bell,
  Menu,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

function Navbar({ user, toggleMobileSidebar, logout }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userName = user?.name || "Dheerendra Kumar";
  const userInitial = userName.charAt(0).toUpperCase();

  const handleSearch = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      toast.success(`Searching for "${e.target.value}"...`);
    }
  };

  return (
    <header className="saas-navbar">
      {/* Left Search Section */}
      <div className="navbar-left">
        <button
          className="mobile-toggle-btn"
          onClick={toggleMobileSidebar}
          title="Toggle Navigation"
        >
          <Menu size={20} />
        </button>

        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search anything..."
            onKeyDown={handleSearch}
          />
          <span className="search-kbd">Ctrl + K</span>
        </div>
      </div>

      {/* Right User & Notification Section */}
      <div className="navbar-right">
        <button
          className="icon-btn"
          onClick={() => toast.info("You have 3 new notifications!")}
          title="Notifications"
        >
          <Bell size={18} />
          <span className="badge-dot">3</span>
        </button>

        {/* User Menu */}
        <div
          className="user-profile-menu"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="avatar-circle">{userInitial}</div>
          <div className="user-meta">
            <span className="user-name">{userName}</span>
            <span className="user-role">Welcome back!</span>
          </div>
          <ChevronDown size={14} style={{ color: "#64748b" }} />

          {/* Profile Dropdown */}
          {dropdownOpen && (
            <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
              <button
                className="dropdown-item"
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/profile");
                }}
              >
                <User size={16} /> Profile
              </button>
              <button
                className="dropdown-item"
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/profile");
                }}
              >
                <Settings size={16} /> Settings
              </button>
              <div
                style={{
                  height: "1px",
                  backgroundColor: "#e2e8f0",
                  margin: "4px 0",
                }}
              />
              <button
                className="dropdown-item"
                style={{ color: "#ef4444" }}
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;