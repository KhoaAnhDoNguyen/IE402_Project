// routes/bookingRoutes.js
import express from "express";
import {
  createBooking,
  getAllBookings,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

// Đường dẫn tạo booking
router.post("/bookings", createBooking);

// Đường dẫn lấy tất cả bookings
router.get("/bookings/:userId", getAllBookings);

// Đường dẫn xóa booking theo ID
router.delete("/bookings/:id", deleteBooking);

export default router;
