const mongoose = require('mongoose');

const Rooms = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

Rooms.virtual('key').get(function () {
  return this.id;
});

module.exports = mongoose.model('Room', Rooms);
