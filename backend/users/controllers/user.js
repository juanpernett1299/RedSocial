const userDAO = require('../db/userDAO');

const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userDAO.getUserById(parseInt(id, 10));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUserProfile
};
