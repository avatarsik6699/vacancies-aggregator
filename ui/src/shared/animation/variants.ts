export const animationVariants = {
  close: {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotate: "20deg",
      x: 200,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      x: 0,
      transition: { duration: 1.5 },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      rotate: "-20deg",
      x: -200,
      transition: { duration: 1 },
    },
  },
};
