import React from 'react'
import ReactMarkdown from 'react-markdown'

const Recipe = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className="generated-recipe-container" aria-live='polite'>
      {props.isLoading ? (
        // Loading spinner shown while waiting for Claude response
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chef Claude is cooking up a recipe...</p>
        </div>
      ) : (
        <div>
          <h2>Your Recommendation:</h2>
          <ReactMarkdown>{props.claudeRecipe}</ReactMarkdown>
        </div>
      )}
    </section>
  );
});

Recipe.displayName = 'Recipe';

export default Recipe;