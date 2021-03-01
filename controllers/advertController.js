/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable prefer-destructuring */
/* eslint-disable radix */
const Adverts = require('../models/Adverts');

exports.getAdvert = async function (req, res, next) {
  console.log('The logged in user has the _id:', req.apiAuthUserID);

  try {
    const { name } = req.query;
    const { price } = req.query;
    const { type } = req.query;
    const { tags } = req.query;

    // Others
    const limit = parseInt(req.query.limit || 10);
    const skip = parseInt(req.query.skip);
    const sort = req.query.sort || '_id';

    // Search filters
    const filter = {};

    if (typeof name !== 'undefined') {
      filter.name = new RegExp(`^${name}`, 'i');
    }

    if (typeof price !== 'undefined' && price !== '-') {
      if (price.indexOf('-') !== -1) {
        filter.price = {};
        const range = price.split('-');
        if (range[0] !== '') {
          filter.price.$gte = range[0];
        }
        if (range[1] !== '') {
          filter.price.$lte = range[1];
        }
      } else {
        filter.price = price;
      }
    }

    if (typeof tags !== 'undefined') {
      filter.tags = tags;
    }

    if (typeof type !== 'undefined') {
      filter.type = type;
    }

    const adverts = await Adverts.list(filter, limit, skip, sort);
    res.json(adverts);
  } catch (err) {
    next(err);
  }
};

// Get an advert by id
exports.getAdvertById = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const advert = await Adverts.findOne({ _id });

    res.json({ result: advert });
  } catch (err) {
    next(err);
  }
};

// Create an advert --> POSt /api/adverts
exports.postAdvert = async (req, res, next) => {
  try {
    const advertData = req.body;

    // We create a document in memory
    const advert = new Adverts(advertData);

    // We save the document in the database
    const advertSaved = await advert.save();

    res.json({ result: advertSaved });
  } catch (err) {
    next(err);
  }
};

// Update an advert --> /api/adverts/:id
exports.putAdvert = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const _id = req.params._id;
    const advertData = req.body;

    const advertSaved = await Adverts.findByIdAndUpdate({ _id }, advertData, {
      new: true,
      useFindAndModify: false,
    });
    res.json({ result: advertSaved });
  } catch (err) {
    next(err);
  }
};

exports.deleteAdvert = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const _id = req.params._id;

    const borrarAnuncio = await Adverts.deleteOne({ _id });
    console.log(borrarAnuncio);

    res.send('Advert deleted succesfully!');
  } catch (err) {
    next(err);
  }
};
