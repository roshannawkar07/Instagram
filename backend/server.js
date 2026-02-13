const app = require("./src/app.js");
require("dotenv").config();
const connectDb = require("./src/config/db.js");

const PORT = process.env.PORT || 5000;
connectDb();

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
