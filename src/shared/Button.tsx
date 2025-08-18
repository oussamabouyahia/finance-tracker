interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = {
    primary:
      "rounded col-span-2 font-medium transition bg-blue-600 text-white px-4 py-2",
    secondary:
      " rounded col-span-2 font-medium transition bg-gray-200 text-black px-4 py-2",
  };

  return (
    <button className={classes[variant]} {...props}>
      {children}
    </button>
  );
}
