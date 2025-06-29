"use client"

interface ButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    text: string;
    textSize: string;
    color: string;
};

const Button = ({ onClick, text, textSize, color }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`${textSize} ${color} px-3 py-2 border-2 border-neutral-500 rounded-primary`}>{text}</button>
  )
}

export default Button
