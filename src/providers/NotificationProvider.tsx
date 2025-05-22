"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
//تنظیمات نمایش پیام
const NotificationProvider = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default NotificationProvider;
