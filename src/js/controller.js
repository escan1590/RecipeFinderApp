import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if (module.hot) {
//   module.hot.accept();
// }

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    //Loading recipe

    await model.loadRecipe(id);

    //2)rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();

    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    //2) Load searrch results

    await model.loadSearchResults(query);

    //3) renderResults
    resultView.render(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};
init();
