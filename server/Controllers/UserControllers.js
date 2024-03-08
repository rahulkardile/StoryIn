

const oneFifty = 1000 * 60 * 60 * 24 * 150;

export const New = async (req, res, next) => {
    try {
      const { name, email, password } = await req.body;
  
      if(!name, !email, !password) return next(400, "bad req!");
  
      const hash = bcrypt.hashSync(password, 10);
  
      const newUser = await User.create({
        name,
        email,
        password: hash,
      });
  
      res.status(200).json(`Welcome ${newUser.name}`)
      
    } catch (error) {
      next(error);
    }
  }

export const get = async(req, res, next)=> {
    try {
    
        const { email, password } = req.body;
        if(!email, !password) return next(errorHandler(400, "Something is meesing!"));

        const LoginUser = await User.findOne({email});

        if(!LoginUser) return next(errorHandler(400, "User not exist!"));

        const passOk = bcrypt.compareSync(password, LoginUser.password)
        if(!passOk) return next(errorHandler(400, "Wrong password!"));

        const access_User = jwt.sign({ _id: LoginUser._id, email: LoginUser.email}, process.env.JWT_SECRET)


        const { password: pass, createdAt, updatedAt, __v, ...rest} = LoginUser._doc

        res.cookie("_user_access", access_User, { secure: true, maxAge: oneFifty }).status(200).json(rest);

    } catch (error) {
        next(error)
    }
}