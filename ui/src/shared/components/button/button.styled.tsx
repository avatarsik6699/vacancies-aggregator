import { colors } from "@shared/styles/$theme";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

export interface I$Button {
  color: "red" | "purple" | "yellow";
}

export const $Button = styled(motion.button)<I$Button>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  width: 120px;
  height: 50px;

  outline: none;
  border: none;
  border-radius: 1rem;
  text-transform: uppercase;
  background: ${({ color }) => colors[`--${color}`].calc()};
  color: var(--color-white);
  box-shadow: 0px 6px 0px ${({ color }) => colors[`--${color}`].calc(70)};

  font-size: 20px;

  cursor: pointer;

  transition: box-shadow 300ms ease, transform 300ms ease;

  :hover {
    transform: translateY(2px);
    box-shadow: 0px 4px 0px ${({ color }) => colors[`--${color}`].calc(70)};
  }

  :active {
    transform: translateY(4px);
    box-shadow: 0px 2px 0px ${({ color }) => colors[`--${color}`].calc(70)};
  }
`;
