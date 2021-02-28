//* eslint-disable no-console */
require('dotenv').config();

const readLine = require('readline');
const conn = require('./lib/connectionDB');
const Advert = require('./models/Adverts');
const User = require('./models/Users');

/**
 * Init adverts on DB
 */
async function initAdverts() {
  // Delete existing documents in the collection
  console.log('Emptying adverts collection...');
  await Advert.deleteMany();

  // Upload initial documents
  console.log('Loading adverts...');
  const result = await Advert.insertMany([
    {
      name: 'Iphone 11',
      image: 'iphone11.jpg',
      description:
        'For sale Iphone 11 brand new, charger not included. Screen without scratches. Price negotiable.',
      price: 700,
      type: 'sell',
      tags: ['Mobile', 'Tech', 'Lifestyle'],
    },
    {
      name: 'Polaroid',
      image: 'polaroid.jpg',
      description:
        'For sale Polaroid Snaptouch instant camera, brand new, unused, with original Polaroid case and 8 Gb micro SD card. Personal guarantee.',
      price: 100,
      type: 'sell',
      tags: ['Photography', 'Lifestyle'],
    },
    {
      name: 'Armchair',
      image: 'armchair.jpg',
      description:
        'For sale leather armchair. Off-white color. Rotates 360 degrees and is in perfect condition as it has been in a second residence.',
      price: 300,
      type: 'sell',
      tags: ['Home', 'Forniture'],
    },
    {
      name: 'Headsets',
      image: 'headsets.jpg',
      description:
        'I sell unused wireless headsets with noise cancellation, they have not been taken out of the box.',
      price: 200,
      type: 'sell',
      tags: ['Audio', 'Lifestyle', 'Tech'],
    },
    {
      name: 'GeForce RTX 2060 6gb',
      image: 'gforceRTX2060.jpg',
      description:
        'I am looking for a Gigabyte Nvidia GeForce RTX 2060 Gaming OC 6GB GDDR6 Graphics Card, I need it to include 2 years warranty and in good condition.',
      price: 400,
      type: 'buy',
      tags: ['Gaming', 'Tech'],
    },
  ]);
  console.log(`${result.length} adverts has been created succesfully!`);
}

/**
 *Init users on DB
 */
async function initUsers() {
  // Delete existing documents in the collection
  console.log('Emptying users collection...');
  await User.deleteMany();

  // Upload inital documents
  console.log('Loading users...');
  const result = await User.insertMany([
    {
      name: 'Darth',
      surname: 'Vader',
      username: 'DarthVader',
      email: 'darthvader@example.com',
      password: await User.hashPassword('1234'),
      avatar: 'avatar.jpg',
    },
  ]);
  console.log(`${result.length} users has been created succesfully!`);
}

// Ask user function
function askuser(textQuestion) {
  return new Promise((resolve) => {
    const rl = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(textQuestion, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// eslint-disable-next-line consistent-return
conn.once('open', async () => {
  try {
    const response = await askuser(
      'Are you sure you want to start the database with initial data?(no)'
    );
    if (response.toLowerCase() !== 'yes') {
      console.log('Process aborted!');
      return process.exit(0);
    }
    console.log(response);
    await initAdverts();
    await initUsers();

    conn.close();
  } catch (err) {
    console.log('An error has occurred');
    process.exit(1);
  }
});
