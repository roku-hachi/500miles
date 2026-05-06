const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(
  cors({
    origin: "https://500miles.vercel.app",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/authRoutes"));
app.use(require("./routes/userRoutes"));
// app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/public", express.static("public"));
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.get("/", (req, res) => {
  return res.send("success!!!");
});

const PORT = process.env.PORT || 5432;
app.listen(PORT);
