exports.registerUser = async (req, res) => {
  console.log('Received registration request:', req.body);

  try {
    const { role, firstName, lastName, email, password } = req.body; // Destructure without assignedStake

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email address is already registered' });
    }

    const newUser = new User({
      role,
      firstName,
      lastName,
      email,
      password,
      // We are intentionally not setting assignedStake here for now
    });

    console.log('New user object created:', newUser);

    try {
      const savedUser = await newUser.save();
      console.log('User saved successfully:', savedUser);
      res.status(201).json({ message: 'Account created successfully' });
    } catch (saveError) {
      console.error('Error during newUser.save():', saveError);
      console.error('Save error stack:', saveError.stack);
      res.status(500).json({ message: 'Failed to create account (save error)' });
    }

  } catch (error) {
    console.error('Error during user registration:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ message: 'Failed to create account (general error)' });
  }
};