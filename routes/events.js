const express = require('express');
const router = express.Router();

const Event = require('../models/Event');
const isAuth = require('../middleware/isAuth');

router.get('/', isAuth, async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.post('/', isAuth, async (req, res) => {
  const { title, description, date } = req.body;
  const event = new Event({ title, description, date });
  const newEvent = await event.save();
  res.status(201).json({ event: newEvent });
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.put('/:id', isAuth, async (req, res) => {
  const eventID = req.params.id;
  const { title, description, date } = req.body;
  const updatedEvent = {};
  if (title) updatedEvent.title = title;
  if (description) updatedEvent.description = description;
  if (date) updatedEvent.date = date;
  try {
    const event = await Event.findByIdAndUpdate(
      eventID,
      { $set: updatedEvent },
      { new: true }
    );
    res.status(201).json({ event });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.delete('/:id', isAuth, async (req, res) => {
  const eventID = req.params.id;
  try {
    await Event.findByIdAndRemove(eventID);
    res.status(200).json({ message: 'Event is removed' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'server Error' });
  }
});

module.exports = router;
