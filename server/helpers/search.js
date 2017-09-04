const searchByIngredients = (query, obj) => obj.filter(eachObj =>
  eachObj.ingredients.toLowerCase()
    .split(',').filter(element =>
      element.indexOf(query.toLowerCase()) > -1).length > 0);

const searchByCategory = (query, obj) =>
  obj.filter(eachObj => eachObj.category.toLowerCase()
    .split(',').filter(element =>
      element.indexOf(query.toLowerCase()) > -1).length > 0);

export default { searchByIngredients, searchByCategory };
