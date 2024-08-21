exports.getDashboardMetrics = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access Denied' });
    }
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
  