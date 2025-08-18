interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode | string;
}

export function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = {
    primary: "bg-blue-600 text-white px-4 py-2",
    secondary: "bg-gray-200 text-black px-4 py-2",
  };

  return (
    <button className={classes[variant]} {...props}>
      {children}
    </button>
  );
}
