"use client";

import { useState } from "react";
import Image from "next/image";
import { FiSearch, FiPlus, FiArrowLeft } from "react-icons/fi";

export default function Messages() {
  const [activeChat, setActiveChat] = useState(null);

  const chats = [
    {
      id: 1,
      name: "Siva",
      message: "Haha oh man 🔥",
      time: "12m",
      avatar: "/user.png",
      unread: false,
    },
    {
      id: 2,
      name: "Selva st",
      message: "wohooooo",
      time: "24m",
      avatar: "/user.png",
      unread: true,
    },
    {
      id: 3,
      name: "Kavi",
      message: "Haha that's terrifying 😂",
      time: "1h",
      avatar: "/user.png",
      unread: false,
    },
  ];

  const activeUser = chats.find((chat) => chat.id === activeChat);

  return (
    <div className="flex h-screen w-full bg-gray-100">

      {/* LEFT PANEL */}
      <div
        className={`bg-white border-r border-[#e0e0e0] flex flex-col w-full md:w-[350px] 
        ${activeChat ? "hidden md:flex" : "flex"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5">
          <h2 className="text-lg font-semibold">
            Messages
            <span className="bg-gray-200 text-xs px-2 py-1 rounded-full ml-2">
              {chats.length}
            </span>
          </h2>
          <button className="bg-blue-600 text-white p-2 rounded-full">
            <FiPlus size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search messages"
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-gray-100"
            >
              <Image
                src={chat.avatar}
                alt="avatar"
                width={45}
                height={45}
                className="rounded-full object-cover"
              />

              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium text-sm">{chat.name}</h4>
                  <span className="text-xs text-gray-400">
                    {chat.time}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {chat.message}
                </p>
              </div>

              {chat.unread && (
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      {activeUser && (
        <div className="flex-1 flex flex-col w-full">

          {/* Chat Header */}
          <div className="flex items-center gap-3 p-5 bg-white border-b border-[#e0e0e0]">

            {/* Back button for mobile */}
            <button
              onClick={() => setActiveChat(null)}
              className="md:hidden"
            >
              <FiArrowLeft size={20} />
            </button>

            <Image
              src={activeUser.avatar}
              alt="avatar"
              width={45}
              height={45}
              className="rounded-full object-cover"
            />

            <div>
              <h3 className="font-semibold">{activeUser.name}</h3>
              <p className="text-xs text-green-500">● Online</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50">

            <div className="flex items-start gap-2">
              <Image
                src={activeUser.avatar}
                alt="avatar"
                width={35}
                height={35}
                className="rounded-full object-cover"
              />
              <div className="bg-white px-4 py-2 rounded-2xl text-sm shadow-sm">
                Hello 👋
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-sm">
                Hi! How are you?
              </div>
            </div>

          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t border-[#e0e0e0] flex gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 px-4 py-2 rounded-full outline-none text-sm"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
              Send
            </button>
          </div>

        </div>
      )}
    </div>
  );
}