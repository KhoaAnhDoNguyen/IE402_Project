// controllers/bookingController.js
import supabase from '../lib/supabase.js';

// Tạo một booking mới
export const createBooking = async (req, res) => {
    const { user_id, property_id, revenue, payment_method, rent_month } = req.body;

    try {
        const { data, error } = await supabase
            .from('bookings')
            .insert([{ user_id, property_id, revenue, payment_method, rent_month }]);

        if (error) {
            throw error;
        }
        res.status(201).json({ message: 'Booking created successfully', booking: data });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};

// Lấy danh sách tất cả bookings
export const getAllBookings = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('bookings')
            .select('*');

        if (error) {
            throw error;
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings', error: error.message });
    }
};

// Xóa một booking theo ID
export const deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('bookings')
            .delete()
            .eq('id', id);

        if (error) {
            throw error;
        }
        res.status(200).json({ message: 'Booking deleted successfully', booking: data });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error: error.message });
    }
};