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
    primary: "btn-primary focus:ring-indigo-500",
    secondary: "btn-secondary focus:ring-slate-300",
    ghost: "btn-ghost focus:ring-slate-400",
    danger:
      "bg-red-600 hover:bg-red-700 text-white px-4 py-2 shadow-lg hover:shadow-xl focus:ring-red-500",
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
