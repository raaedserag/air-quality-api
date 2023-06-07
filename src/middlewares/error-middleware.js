import { HttpException } from "../classes/index.js"
export default function (err, req, res, next) {
  if (err instanceof HttpException) {
    return res.status(err.httpcode).send(err.httpMessage);
  }
  else {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
