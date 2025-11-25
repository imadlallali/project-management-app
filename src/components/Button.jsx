export default function Button({
  children,
  className = "",
  variant = "default",
  ...props
}) {
  const baseClasses =
    "font-medium rounded-lg transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default:
      "px-4 py-2 text-xs md:text-base bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100 focus:ring-stone-500",
    primary:
      "px-6 py-3 bg-stone-800 text-stone-50 hover:bg-stone-900 focus:ring-stone-500 shadow-sm",
    secondary:
      "px-4 py-2 bg-stone-200 text-stone-800 hover:bg-stone-300 focus:ring-stone-500",
    ghost:
      "px-4 py-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 focus:ring-stone-500",
    danger:
      "bg-red-600 hover:bg-red-700 text-white px-4 py-2 shadow-sm focus:ring-red-500",
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
