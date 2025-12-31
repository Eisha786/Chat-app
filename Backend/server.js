import express from "express";
import connectDB from "./config/db.js";


import userRoutes from "./routes/user.routes.js"
import cors from "cors"


const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("Server is running...");
})

connectDB();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
