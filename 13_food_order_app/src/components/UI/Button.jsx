function Button({ children, textOnly, styles, ...props }) {
  const cssClasses = textOnly ? "text-button" : "button";

  return (
    <button className={`${cssClasses} ${styles}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
