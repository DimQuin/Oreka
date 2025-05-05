const {
  default: mongoose,
} = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(
      // "mongodb://127.0.0.1/oreka"
      "mongodb+srv://quynh2051220015:quinquin123@cluster0.4g1xlmv.mongodb.net/"
    );
    console.log(
      "Database connect successfully"
    );
  } catch (error) {
    console.log("Database error");
  }
};
module.exports = dbConnect;
