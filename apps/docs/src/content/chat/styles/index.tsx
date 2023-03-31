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

export const ChatTextarea = styled("textarea", {
  name: "MuiChatTextarea",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root,
})<{ theme?: any }>(() => [
  {
    position: "relative",
    resize: "none",
    fontSize: "1.1rem",
    padding: "1rem 2rem 1rem 2rem",
    width: "75vw",
    borderRadius: "0.5rem",
    border: "1px solid #d9d9e3",
    background: "#ffffff",
    color: "#000",
    outline: "none",
    ":disabled": { opacity: 0.5 },
    ":focus": {
      outline: "none",
      borderColor: "#6b7280",
      boxShadow: "0 0 0 3px rgba(156, 163, 175, 0.5)",
    },
    "::placeholder": { color: "#6b7280" },
  },
]);

export const ChatButton = styled(Button, {
  name: "MuiChatButton",
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
      background: "#e4575726",
      borderRadius: "0.2rem",
    },
    ":disabled": {
      opacity: 0.9,
      cursor: "not-allowed",
      background: "none",
    },
  },
]);
