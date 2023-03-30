import { getInitColorSchemeScript } from "@mui/material/styles";
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class NextDocument extends Document<any> {
  render() {
    return (
      <Html lang="en" style={{}}>
        <Head></Head>
        <body>
          {getInitColorSchemeScript()}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
