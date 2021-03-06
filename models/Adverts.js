const mongoose = require('mongoose');

const { Schema } = mongoose;

const advertsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    description: {
      type: String,
      maxlength: 150,
    },

    price: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ['sell', 'buy'],
      required: true,
    },

    tags: {
      type: [String],
      enum: [
        'Tech',
        'Audio',
        'Lifestyle',
        'Sports',
        'Games',
        'Gaming',
        'Mobile',
        'Toys',
        'Home',
        'Forniture',
        'Photography',
      ],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  },
  { timestamps: true },
);

// Methods
advertsSchema.statics.list = function (filter, limit, skip, sort) {
  const query = Adverts.find(filter);
  query.limit(limit);
  query.skip(skip);
  query.sort(sort);
  return query.exec();
};
// Model
const Adverts = mongoose.model('Adverts', advertsSchema);

module.exports = Adverts;
