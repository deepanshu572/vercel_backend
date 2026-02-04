import jwt from "jsonwebtoken";

const genToken = async (userId) => {
  try {
    var token = await jwt.sign({ userId }, "ZEENAT");
    return token;
  } catch (error) {
    console.log(error);
  }
};
export default genToken