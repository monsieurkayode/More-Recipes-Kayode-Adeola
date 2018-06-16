/**
 * Resets the value of current page for pagination
 * @param {void} void
 *
 * @returns {void}
 */
const resetPage = () => {
  localStorage.setItem('currentPage', 1);
  localStorage.setItem('currentPageUserRecipes', 1);
  localStorage.setItem('currentPageUserFavorites', 1);
  localStorage.setItem('currentCategoryPage', 1);
};

export default resetPage;
