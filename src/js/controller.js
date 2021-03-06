import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const { test } = require('picomatch');
const { title } = require('process');

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); //id+hash abl lid wl slice 5alletna nshouf l akli lla id
    console.log(id);

    if (!id) return;

    recipeView.renderSpinner();

    //1)loading recipe
    await model.loadRecipe(id); //7attaina await cz its async

    //2)rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
