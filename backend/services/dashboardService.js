const Room = require('../models/Room');
const Booking = require('../models/Booking');

const getTotalRooms = async () => {
  return await Room.countDocuments();
};

const getOccupiedRooms = async () => {
  return await Room.countDocuments({ 'history.0': { $exists: true } });
};

const getFreeRooms = async () => {
  const totalRooms = await getTotalRooms();
  const occupiedRooms = await getOccupiedRooms();
  return totalRooms - occupiedRooms;
};

const getTotalBookings = async () => {
  return await Booking.countDocuments();
};

const getApprovedBookings = async () => {
  return await Booking.countDocuments({ status: 'Approved' });
};

const getPendingBookings = async () => {
  return await Booking.countDocuments({ status: 'Pending' });
};

const getGeneratedRevenue = async () => {
  const bookings = await Booking.aggregate([
    {
      $lookup: {
        from: 'rooms',
        localField: 'roomId',
        foreignField: '_id',
        as: 'roomDetails'
      }
    },
    {
      $unwind: '$roomDetails'
    },
    {
      $project: {
        roomPrice: '$roomDetails.pricePerDay',
        stayDuration: {
          $subtract: ['$departureDateTime', '$arrivalDateTime']
        }
      }
    },
    {
      $project: {
        stayDuration: { $divide: ['$stayDuration', 1000 * 60 * 60 * 24] }, // Convert duration from milliseconds to days
        roomPrice: 1
      }
    },
    {
      $project: {
        totalCost: { $multiply: ['$stayDuration', '$roomPrice'] }
      }
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalCost' }
      }
    }
  ]);

  return bookings.length > 0 ? bookings[0].totalRevenue : 0;
};

module.exports = {
  getTotalRooms,
  getOccupiedRooms,
  getFreeRooms,
  getTotalBookings,
  getApprovedBookings,
  getPendingBookings,
  getGeneratedRevenue
};
