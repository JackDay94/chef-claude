export default function IngredientsList(props) {
  const ingredientsListItems = props.ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  return (
    <section>
      <h2>Your Ingredients:</h2>
      <ul aria-live="polite" className="ingredients-list">
        {ingredientsListItems}
      </ul>
      {props.ingredients.length >= 4 &&
        <div className="show-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={props.toggleRecipe}>Get a recipe</button>
        </div>}
    </section>
  );
}
