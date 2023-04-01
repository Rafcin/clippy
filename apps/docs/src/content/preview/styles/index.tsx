import { styled } from "@mui/system";

export const UrlPreviewContainer = styled("div", {
  name: "MuiUrlPreviewContainer",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root,
})<{ theme?: any }>(() => [
  {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2rem",
    width: "100%",
  },
]);
