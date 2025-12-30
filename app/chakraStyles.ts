export const ButtonStyles = {
  variants: {
    editor: {
      height: "24px",
      width: "24px",
      border: "none",
      borderRadius: "0px",
      _hover: { bg: "gray.100" },
      _active: { bg: "gray.200" },
      minWidth: "24px",
      minHeight: "24px",
    },
  },
};

export const ProgressStyles = {
  variants: {
    low: {
      filledTrack: {
        bg: "linear-gradient(90deg,#69503f 0,#99755c)",
      },
    },
    medium: {
      filledTrack: {
        bg: "linear-gradient(90deg,#7b3f00 0,#c76700)",
      },
    },
    full: {
      filledTrack: {
        bg: "linear-gradient(90deg,#0d4a00 0,#1b9601)",
      },
    },
  },
};
