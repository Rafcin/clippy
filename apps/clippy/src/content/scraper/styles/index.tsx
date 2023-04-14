import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const ScraperContainer = styled("div", {
  name: "MuiScraperContainer",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root,
})<{ theme?: any }>(() => [
  {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2rem",
  },
]);

export const ScraperMain = styled("main", {
  name: "MuiScraperMain",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root,
})<{ theme?: any }>(() => [
  {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
    marginBottom: "1rem",
    width: "100%",
  },
]);

export const ScraperBody = styled("div", {
  name: "MuiScraperBody",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root,
})<{ theme?: any }>(() => [
  {
    width: "100%",
    height: "100%",
    background: "#ffffff",
    borderRadius: "0.5rem",
    border: "1px solid #d9d9e3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflowY: "scroll",
  },
]);

export const ScraperTextarea = styled("textarea", {
  name: "MuiScraperTextarea",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root,
})<{ theme?: any }>(({ theme }) => [
  {
    position: "relative",
    resize: "none",
    fontSize: "1.1rem",
    padding: "1rem 2rem 1rem 2rem",
    width: "75vw",
    borderRadius: "25px",
    border: `1px solid ${theme?.vars.palette.inputs.inputBorder}`,
    background: "transparent",
    color: theme?.vars.palette.text.primary,
    outline: "none",
    ":disabled": { opacity: 0.5 },
    ":focus": {
      outline: "none",
      borderColor: theme?.vars.palette.inputs.inputFocusedBorder,
      boxShadow: `0 0 0 1.2px ${theme?.vars.palette.inputs.inputFocusedBorder}`,
    },
    ":invalid": { borderColor: theme?.vars.palette.error.main },
    "::placeholder": { color: theme?.vars.palette.text.primary },
  },
]);

export const ScraperButton = styled(Button, {
  name: "MuiScraperButton",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root,
})<{ theme?: any }>(() => [
  {
    position: "absolute",
    top: "0.87rem",
    right: "1rem",
    color: "rgb(165, 162, 162)",
    background: "none",
    padding: "0.3rem",
    border: "none",
    display: "flex",
    ":hover": {
      borderRadius: "0.2rem",
    },
    ":disabled": {
      opacity: 0.9,
      cursor: "not-allowed",
      background: "none",
    },
  },
]);
