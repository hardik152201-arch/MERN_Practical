
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    // Get login information
    const token = localStorage.getItem("token");

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Logged out successfully!");

        navigate("/login");
    };

    return (
        <nav className="navbar">

            {/* Logo / Website Name */}
            <div className="navbar-logo">
                <Link to="/">
                    📝 BlogHub
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="navbar-links">

                <Link to="/">
                    Home
                </Link>

                {/* Links for logged-in users */}
                {token && (
                    <>
                        <Link to="/dashboard">
                            Dashboard
                        </Link>

                        <Link to="/create">
                            Create Blog
                        </Link>
                    </>
                )}

                {/* User information */}
                {token && user && (
                    <span className="user-info">
                        👤 {user.name}

                        <span className="role">
                            ({user.role})
                        </span>
                    </span>
                )}

                {/* Authentication buttons */}
                {!token ? (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                ) : (
                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                )}

            </div>
        </nav>
    );
};

export default Navbar;
