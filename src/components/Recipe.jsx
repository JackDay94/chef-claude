import ReactMarkdown from 'react-markdown'

export default function Recipe(props) {
  return (
    <section className="generated-recipe-container" aria-live='polite'>
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
}