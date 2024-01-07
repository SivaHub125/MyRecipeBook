const recipeList=document.querySelector('#recipe-list');
const noRecipes=document.getElementById('no-recipes');
const form = document.querySelector('.recipe-form');
let recipes = [];


function handleSubmit(event) 
{
    // Prevent default form submission behavior
    event.preventDefault();
    
    // Get recipe name, ingredients, and method input values
    const nameInput = document.querySelector('#recipe-name');
    const ingrInput = document.querySelector('#recipe-ingredients');
    const methodInput = document.querySelector('#recipe-method');
    const name = nameInput.value.trim();
    const ingredients = ingrInput.value.trim().split(',').map(i => i.trim());
    const method = methodInput.value.trim();
    if (name && ingredients.length > 0 && method) {
        const newRecipe = { name, ingredients, method };
        recipes.push(newRecipe);
    }
    
    nameInput.value = '';
    ingrInput.value = '';
    methodInput.value = '';
    displayRecipes();
}

form.addEventListener('submit', handleSubmit);
  
function displayRecipes() {
    recipeList.innerHTML = '';
    recipes.forEach((recipe, index) => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeList.appendChild(recipeDiv);
        recipeDiv.innerHTML = `
        <h3>${recipe.name}</h3>
        <p><strong>Ingredients:</strong></p>
        <ul>
        ${recipe.ingredients.map(ingr => `<li>${ingr}</li>`).join('')}
        </ul>
        <p><strong>Method:</strong></p>
        <p>${recipe.method}</p>
        <button class="delete-button" data-index="${index}">Delete</button>`;   
    });
    noRecipes.style.display = recipes.length > 0 ? 'none' : 'flex';
    searchBox.value = '';
  }
function handleDelete(event) {
    if (event.target.classList.contains('delete-button')) {
        const index = event.target.dataset.index;
        recipes.splice(index, 1);
        displayRecipes();
        searchBox.value = '';
      }
  }

recipeList.addEventListener('click', handleDelete);
  
const searchBox = document.getElementById('search-box');

function search(query) {
    const filteredRecipes = recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(query.toLowerCase());
    });

    recipeList.innerHTML='';
    
    filteredRecipes.forEach(recipe => {
        const recipeEl = document.createElement('div');  
        recipeEl.innerHTML = `
        <h3>${recipe.name}</h3>
        <p><strong>Ingredients:</strong></p>
        <ul>${recipe.ingredients.map(ingr => `<li>${ingr}</li>`).join('')}</ul>
        <p><strong>Method:</strong></p>
        <p>${recipe.method}</p>
        <button class="delete-button" data-index="${recipes.indexOf(recipe)}">Delete</button>`;   
        recipeEl.classList.add('recipe');
        recipeList.appendChild(recipeEl);  
    });
  }
  
  searchBox.addEventListener('input', event => search(event.target.value));