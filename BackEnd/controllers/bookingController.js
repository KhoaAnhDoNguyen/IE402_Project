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

// Lấy danh sách tất cả bookings của người dùng
export const getAllBookings = async (req, res) => {
    const { userId } = req.params;

    try {
        const { data, error } = await supabase
            .from('bookings')
            .select(`
                id,
                revenue,
                payment_method,
                rent_month,
                properties (
                    id,
                    name,
                    street,
                    latitude,
                    longitude,
                    type,
                    price,
                    description,
                    availability,
                    created_at,
                    distance_school,
                    distance_bus,
                    distance_food,
                    created_by,
                    square,
                    bedroom,
                    bathroom,
                    wards (
                        id,
                        name,
                        districts (
                            id,
                            name
                        )
                    ),
                    images (
                        id,
                        image_url,
                        alt_text
                    )
                )
            `)
            .eq('user_id', userId); // Lọc theo user_id

        if (error) {
            throw error;
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings', error: error.message });
    }
};

// Xóa một booking theo ID và user_id
export const deleteBooking = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body; // Lấy userId từ body

    try {
        const { data, error } = await supabase
            .from('bookings')
            .delete()
            .eq('id', id) // Xóa booking theo ID
            .eq('user_id', userId); // Xóa booking chỉ nếu thuộc về user_id

        if (error) {
            throw error;
        }

        // Kiểm tra xem có bất kỳ dữ liệu nào được xóa không
        if (data.length === 0) {
            return res.status(404).json({ message: 'Booking not found or not authorized to delete' });
        }

        res.status(200).json({ message: 'Booking deleted successfully', booking: data });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error: error.message });
    }
};