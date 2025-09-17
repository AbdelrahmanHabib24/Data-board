export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-3 py-3 md:px-4 md:py-2 lg:px-3 lg:py-0.5
        text-sm md:text-base lg:text-lg
        rounded-lg 
        bg-gradient-to-r from-orange-500 to-yellow-400
        hover:from-orange-600 hover:to-yellow-300
        disabled:bg-gray-300 disabled:text-gray-500
        text-white font-medium
        transition-all duration-200 ease-in-out
        shadow-sm
        ${className}
      `}
    >
      {children}
    </button>
  );
}
