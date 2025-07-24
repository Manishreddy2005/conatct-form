require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Contact = require('./models/Contact');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.error(err));
app.post('/Submit', async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !phone || !message) {
    return res.status(400).send('All fields are required');
  }
  try {
    const contact = new Contact({ name, email, phone, message });
    await contact.save();
    return res.status(201).send('Form submitted successfully');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});