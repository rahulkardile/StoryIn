import express from "express";
import { User } from "../Models/User.js";
import bcrypt from "bcrypt"
import { errorHandler } from "../utils/errHandler.js";
import jwt from "jsonwebtoken"
import { verifyUser } from "../utils/VerifyUser.js";

const router = express.Router();
const oneFifty = 1000 * 60 * 60 * 24 * 150;

router.post("/new", async (req, res, next) => {
  try {
    const { name, email, password, DOB, gender } = await req.body;

    if (!name, !email, !password, !DOB, !gender) return next(400, "bad req!");

    const hash = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      name,
      email,
      DOB,
      gender,
      password: hash,
    });

    res.status(200).json(`Welcome ${newUser.name}`)

  } catch (error) {
    next(error);
  }
});

router.post("/google", async (req, res, next) => {
  try {
    const { name, email, photoURL, uid } = await req.body;

    const user = await User.findOne({ email })

    if (user) {

      if (user.uid !== uid) {
        return res.status(200).json({
          statusCode: 400,
          message: "Invalid Credential"
        })
      }

      const access_User = jwt.sign({ _id: user._id, email: user.email, name: user.name, role: user.role }, process.env.JWTSECRET)

      const { password: pass, createdAt, updatedAt, __v, ...rest } = user._doc

      res.cookie("_user_access", access_User, { secure: true, maxAge: oneFifty }).status(200).json({
        statusCode: 200,
        success: true,
        data: rest,
        message: `Welcome back ${user.name}!`
      });

    } else {

      const hash = bcrypt.hashSync(uid, 10);

      const newUser = await User.create({
        name,
        email,
        photoURL,
        uid,
        password: hash
      });

      const access_User = jwt.sign({ _id: newUser._id, email: newUser.email, name: newUser.name, role: newUser.role }, process.env.JWTSECRET)

      const { password: pass, createdAt, updatedAt, __v, ...rest } = newUser._doc

      res.cookie("_user_access", access_User, { secure: true, maxAge: oneFifty }).status(200).json({
        statusCode: 200,
        success: true,
        data: rest,
        message: `Welcome ${user.name}!`
      });

    }

  } catch (error) {
    next(error);
  }
});


router.post("/get", async (req, res, next) => {
  try {

    const { email, password } = req.body;
    if (!email, !password) return next(errorHandler(400, "Something is meesing!"));

    const LoginUser = await User.findOne({ email });

    if (!LoginUser) return next(errorHandler(400, "User not exist!"));

    const passOk = bcrypt.compareSync(password, LoginUser.password)
    if (!passOk) return next(errorHandler(400, "Wrong password!"));

    const access_User = jwt.sign({ _id: LoginUser._id, email: LoginUser.email, name: LoginUser.name, role: LoginUser.role }, process.env.JWTSECRET)

    const { password: pass, createdAt, updatedAt, __v, ...rest } = LoginUser._doc

    res.cookie("_user_access", access_User, { secure: true, maxAge: oneFifty }).status(200).json(rest);

  } catch (error) {
    next(error)
  }
})

router.get("/reSign", verifyUser, async (req, res, next) => {
  try {
    const { _id, email } = await req.user;
    if (!_id) return next(errorHandler("404", "Wrong User!"));

    const LoginUser = await User.findOne({ email });
    const { password: pass, createdAt, updatedAt, __v, ...rest } = LoginUser._doc

    res.status(200).json({
      success: true,
      user: rest
    })

  } catch (error) {
    next(error);
  }
})

router.get("/verify", verifyUser, (req, res,next)=> {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
})

router.get("/become", verifyUser, async (req, res, next) => {
  try {

    const data = await req.user;

    if (data.role === "user") {

      const newU = await User.findByIdAndUpdate(data._id, {
        role: "creator"
      })

      return res.status(200).json({
        success: true,
        message: "Your now creator"
      })

    } else {
      res.json({
        success: false,
        message: "Your already creator"
      })
    }
  } catch (error) {
    next(error);
  }
})

router.get("/logout", async (req, res, next) => {
  try {

    res.clearCookie('_user_access');
    res.status(200).json({
      success: true,
      message: "User has been logout"
    });

  } catch (error) {
    next(error)
  }
})

export default router;
