const { dogs, cats, birds } = require('../utils/animalsName');
const { getRandomInt } = require('../utils/getRandomInt');

function selectAnimalType() {
  const animals = [dogs, cats, birds]

  return animals[getRandomInt(0, 3)];
}

function getAnimalNamePromise() {

  const animal = selectAnimalType()
  const animalName = animal[getRandomInt(0, animal.length)]

  return new Promise((resolve) => {
    return resolve(animalName);
  });
}


async function getAnimalName(request, response, next) {

  const name = await getAnimalNamePromise();

  request.body.userName = name;

  next();
}

module.exports = {
  getAnimalName,
};
