require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT;
const MongoDB = require("./config/db");

MongoDB()
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
