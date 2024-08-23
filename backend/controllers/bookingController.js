const Booking = require("../models/Booking");

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("roomId").populate("userId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve Booking
exports.approveBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Find the booking by ID and update its status to 'Approved'
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "Approved" },
      { new: true } // Return the updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res
      .status(200)
      .json({
        message: "Booking approved successfully",
        booking: updatedBooking,
      });
  } catch (error) {
    console.error("Error approving booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Reject Booking
exports.rejectBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Find the booking by ID and update its status to 'Rejected'
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "Rejected" },
      { new: true } // Return the updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res
      .status(200)
      .json({
        message: "Booking rejected successfully",
        booking: updatedBooking,
      });
  } catch (error) {
    console.error("Error rejecting booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addBooking = async (req, res) => {
  const booking = new Booking(req.body);
  try {
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("roomId")
      .populate("userId");
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedBooking) {
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (deletedBooking) {
      res.json({ message: "Booking deleted" });
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
