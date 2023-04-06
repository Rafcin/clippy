import { Button } from "@mui/material";
import { styled } from "@mui/system";
import InputBase from "@mui/material/InputBase";

export const ChatContainer = styled("div", {
  name: "MuiChatContainer",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root,
})<{ theme?: any }>(({ theme }) => [
  {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
    padding: "12px 26px 24px",
    background: theme?.vars.palette.background?.backgroundContrast,
    borderRadius: "28px",
    height: "100%",
    "::-webkit-scrollbar": {
      display: "none",
    },
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
    borderRadius: "21px",
    //border: `1px solid ${theme?.vars.palette.inputs.inputBorder}`,
    //boxShadow: `0 0 0 1.2px ${theme?.vars.palette.inputs.inputBorder}`,
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

export const ChatForm = styled("form", {
  name: "MuiChatForm",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root,
})<{ theme?: any }>(({ theme }) => [
  {
    borderRadius: "30px",
    background: theme?.vars.palette.inputs.inputBackground,
    color: theme?.vars.palette.text.primary,
    border: `1px solid ${theme?.vars.palette.inputs.inputBorder}`,

    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: "1.5rem",
    letterSpacing: "normal",

    display: "flex",
    alignItems: "center",

    width: "100%",
    padding: "0.4rem 1.2rem 0.4rem 1.2rem",

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

export const ChatTextarea = styled(InputBase, {
  name: "MuiChatTextarea",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root,
})<{ theme?: any }>(({ theme }) => [
  {
    flex: "1 1 0%",
    display: "inline-flex",
    alignItems: "center",
    position: "relative",
  },
]);

export const ChatButton = styled(Button, {
  name: "MuiChatButton",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root,
})<{ theme?: any }>(({ theme }) => [
  {
    width: "44px",
    minWidth: "44px",
    height: "44px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 auto",
    overflow: "visible",
    color: theme?.vars.palette.text.contrastText,
    background: theme?.vars.palette.text.primary,
    padding: "0.75rem",
    border: "none",
    borderRadius: "50%",
    margin: 0,
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

export const ChatMessage = styled("div", {
  name: "MuiChatMessage",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root,
})<{ theme?: any }>(({ theme }) => [
  {
    borderRadius: "15px",
    background: theme?.vars.palette.inputs.inputBackground,
    color: theme?.vars.palette.text.primary,
    display: "flex",
    width: "100%",
    padding: "1.5rem",
    marginBottom: "15px",
  },
]);
