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
      "px-4 py-2 text-xs md:text-base bg-stone-100 text-stone-600 border border-stone-300 hover:bg-stone-200 hover:text-stone-800 focus:ring-stone-500 shadow-sm",
    primary:
      "px-4 py-2 bg-stone-800 text-white hover:bg-stone-900 focus:ring-stone-500 shadow-sm border border-transparent",
    secondary:
      "px-4 py-2 bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-300 focus:ring-stone-500 shadow-sm",
    ghost:
      "px-4 py-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 focus:ring-stone-500",
    danger:
      "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-4 py-2 shadow-sm focus:ring-red-500",
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
