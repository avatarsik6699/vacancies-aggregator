import { $Button, I$Button } from "./button.styled";
import { HTMLMotionProps } from "framer-motion";
import React from "react";

type IDefaultButtonProps = HTMLMotionProps<"button">;

interface IProps extends Omit<IDefaultButtonProps, "className" | "color">, I$Button {
  text?: React.ReactNode;
}

const button: React.FC<IProps> = ({ text = "default", ...props }) => {
  return <$Button {...props}>{text}</$Button>;
};

export default button;
