const PromptText = ({ children, props }) => {
  return (
    <p
      style={{
        color: "#888",
        fontSize: "18px",
        lineHeight: "1.2",
        marginBottom: "1rem",
        marginTop: "0.5rem",
      }}
      {...props}
    >
      {children}
    </p>
  )
}

export default PromptText
