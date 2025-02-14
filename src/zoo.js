const { species, employees, prices, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((animal) => ids.some((id) => id === animal.id));
  // const animalsId = species.filter((animal, index) => animal.id === ids[index]);
  // return animalsId; // Outra forma de resolver
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/some
}

function getAnimalsOlderThan(animal, age) {
  const specieAnimal = species
    .find(({ name }) => name === animal).residents
    .every((resident) => resident.age >= age);
  return specieAnimal;
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const searchEmployee = employees
    .find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
  return searchEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const createObject = { ...personalInfo, ...associatedWith };
  employees.push(createObject);
  return createObject;
  // Utilizei o spread operator para espalhar os objetos recebidos em um novo objeto.
}

function isManager(id) {
  return employees.some((funcionario) => funcionario.managers.includes(id));

  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });

  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/push
}

function countAnimals(speciesName) {
  if (speciesName !== undefined) {
    return species.find((animal) => animal.name === speciesName).residents.length;
  } return species.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
}

function calculateEntry(entrants) {
  // Primeiro faço o teste de entrada no parametro entrants, verificando se recebe nenhum argumento ou um objeto vazio.
  if (entrants === undefined || entrants === {}) {
    return 0;
  }

  // Aqui faço destructuring do parametro recebido, já que ele vai receber um objeto. Como estamos trabalhando com number, passei um default params para cada chave, isso me garante que caso não receba todas as chaves preenchidas o meu código não seja quebrado.
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;

  // por fim, para finalizar a operação, criei variáveis para realizar a multiplicação das unidades recebidas, com o valor de cada chave do objeto prices no arquivo /data.js
  const adultCalculo = Adult * prices.Adult;
  const childCalculo = Child * prices.Child;
  const seniorCalculo = Senior * prices.Senior;
  const sumValues = adultCalculo + childCalculo + seniorCalculo;
  return sumValues;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const diasDaSemana = Object.keys(hours);
  const result = {};
  diasDaSemana.forEach((oneDay) => {
    const hora = Object.values(hours[oneDay]);
    if (oneDay !== 'Monday') {
      result[oneDay] = `Open from ${hora[0]}am until ${hora[1] - 12}pm`;
    } else {
      result[oneDay] = 'CLOSED';
    }
  });

  const result2 = { [dayName]: result[dayName] };
  return (dayName === undefined) ? result : result2;
}

function getOldestFromFirstSpecies(id) {
  let result = [];

  const employee = employees.find((codeId) => codeId.id === id);
  const specie = species.find((codeId) => codeId.id === employee.responsibleFor[0]);

  let firstAnimalAge = specie.residents[0].age;
  specie.residents.forEach((resident) => {
    if (resident.age > firstAnimalAge) {
      firstAnimalAge = resident.age;
      const temporario = Object.values(resident);
      result = temporario;
    }
  });
  return result;
}

function increasePrices(percentage) {
  const divisionPercent = percentage / 100;

  const { Adult, Child, Senior } = prices;

  const calcPercentAdult = (divisionPercent * Adult) + Adult + 0.001;
  const calcPercentChild = (divisionPercent * Child) + Child + 0.001;
  const calcPercentSenior = (divisionPercent * Senior) + Senior + 0.001;

  prices.Adult = parseFloat(calcPercentAdult.toFixed(2));
  prices.Child = parseFloat(calcPercentChild.toFixed(2));
  prices.Senior = parseFloat(calcPercentSenior.toFixed(2));

  return prices;

  // Usei .toFixed() para definir a quantidade de casas decimais que iria precisar, mas como esse método retorna string, precisei usar o parseFloat() para fazer a conversao do resultado em number.
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseFloat
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
