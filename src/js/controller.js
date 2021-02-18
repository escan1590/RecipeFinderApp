import * as model from './model';
import recipeView from './views/recipeView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
    console.error(err);
    alert(err);
  }
};

controlRecipe();
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipe)
);
