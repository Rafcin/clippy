import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const ChatContainer = styled("div", {
  name: "MuiChatContainer",
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

export const ChatMain = styled("main", {
  name: "MuiChatMain",
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

export const ChatBody = styled("div", {
  name: "MuiChatBody",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root,
})<{ theme?: any }>(({ theme }) => [
  {
    width: "100%",
    height: "100%",
    borderRadius: "2rem",
    //border: `1px solid ${theme?.vars.palette.inputs.inputBorder}`,
    boxShadow: `0 0 0 1.2px ${theme?.vars.palette.inputs.inputBorder}`,
    background: "transparent",
    color: theme?.vars.palette.text.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflowY: "scroll",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
]);

export const ChatTextarea = styled("textarea", {
  name: "MuiChatTextarea",
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

export const ChatButton = styled(Button, {
  name: "MuiChatButton",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root,
})<{ theme?: any }>(({ theme }) => [
  {
    position: "absolute",
    top: "0.4rem",
    right: "1rem",
    color: theme?.vars.palette.text.contrastText,
    background: theme?.vars.palette.text.primary,
    padding: "0.72rem",
    border: "none",
    display: "flex",
    borderRadius: "25px",
    ":hover": {
      color: theme?.vars.palette.text.contrastText,
      background: theme?.vars.palette.text.primary,
    },
    ":disabled": {
      opacity: 0.9,
      cursor: "not-allowed",
      background: "none",
    },
  },
]);
