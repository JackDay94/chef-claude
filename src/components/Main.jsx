import React from "react";
import IngredientsList from "./IngredientsList";
import Recipe from "./Recipe";
import { getRecipeFromChefClaude } from "../../ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [recipe, setRecipe] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * Adds an ingredient to the list of ingredients and
   * returns an error if the input is empty or already exists
   */
  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient").trim();
    if (ingredients.includes(newIngredient)) {
      setErrorMessage(`You've already added ${newIngredient}.`);
    } else if (newIngredient === "") {
      setErrorMessage("Please enter an ingredient.");
    } else if (ingredients.length === 12) {
      setErrorMessage("No more than 12 ingredients please!")
    } else {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
      setErrorMessage("");
    }
  }

  /**
   * Clear the ingredients array and clear the error message
   * and generated recipe
   */
  function resetIngredients() {
    setIngredients([]);
    setErrorMessage("");
    setRecipe("");
  }

  /**
   * Remove an Individual ingredient from the list and clear
   * error message and generated recipe
   */
  function removeIngredient(ingredientToRemove) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient !== ingredientToRemove)
    );
    setErrorMessage("");
    setRecipe("");
  }

  /**
   * Gets a recipe generated from the the Claude ai
   * using the ingredients given by the user
   */
  async function generateRecipe() {
    setIsLoading(true);
    const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
    setRecipe(recipeMarkdown);
    setIsLoading(false);
  }

  return (
    <main>
      <small>Give Chef Claude at least 4 ingredients to find a recipe!</small>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {errorMessage && (
        /* Error message for invalid inputs */
        <p style={{ color: "red", fontWeight: "500", textAlign: "center" }}>
          {errorMessage}
        </p>
      )}

      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          resetIngredients={resetIngredients}
          removeIngredient={removeIngredient}
          generateRecipe={generateRecipe}
        />
      )}

      {(isLoading || recipe) && (
        <Recipe claudeRecipe={recipe} isLoading={isLoading} />
      )}
    </main>
  );
}
