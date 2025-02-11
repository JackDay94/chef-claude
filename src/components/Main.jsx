import React from "react";
import IngredientsList from "./IngredientsList";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState("");

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

      {ingredients.length > 0 && <IngredientsList ingredients={ingredients}/>}
    </main>
  );
}
