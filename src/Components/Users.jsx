import { useState, useEffect } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/getUsers");
        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else {
          console.error("API did not return an array:", res.data);
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };
    getUsers();
  }, []);

  const getColor = (name) => {
    const colors = [
      "bg-teal-500",
      "bg-emerald-500",
      "bg-cyan-500",
      "bg-indigo-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-fuchsia-500",
      "bg-lime-500"
    ];
    if (!name) return colors[0];
    return colors[name.charCodeAt(0) % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Users Directory</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {users.length > 0 ? (
          users.map((user) => {
            const initials = user.username
              ? user.username
                  .split(" ")
                  .map((n) => n[0].toUpperCase())
                  .join("")
              : "";

            return (
              <div
                key={user._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col items-center gap-4"
              >
                <div className="rounded-full p-[2px] bg-gradient-to-tr from-teal-400 via-cyan-400 to-purple-500">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl ${getColor(user.username)}`}
                  >
                    {initials}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xl font-semibold text-gray-800">{user.username || "Unknown User"}</p>
                  <p className="text-gray-500">{user.email || "No email provided"}</p>
                </div>

                <button className="mt-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition">
                  Message
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center col-span-full">No users found</p>
        )}
      </div>
    </div>
  );
}

export default Users;
