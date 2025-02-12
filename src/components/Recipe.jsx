import ReactMarkdown from 'react-markdown'

export default function Recipe(props) {
  return (
    <section aria-live='polite'>
      <h2>Your Recommendation:</h2>
      {props.isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chef Claude is cooking up a recipe...</p>
        </div>
      ) : (
        <ReactMarkdown>{props.claudeRecipe}</ReactMarkdown>
      )}
    </section>
  );
}