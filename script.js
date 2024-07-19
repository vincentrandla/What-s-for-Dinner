"use strict";

document.querySelector(".meal_button").addEventListener("click", fetchMeal);

function fetchMeal() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      document.querySelector(".meal_name").textContent = meal.strMeal;
      const mealImage = document.querySelector(".meal_image");
      mealImage.src = meal.strMealThumb;
      mealImage.classList.remove("hidden");
      document.querySelector(".meal_instructions").textContent =
        meal.strInstructions;

      // GETTING THE INGREDIENTS WHICH ARE NUMBERED IN API
      const ingredientsList = document.querySelector(".ingredients_list");
      ingredientsList.innerHTML = "";

      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim()) {
          const listItem = document.createElement("li");
          listItem.textContent = `${measure} ${ingredient}`;
          ingredientsList.appendChild(listItem);
        }
      }
    })
    .catch((error) => console.error("Error fetching the meal:", error));
}
