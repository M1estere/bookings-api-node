import { pool } from '../db/index.js';

export const reserveSeat = async (req, res) => {
    const { event_id, user_id } = req.body;

    if (!event_id || !user_id) {
        return res.status(400).json({ error: "event_id and user_id required" });
    }

    try {
        // check if event exists
        const event = await pool.query(
            'SELECT total_seats FROM events WHERE id = $1',
            [event_id]
        );
        if (event.rowCount === 0) {
            return res.status(404).json({ error: "Event not found" });
        }

        // check if user booked event
        const existing = await pool.query(
            'SELECT id FROM bookings WHERE event_id = $1 AND user_id = $2',
            [event_id, user_id]
        );
        if (existing.rowCount > 0) {
            return res.status(400).json({ error: "User already booked this event" });
        }

        // check available seats for event
        const countSeats = await pool.query(
            'SELECT COUNT(*) FROM bookings WHERE event_id = $1',
            [event_id]
        );

        const usedSeats = parseInt(countSeats.rows[0].count);
        const totalSeats = event.rows[0].total_seats;
        if (usedSeats >= totalSeats) {
            return res.status(400).json({ error: "No seats available" });
        }

        const booking = await pool.query(
            'INSERT INTO bookings (event_id, user_id) VALUES ($1, $2) RETURNING *',
            [event_id, user_id]
        );

        res.json({ success: true, booking: booking.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const result = await pool.query(`
        SELECT 
          b.id as booking_id,
          b.event_id,
          b.user_id,
          b.created_at,
          e.id as event_id,
          e.name as event_name,
          e.total_seats
        FROM bookings b
        LEFT JOIN events e ON b.event_id = e.id
        ORDER BY b.created_at DESC
      `);

        const bookings = result.rows.map(row => ({
            id: row.booking_id,
            user_id: row.user_id,
            created_at: row.created_at,
            event_info: {
                id: row.event_id,
                name: row.event_name,
                total_seats: row.total_seats
            }
        }));

        res.json({ bookings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
