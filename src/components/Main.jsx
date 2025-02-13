import React from "react";
import IngredientsList from "./IngredientsList";
import Recipe from "./Recipe";
import { getRecipeFromChefClaude } from "../../ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [recipe, setRecipe] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const recipeRef = React.useRef(null);
  const ingredientsLimit = 12;

  /**
   * Adds an ingredient to the list of ingredients and
   * returns an error if the input is empty, already exists or
   * is above the ingredient limit
   */
  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient").trim();
    // Format the ingredient to capitalize the first letter
    const formattedIngredient = newIngredient.charAt(0).toUpperCase() + newIngredient.slice(1);

    if (ingredients.includes(formattedIngredient)) {
      setErrorMessage(`You've already added ${formattedIngredient}.`);
    } else if (formattedIngredient === "") {
      setErrorMessage("Please enter an ingredient.");
    } else if (ingredients.length === ingredientsLimit) {
      setErrorMessage(`No more than ${ingredientsLimit} ingredients please!`);
    } else {
      setIngredients((prevIngredients) => [...prevIngredients, formattedIngredient]);
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
  
  // Scroll the recipe into view once it has generated
  React.useEffect(() => {
    if (recipe && recipeRef.current) {
      recipeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [recipe]);

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
        <p className="error-message">
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
        <Recipe claudeRecipe={recipe} isLoading={isLoading} ref={recipeRef} />
      )}
    </main>
  );
}
