import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, MoreVertical, Phone, Video, Paperclip, Send, Smile, User, Settings, LogOut, Edit2, Copy, X } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const chats = [
  { id: 1, name: "Sarah Johnson", avatar: "SA", lastMessage: "Perfect! Let me check it out 👍", time: "10:30 AM", unread: 3, online: true },
  { id: 2, name: "Development Team", avatar: "DE", lastMessage: "John: Meeting at 3 PM tomorrow", time: "9:45 AM", unread: 0, online: false },
  { id: 3, name: "Michael Chen", avatar: "MI", lastMessage: "Thanks for the update!", time: "Yesterday", unread: 0, online: false },
  { id: 4, name: "Emily Rodriguez", avatar: "EM", lastMessage: "See you at the conference!", time: "Yesterday", unread: 0, online: true },
  { id: 5, name: "Design Squad", avatar: "DE", lastMessage: "Lisa: New mockups are ready", time: "Monday", unread: 3, online: false },
];

const chatMessages = {
  1: [
    { id: 1, text: "Hey! How are you doing?", time: "10:15 AM", sent: false },
    { id: 2, text: "That's awesome! Can you share the files?", time: "10:25 AM", sent: false },
    { id: 3, text: "I'm doing great! Just finished the project", time: "10:20 AM", sent: true },
    { id: 4, text: "Sure, here you go", time: "10:28 AM", sent: true },
    {
      id: 5,
      type: "file",
      fileName: "Project_Report.pdf",
      fileSize: "2.4 MB",
      time: "10:29 AM",
      sent: true,
    },
    { id: 6, text: "Perfect! Let me check it out 👍", time: "10:30 AM", sent: false },
  ],

  2: [
    { id: 1, text: "Good morning team 👋", time: "9:10 AM", sent: false },
    { id: 2, text: "Morning! Today’s agenda?", time: "9:12 AM", sent: true },
    { id: 3, text: "Meeting at 3 PM tomorrow", time: "9:45 AM", sent: false },
    { id: 4, text: "Got it 👍", time: "9:47 AM", sent: true },
  ],

  3: [
    { id: 1, text: "Hey Michael", time: "Yesterday", sent: true },
    { id: 2, text: "Did you get the update?", time: "Yesterday", sent: true },
    { id: 3, text: "Yes, thanks for the update!", time: "Yesterday", sent: false },
  ],

  4: [
    { id: 1, text: "Conference is next week!", time: "Yesterday", sent: false },
    { id: 2, text: "Yeah, flights booked already ✈️", time: "Yesterday", sent: true },
    { id: 3, text: "Nice! See you there 😄", time: "Yesterday", sent: false },
  ],

  5: [
    { id: 1, text: "New mockups are ready 🎨", time: "Monday", sent: false },
    { id: 2, text: "Awesome! Upload them please", time: "Monday", sent: true },
    {
      id: 3,
      type: "file",
      fileName: "UI_Mockups.fig",
      fileSize: "5.1 MB",
      time: "Monday",
      sent: false,
    },
    { id: 4, text: "Looks clean 🔥", time: "Monday", sent: true },
  ],
};


function Chat({ userId }) {
  // console.log("c",userId);
  
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(chatMessages);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [user, setUser] = useState({ name: "", email: "" });

  const [editing, setEditing] = useState({ name: false, email: false });
  const [formData, setFormData] = useState({ name: "", email: "" });


const navigate = useNavigate()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/getUser/${userId}`);

          console.log("data", res.data); 
        
        setUser({
          name: res.data.username || "",
          email: res.data.email || ""
        });
        setFormData({
          name: res.data.username || "",
          email: res.data.email || ""
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [userId]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (field) => {
    try {
      const res = await await axios.put(`http://localhost:5000/api/users/update/${userId}`, {
        username: formData.name,
        email: formData.email,
      });
      setUser({ name: res.data.user.username, email: res.data.user.email });
      setEditing({ ...editing, [field]: false });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };



  return (
    <div className="flex h-screen bg-gray-100 relative" onClick={() => setShowDropdown(false)}>
      {/* SIDEBAR */}
      <div className="w-96 bg-white border-r flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Sidebar Header */}
        <div className="bg-gray-100 p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-medium">ME</div>
          </div>
          <div className="relative">
            <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800 transition" onClick={() => setShowDropdown(!showDropdown)} />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 z-10 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                <button onClick={() => { setShowProfile(true); setShowDropdown(false); }} className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition group">
                  <User className="w-4 h-4 text-gray-500 group-hover:text-teal-500 transition" />
                  <span className="font-medium text-gray-700 group-hover:text-teal-600">Profile</span>
                </button>
                <button className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition group">
                  <Settings className="w-4 h-4 text-gray-500 group-hover:text-teal-500 transition" />
                  <span className="font-medium text-gray-700 group-hover:text-teal-600">Settings</span>
                </button>
                <hr className="my-2 border-gray-100" />
                <button className="w-full px-4 py-3 text-left text-sm hover:bg-red-50 flex items-center gap-3 transition group">
                  <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-600 transition" />
                  <span className="font-medium text-red-500 group-hover:text-red-600">Logout</span>
                </button>

             <button  onClick={() => navigate("/users")} className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition group">
  <User  className="w-4 h-4 text-gray-500 group-hover:text-teal-500 transition" />
  <span className="font-medium text-gray-700 group-hover:text-teal-600">Users</span>
</button>

                 

              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-2 bg-white">
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
            <Search className="w-5 h-5 text-gray-500" />
            <input type="text" placeholder="Search or start new chat" className="bg-transparent border-none outline-none ml-3 flex-1 text-sm" />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div key={chat.id} onClick={() => setSelectedChat(chat)} className={`p-3 cursor-pointer hover:bg-gray-50 flex items-center gap-3 border-b ${selectedChat.id === chat.id ? "bg-gray-50" : ""}`}>
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-white font-medium text-sm">{chat.avatar}</div>
                {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-sm truncate">{chat.name}</h3>
                  <span className="text-xs text-gray-500 ml-2">{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  {chat.unread > 0 && <span className="ml-2 bg-teal-500 text-white text-xs rounded-full px-2 py-0.5 min-w-5 text-center">{chat.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROFILE SIDEBAR */}
      {showProfile && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-20 flex justify-end">
          <div className="w-96 bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Profile Header */}
            <div className="bg-teal-600 p-6 flex items-center justify-between">
              <h2 className="text-white text-xl font-medium">Profile</h2>
              <button onClick={() => setShowProfile(false)} className="text-white hover:bg-teal-700 p-2 rounded-full transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Profile Content */}
            <div className="p-6 overflow-y-auto h-full">
              <div className="flex flex-col items-center mb-8">
                <div className="w-48 h-48 rounded-full bg-teal-500 flex items-center justify-center text-white text-6xl font-medium shadow-lg">ME</div>
              </div>

              {/* Name Section */}
              <div className="mb-4">
                <span className="text-sm text-teal-600 font-medium">Name</span>
                {editing.name ? (
                  <div className="flex gap-2 mt-1">
                    <input
                      name="name"
                      value={formData.name || ""}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded flex-1"
                    />
                    <button onClick={() => handleUpdate("name")} className="bg-teal-500 text-white px-3 py-1 rounded">Save</button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center mt-1">
                    <span>{user.name}</span>
                    <Edit2 className="w-4 h-4 text-gray-500 cursor-pointer" onClick={() => setEditing({ ...editing, name: true })} />
                  </div>
                )}
              </div>

              {/* Email Section */}
              <div className="mb-4">
                <span className="text-sm text-teal-600 font-medium">Email</span>
                {editing.email ? (
                  <div className="flex gap-2 mt-1">
                    <input
                      name="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded flex-1"
                    />
                    <button onClick={() => handleUpdate("email")} className="bg-teal-500 text-white px-3 py-1 rounded">Save</button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center mt-1">
                    <span>{user.email}</span>
                    <Edit2 className="w-4 h-4 text-gray-500 cursor-pointer" onClick={() => setEditing({ ...editing, email: true })} />
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-gray-100 p-3 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-medium text-sm">{selectedChat.avatar}</div>
            <div>
              <h2 className="font-medium text-sm">{selectedChat.name}</h2>
              <p className="text-xs text-gray-600">{selectedChat.online ? "online" : "offline"}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Video className="w-5 h-5 text-gray-600 cursor-pointer" />
            <Phone className="w-5 h-5 text-gray-600 cursor-pointer" />
            <Search className="w-5 h-5 text-gray-600 cursor-pointer" />
            <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto" style={{ backgroundColor: "#efeae2" }}>
          <div className="space-y-2 max-w-4xl mx-auto">
            {messages[selectedChat.id]?.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}>
                {msg.type === "file" ? (
                  <div className={`max-w-sm p-3 rounded-lg shadow-sm ${msg.sent ? "bg-green-100" : "bg-white"}`}>
                    <div className="flex items-center gap-3 bg-white rounded p-3 mb-2">
                      <div className="bg-green-500 text-white px-3 py-2 rounded font-bold text-sm">PDF</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{msg.fileName}</p>
                        <p className="text-xs text-gray-500">{msg.fileSize}</p>
                      </div>
                    </div>
                    <div className="flex justify-end items-center gap-1">
                      <span className="text-xs text-gray-600">{msg.time}</span>
                      {msg.sent && <span className="text-blue-500 text-xs">✓✓</span>}
                    </div>
                  </div>
                ) : (
                  <div className={`max-w-md px-4 py-2 rounded-lg shadow-sm ${msg.sent ? "bg-green-100" : "bg-white"}`}>
                    <p className="text-sm">{msg.text}</p>
                    <div className="flex justify-end items-center gap-1 mt-1">
                      <span className="text-xs text-gray-500">{msg.time}</span>
                      {msg.sent && <span className="text-blue-500 text-xs">✓✓</span>}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-gray-100 p-3 flex items-center gap-3">
          <Smile className="w-6 h-6 text-gray-600 cursor-pointer" />
          <Paperclip className="w-6 h-6 text-gray-600 cursor-pointer" />
          <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message" className="flex-1 bg-white rounded-full px-4 py-2 outline-none text-sm" />
          {newMessage.trim() ? (
            <button className="bg-teal-500 text-white rounded-full p-2 hover:bg-teal-600 transition"><Send className="w-5 h-5" /></button>
          ) : (
            <div className="w-10 h-10"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
