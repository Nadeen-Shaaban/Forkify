//import icons from '../img/icons.svg'; //parcel 1
import icons from 'url:../img/icons.svg'; //parcel2
import 'core-js/stable';
import'regenerator-runtime/runtime';

const { test } = require("picomatch");
const { title } = require("process");

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const renderSpinner = function(parentE1) {
  const markup=`
  <div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
    </div>
    `;
    parentE1.innerHTML='';
    parentE1.insertAdjacentHTML('afterbegin',markup);
  
}

const showRecipe = async function() {
  try {
    //1)loading recipe
    renderSpinner(recipeContainer);
    const res = await fetch(
      //'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcae5'
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
      );
    const data = await res.json();

    if(!res.ok) throw new Error(`${data.message} (${res.status})`); //bt3tina like alert innu l request 8lt 

    console.log(res, data);
    let {recipe} = data.data;
    recipe= {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    };
    console.log(recipe);

    //2)rendering recipe
    const markup=`
    <figure class="recipe__fig">
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${recipe.cooking_time}</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${recipe.ingredients.map(ing => {
          return `
          <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${ing.quantity}</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.descriptipn}
          </div>
        </li>
          `;
      }).join('')}; 

  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
        
    `;
    recipeContainer.innerHTML= '';//shlna lmsg 2e5er shi
    recipeContainer.insertAdjacentHTML('afterbegin', markup);//3mlna renderlal recipe


  } catch (err) {
    alert (err);
  }
};
showRecipe();

