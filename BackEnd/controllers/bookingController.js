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
    const { userId } = req.params; // Change to retrieve userId from params
    console.log('Received userId:', userId); 
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
            .eq('user_id', userId); // Filter by user_id

        if (error) {
            throw error;
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings', error: error.message });
    }
};

// Xóa booking có id và userId
export const deleteBooking = async (req, res) => {
    const { id } = req.params; // Get both id and userId from params
    console.log(id)
    try {
        const { data, error } = await supabase
            .from('bookings')
            .delete()
            .eq('id', id) // Delete booking by ID
            //.eq('user_id', userId); // Ensure it belongs to the correct user

        if (error) {
            throw error;
        }

        res.status(200).json({ message: 'Booking deleted successfully', booking: data });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error: error.message });
    }
};