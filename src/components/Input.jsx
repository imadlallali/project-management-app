import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, textarea, className = "", ...props },
  ref
) {
  const baseClasses = "input-field";
  const textareaClasses = "min-h-[120px] resize-y";

  const classes = `${baseClasses} ${
    textarea ? textareaClasses : ""
  } ${className}`;

  return (
    <div className="space-y-2">
      <label className="input-label">{label}</label>
      {textarea ? (
        <textarea className={classes} ref={ref} {...props} />
      ) : (
        <input className={classes} ref={ref} {...props} />
      )}
    </div>
  );
});

export default Input;
