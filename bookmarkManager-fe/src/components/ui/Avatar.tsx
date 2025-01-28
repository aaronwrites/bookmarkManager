import { useState, useRef, useEffect } from "react";
import { CircleUser, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Avatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); 
      setUsername(decodedToken.userName);
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button className="p-2 rounded-full hover:bg-gray-200" onClick={toggleDropdown}>
        <CircleUser color="#EF3B33" size={24} />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        >
          <ul className="py-2 divide-y-2">
          {username && (
              <li className="px-4 py-2 text-gray-700 text-center capitalize">
                Hello, <span className="font-bold">{username}!</span>
              </li>
            )}
            <li className="px-4 py-2 hover:bg-gray-100 text-red-500 cursor-pointer flex justify-center items-center gap-3" onClick={() => {
                localStorage.removeItem("token");
                toast.success("Logged out successfully")
                navigate("/auth/signin");
            }}>
                Logout
                <LogOut />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Avatar;
