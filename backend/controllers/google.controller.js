const googleLogin = async (req, res) => {
  const { name, email } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      password: null,
      isOnboarded: false,
    });
  }

  const token = generateJWT(user._id);

  res.json({
    token,
    user
  });
};
