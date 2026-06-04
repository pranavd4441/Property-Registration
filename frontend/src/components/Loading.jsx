function Loading({ message = 'Loading data...' }) {
  return (
    <div className="state-box" role="status">
      <div className="spinner" aria-hidden="true"></div>
      <p>{message}</p>
    </div>
  )
}

export default Loading
