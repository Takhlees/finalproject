exports.getDashboardMetrics = async (req, res) => {
    try {
      const totalRooms = await getTotalRooms();
      const occupiedRooms = await getOccupiedRooms();
      const freeRooms = await getFreeRooms();
      const totalBookings = await getTotalBookings();
      const approvedBookings = await getApprovedBookings();
      const pendingBookings = await getPendingBookings();
      const generatedRevenue = await getGeneratedRevenue();
  
      res.json({
        totalRooms,
        occupiedRooms,
        freeRooms,
        totalBookings,
        approvedBookings,
        pendingBookings,
        generatedRevenue
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  