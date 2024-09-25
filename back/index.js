require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db"); 
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const cardRoutes = require("./routes/card");
const trendyRoutes = require("./routes/trendy"); 
const autumnRoutes = require("./routes/autumn"); 
const featuredRoutes = require("./routes/featured"); 
const contactRoutes = require("./routes/contact"); 
const filterRoutes = require("./routes/filter"); 

const app = express();
const path = require("path");

connection(); 

app.use(express.json());
app.use(cors());
app.use(express.json({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/trendy", trendyRoutes); 
app.use("/api/autumn", autumnRoutes); 
app.use("/api/featured", featuredRoutes); 
app.use("/api/contacts", contactRoutes); 
app.use("/api/filter", filterRoutes); 

const port = process.env.PORT || 3001; 
app.listen(port, () => console.log(`Server running on port ${port}`));
