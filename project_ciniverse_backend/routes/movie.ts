import { Router } from "express";
import axios from "axios";
import jwt, { decode } from "jsonwebtoken";
import "dotenv/config";

const router = Router();
const secret = process.env.SECRET || "";
const AuthenToken = (req:any, res:any, next:any) => {
  const header = req.headers;
  if (!header.token) {
    if (header.token === "") {
      return res.json({
        data: null,
        devMessage: "Unauthorized",
      });
    }
    next();
  } else if (header.token === "") {
    return res.json({
      data: null,
      devMessage: "Unauthorized",
    });
  } else {
    const tokenDecode = jwt.decode(header.token);
    console.log(tokenDecode)
    if (!tokenDecode || tokenDecode === null) {
      return res.json({
        data: null,
        devMessage: "Unauthorized",
      });
    }
    next();
  }
};

router.get("/", AuthenToken, async (req, res) => {
  console.log(req.headers)
  const getMovie: any = await axios.get(
    `https://api.themoviedb.org/3/movie/${req.query.id}?api_key=72eef7bc29be08e73392ec8cc0b64c52`
    );
  res.status(200).json(getMovie.data);

});



export default router;
