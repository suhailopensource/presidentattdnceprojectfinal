"use client";

import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AttendanceSystem() {
  const [attendanceStatus, setAttendanceStatus] = useState("");

  const hostelLatitude = 12.92284;
  const hostelLongitude = 80.15836;
  const maxDistance = 1;

  function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  function worstCollegeAttendance() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;
          const distance = calculateDistance(
            userLatitude,
            userLongitude,
            hostelLatitude,
            hostelLongitude
          );
          if (distance <= maxDistance) {
            setAttendanceStatus(
              "Attendance marked. You are within the campus."
            );
            toast.success("Attendance marked. You are within the campus.");
          } else {
            setAttendanceStatus(
              "You are not within the campus. Attendance not marked."
            );
            toast.error("Attendance not marked. fuck you.");
          }
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setAttendanceStatus("Error getting your location. Please try again.");
          toast.error("Error getting your location. Please try again.");
        }
      );
    } else {
      setAttendanceStatus("Geolocation is not supported by this browser.");
    }
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <h1>President Attendance system</h1>
      <p>Click the button to mark your attendance.</p>
      <button
        className="bg-gray-600 text-white p-2 rounded-xl"
        onClick={worstCollegeAttendance}
      >
        Mark Attendance
      </button>
      {attendanceStatus && (
        <p className="text-black text-2xl">{attendanceStatus}</p>
      )}
    </div>
  );
}

export default AttendanceSystem;
