const express = require('express');
const mongoose = require('mongoose');

const app = express();
const authRoutes = require('./routes/userRoutes');
const cors = require('cors');


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Srinivas:Srinivas@cluster0.eu5eekh.mongodb.net/teachEagle?retryWrites=true&w=majority', {
     useNewUrlParser: true, 
     useUnifiedTopology: true
 });

app.use("/user", authRoutes);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
