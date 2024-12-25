// controllers/bookingController.js
import supabase from '../lib/supabase.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Tạo một booking mới
export const createBooking = async (req, res) => {
    const { user_id, property_id, revenue, payment_method, rent_month } = req.body;

    try {
        // Insert new booking
        const { data: bookingData, error: bookingError } = await supabase
            .from('bookings')
            .insert([{ user_id, property_id, revenue, payment_method, rent_month }]);

        if (bookingError) {
            throw bookingError;
        }

        // Get the user's data (including username)
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('username, email')
            .eq('id', user_id)
            .single();

        if (userError) {
            throw userError;
        }

        // Get property details
        const { data: propertyData, error: propertyError } = await supabase
            .from('properties')
            .select(`
                name,
                street,
                type,
                price,
                description
            `)
            .eq('id', property_id)
            .single();

        if (propertyError) {
            throw propertyError;
        }

        // Prepare email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userData.email,
            subject: 'Booking Confirmation',
            html: `
                <h1>Booking Confirmation</h1>
                <p>Dear ${userData.username},</p>
                <p>Thank you for your booking!</p>
                <h2>Booking Details:</h2>
                <ul>
                    <li><strong>Property Name:</strong> ${propertyData.name}</li>
                    <li><strong>Address:</strong> ${propertyData.street}</li>
                    <li><strong>Type:</strong> ${propertyData.type}</li>
                    <li><strong>Price:</strong> ${propertyData.price} VND</li>
                    <li><strong>Description:</strong> ${propertyData.description}</li>
                    <li><strong>Rental Month:</strong> ${rent_month}</li>
                    <li><strong>Payment Method:</strong> ${payment_method}</li>
                    <li><strong>Revenue:</strong> ${revenue} VND</li>
                </ul>
                <p>We look forward to serving you!</p>
                <p>Best regards,<br>Your Booking Team</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Booking created successfully', booking: bookingData });
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