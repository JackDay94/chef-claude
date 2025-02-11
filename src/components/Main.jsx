import React from "react";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState("");

  const ingredientsListItems = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient").trim();
    if (ingredients.includes(newIngredient)) {
      setErrorMessage(`You've already added ${newIngredient}.`);
    } else if (newIngredient === "") {
      setErrorMessage("Please enter an ingredient.");
    } else {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
      setErrorMessage("");
    }
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {errorMessage && <p style={{ color: "red", fontWeight: "500", textAlign: "center" }}>{errorMessage}</p>}

      {ingredients.length > 0 ? (
        <section>
          <h2>Your Ingredients:</h2>
          <ul aria-live="polite" className="ingredients-list">
            {ingredientsListItems}
          </ul>
          {ingredients.length >= 4 ? (
            <div className="show-recipe-container">
              <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
              </div>
              <button>Get a recipe</button>
            </div>
          ) : null}
        </section>
      ) : null}
    </main>
  );
}
