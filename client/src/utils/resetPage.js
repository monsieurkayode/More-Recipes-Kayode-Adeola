const resetPage = () => {
  localStorage.setItem('currentPage', 1);
  localStorage.setItem('currentPageUserRecipes', 1);
  localStorage.setItem('currentPageUserFavorites', 1);
};

export default resetPage;
