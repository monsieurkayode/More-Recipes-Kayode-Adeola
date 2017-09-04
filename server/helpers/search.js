const searchByIngredients = (query, obj) => {
  const result = [];
  return obj.filter(eachObj => eachObj.ingredients.toLowerCase()
    .split(',').filter((element) => {
      return element.indexOf(query) > -1;
    }).length > 0);
};

const searchByCategory = (query, obj) => {
  const result = [];
  return obj.filter(eachObj => eachObj.category.toLowerCase()
    .split(',').filter((element) => {
      return element.indexOf(query) > -1;
    }).length > 0);
};

export default { searchByIngredients, searchByCategory };
