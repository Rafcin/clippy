export const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2rem",
  },
  header: {
    width: "auto",
  },
  "header p": {
    textAlign: "center",
  },
  cloudform: {
    position: "relative",
  },
  textarea: {
    position: "relative",
    resize: "none",
    fontSize: "11rem",
    padding: "1rem 2rem 1rem 2rem",
    width: "75vw",
    borderRadius: "05rem",
    border: "1px solid #d9d9e3",
    background: "#ffffff",
    color: "#000",
    outline: "none",
  },
  "textarea:disabled": {
    opacity: "05",
  },
  "textarea:focus": {
    outline: "none",
    borderColor: "#6b7280",
    boxShadow: "0 0 0 3px rgba(156, 163, 175, 05)",
  },
  "textarea::placeholder": {
    color: "#6b7280",
  },
  generatebutton: {
    position: "absolute",
    top: "087rem",
    right: "1rem",
    color: "rgb(165, 162, 162)",
    background: "none",
    padding: "03rem",
    border: "none",
    display: "flex",
  },
  loadingwheel: {
    position: "absolute",
    top: "02rem",
    right: "025rem",
  },
  svgicon: {
    transform: "rotate(90deg)",
    width: "12em",
    height: "12em",
    fill: "currentColor",
  },
  "generatebutton:hover": {
    background: "#e4575726",
    borderRadius: "02rem",
  },
  "generatebutton:disabled": {
    opacity: "09",
    cursor: "not-allowed",
    background: "none",
  },
  messagelist: {
    width: "100%",
    height: "100%",
    overflowY: "scroll",
    borderRadius: "05rem",
  },
  messagelistloading: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    marginTop: "1rem",
  },
  usermessage: {
    background: "#ffffff",
    padding: "15rem",
    color: "#000",
  },
  usermessagewaiting: {
    padding: "15rem",
    color: "#000",
    background: "linear-gradient(to left, #07080938, #1a1c2024, #07080936)",
    backgroundSize: "200% 200%",
    backgroundPosition: "-100% 0",
    animation: "loading-gradient 2s ease-in-out infinite",
    animationDirection: "alternate",
    animationName: "loading-gradient",
  },
  "@keyframes loading-gradient": {
    "0%": {
      backgroundPosition: "-100% 0",
    },
    "100%": {
      backgroundPosition: "100% 0",
    },
  },
  apimessage: {
    background: "#f9fafb",
    padding: "15rem",
    color: "#000",
    animation: "fadein 05s",
  },
  "@keyframes fadein": {
    from: {
      opacity: "0",
    },
    to: {
      opacity: "1",
    },
  },
  "apimessage, usermessage, usermessagewaiting": {
    display: "flex",
  },
  markdownanswer: {
    lineHeight: "175",
  },
  "markdownanswer a:hover": {
    opacity: "08",
  },
  "markdownanswer a": {
    color: "#b13a3a",
    fontWeight: "500",
  },
  "markdownanswer code": {
    color: "#15cb19",
    fontWeight: "500",
    whiteSpace: "pre-wrap !important",
  },
  "markdownanswer ol, markdownanswer ul": {
    margin: "1rem",
  },
  "boticon, usericon": {
    marginRight: "1rem",
    borderRadius: "01rem",
    height: "100%",
  },
  "markdownanswer h1, markdownanswer h2, markdownanswer h3": {
    fontSize: "inherit",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "2rem 0",
    flexDirection: "column",
  },
  cloud: {
    width: "75vw",
    height: "65vh",
    background: "#ffffff",
    borderRadius: "05rem",
    border: "1px solid #d9d9e3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pointsnormal: {
    width: "90%",
    height: "90%",
  },
  pointsdim: {
    width: "90%",
    height: "90%",
    opacity: "025",
  },
  footer: {
    color: "#5f6368",
    fontSize: "08rem",
    margin: "15rem",
  },
  "footer a": {
    fontWeight: "500",
    color: "#7a7d81",
  },
  "footer a:hover": {
    opacity: "08",
  },
  "@media (max-width: 600px)": {
    main: {
      padding: "1rem",
      maxHeight: "90vh",
    },
    cloud: {
      width: "22rem",
      height: "28rem",
    },
    textarea: {
      width: "22rem",
    },
    topnav: {
      border: "1px solid black",
      alignItems: "center",
      padding: "085rem 075rem 085rem 075rem",
    },
    navlogo: {
      fontSize: "125rem",
      width: "20rem",
    },
    "markdownanswer code": {
      whiteSpace: "pre-wrap !important",
    },
    footer: {
      fontSize: "07rem",
      width: "100%",
      textAlign: "center",
    },
  },
};
