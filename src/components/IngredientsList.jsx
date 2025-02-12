export default function IngredientsList(props) {
  // Get a list of ingredients
  const ingredientsListItems = props.ingredients.map((ingredient) => (
    <li key={ingredient}>
      {ingredient}
      <button
        className="remove-ingredient-button"
        onClick={() => props.removeIngredient(ingredient)}
        aria-label={`Remove ${ingredient}`}
      >
        X
      </button>
    </li>
  ));

  return (
    <section>
      <div className="ingredients-header">
        <h2>Your Ingredients:</h2>
        {/* Button to clear the ingredients list */}
        <button
          className="reset-button"
          onClick={props.resetIngredients}
          aria-label="Reset all ingredients"
        >
          Reset
        </button>
      </div>
      <ul aria-live="polite" className="ingredients-list">
        {ingredientsListItems}
      </ul>
      {/* Show the button to generate a recipe if 4 or more ingredients */}
      {props.ingredients.length >= 4 && (
        <div className="show-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={props.generateRecipe}>Get a recipe</button>
        </div>
      )}
    </section>
  );
}
