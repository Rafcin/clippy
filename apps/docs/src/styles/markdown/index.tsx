export const code = {
  hljs: {
    display: "block",
    overflowX: "auto",
    padding: "0.8em",
    background: "black",
    color: "white",
  },
  'hljs-code[class="language-plaintext"]': {
    whiteSpace: "pre-line",
  },
  'hljs, hljs-code[class*="language-"], pre[class*="language-"]': {
    wordWrap: "normal",
    background: "none",
    color: "#fff",
    webkitHyphens: "none",
    hyphens: "none",
    lineHeight: "1.5",
    tabSize: "4",
    textAlign: "left",
    whiteSpace: "pre",
    wordBreak: "normal",
    wordSpacing: "normal",
  },
  'pre[class*="language-"]': {
    borderRadius: "0.3em",
    overflow: "auto",
  },
  ':not(pre) > hljs, :not(pre) > code[class*="language-"]': {
    borderRadius: "0.3em",
    padding: "0.1em",
    whiteSpace: "normal",
  },
  "hljs-comment": {
    color: "hsla(0, 0%, 100%, 0.5)",
  },
  "hljs-meta": {
    color: "hsla(0, 0%, 100%, 0.6)",
  },
  "hljs-built_in": {
    color: "#e9950c",
  },
  "hljs-class hljs-title": {
    color: "#e9950c",
  },
  "hljs-doctag": {
    color: "#2e95d3",
  },
  "hljs-formula": {
    color: "#2e95d3",
  },
  "hljs-keyword": {
    color: "#2e95d3",
  },
  "hljs-literal": {
    color: "#2e95d3",
  },
  "hljs-addition": {
    color: "#00a67d",
  },
  "hljs-attribute": {
    color: "#00a67d",
  },
  "hljs-meta-string": {
    color: "#00a67d",
  },
  "hljs-regexp": {
    color: "#00a67d",
  },
  "hljs-string": {
    color: "#00a67d",
  },
  "hljs-attr": {
    color: "#df3079",
  },
  "hljs-number": {
    color: "#df3079",
  },
  "hljs-selector-attr": {
    color: "#df3079",
  },
  "hljs-selector-class": {
    color: "#df3079",
  },
  "hljs-selector-pseudo": {
    color: "#df3079",
  },
  "hljs-template-variable": {
    color: "#df3079",
  },
  "hljs-type": {
    color: "#df3079",
  },
  "hljs-variable": {
    color: "#df3079",
  },
  "hljs-bullet": {
    color: "#f22c3d",
  },
  "hljs-link": {
    color: "#f22c3d",
  },
  "hljs-selector-id": {
    color: "#f22c3d",
  },
  "hljs-symbol": {
    color: "#f22c3d",
  },
  "hljs-title": {
    color: "#f22c3d",
  },
  ".token.cdata, .token.comment, .token.doctype, .token.prolog": {
    color: "#a9aec1",
  },
  ".token.punctuation": {
    color: "#fefefe",
  },
  ".token.constant, .token.deleted, .token.property, .token.symbol, .token.tag":
    {
      color: "#ffa07a",
    },
  ".token.boolean, .token.number": {
    color: "#00e0e0",
  },
  ".token.attr-name, .token.builtin, .token.char, .token.inserted, .token.selector, .token.string":
    {
      color: "#abe338",
    },
  ".language-css .token.string, .style .token.string, .token.entity, .token.operator, .token.url, .token.variable":
    {
      color: "#00e0e0",
    },
  ".token.atrule, .token.attr-value, .token.function": {
    color: "gold",
  },
  ".token.keyword": {
    color: "#00e0e0",
  },
  ".token.important, .token.regex": {
    color: "gold",
  },
  ".token.bold, .token.important": {
    fontWeight: "700",
  },
  ".token.italic": {
    fontStyle: "italic",
  },
  ".token.entity": {
    cursor: "help",
  },
  "@media screen and (-ms-high-contrast: active)": {
    'code[class*="language-"], pre[class*="language-"]': {
      background: "window",
      color: "windowText",
    },
    ':not(pre) > code[class*="language-"], pre[class*="language-"]': {
      background: "window",
    },
    ".token.important": {
      background: "highlight",
      color: "window",
      fontWeight: "400",
    },
    ".token.atrule, .token.attr-value, .token.function, .token.keyword, .token.operator, .token.selector":
      {
        fontWeight: "700",
      },
    ".token.attr-value, .token.comment, .token.doctype, .token.function, .token.keyword, .token.operator, .token.property, .token.string":
      {
        color: "highlight",
      },
    ".token.attr-value, .token.url": {
      fontWeight: "400",
    },
  },
  "@font-face": {
    fontFamily: "KaTeX_Typewriter",
    fontStyle: "normal",
    fontWeight: "400",
    src: 'url(/_next/static/media/KaTeX_Typewriter-Regular.6258592b.woff) format("woff")',
  },
  ".katex": {
    font: "normal 1.21em KaTeX_Main, Times New Roman, serif",
    lineHeight: "1.2",
    textIndent: "0",
    textRendering: "auto",
  },
  ".katex *": {
    msHighContrastAdjust: "none !important",
    borderColor: "currentcolor",
  },
  ".katex .katex-version:after": {
    content: '"0.16.0"',
  },
  ".katex .katex-mathml": {
    clip: "rect(1px, 1px, 1px, 1px)",
    border: "0",
    height: "1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px",
  },
  ".katex .katex-html > .newline": {
    display: "block",
  },
  ".katex .base": {
    position: "relative",
    whiteSpace: "nowrap",
    width: "min-content",
    fallbacks: [
      {
        width: "-webkit-min-content",
      },
    ],
  },
  ".katex .base, .katex .strut": {
    display: "inline-block",
  },
  ".katex .textbf": {
    fontWeight: "700",
  },
  ".katex .textit": {
    fontStyle: "italic",
  },
  ".katex .textrm": {
    fontFamily: "KaTeX_Main",
  },
  ".katex .textsf": {
    fontFamily: '"KaTeX_SansSerif"',
  },
  ".katex .texttt": {
    fontFamily: "KaTeX_Typewriter",
  },
  ".katex .mathnormal": {
    fontFamily: "KaTeX_Math",
    fontStyle: "italic",
  },
  ".katex .mathit": {
    fontFamily: "KaTeX_Main",
    fontStyle: "italic",
  },
  ".katex .mathrm": {
    fontStyle: "normal",
  },
  ".katex .mathbf": {
    fontFamily: "KaTeX_Main",
    fontWeight: "700",
  },
  ".katex .boldsymbol": {
    fontFamily: "KaTeX_Math",
    fontStyle: "italic",
    fontWeight: "700",
  },
  ".katex .amsrm, .katex .mathbb, .katex .textbb": {
    fontFamily: "KaTeX_AMS",
  },
  ".katex .mathcal": {
    fontFamily: "KaTeX_Caligraphic",
  },
  ".katex .mathfrak, .katex .textfrak": {
    fontFamily: "KaTeX_Fraktur",
  },
  ".katex .mathtt": {
    fontFamily: "KaTeX_Typewriter",
  },
  ".katex .mathscr, .katex .textscr": {
    fontFamily: "KaTeX_Script",
  },
  ".katex .mathsf, .katex .textsf": {
    fontFamily: '"KaTeX_SansSerif"',
  },
  ".katex .mathboldsf, .katex .textboldsf": {
    fontFamily: '"KaTeX_SansSerif"',
    fontWeight: "700",
  },
  ".katex .mathitsf, .katex .textitsf": {
    fontFamily: '"KaTeX_SansSerif"',
    fontStyle: "italic",
  },
  ".katex .mainrm": {
    fontFamily: "KaTeX_Main",
    fontStyle: "normal",
  },
  ".katex .vlist-t": {
    borderCollapse: "collapse",
    display: "inline-table",
    tableLayout: "fixed",
  },
  ".katex .vlist-r": {
    display: "table-row",
  },
  ".katex .vlist": {
    display: "table-cell",
    position: "relative",
    verticalAlign: "bottom",
  },
  ".katex .vlist > span": {
    display: "block",
    height: "0",
    position: "relative",
  },
  ".katex .vlist > span > span": {
    display: "inline-block",
  },
  ".katex .vlist > span > .pstrut": {
    overflow: "hidden",
    width: "0",
  },
  ".katex .vlist-t2": {
    marginRight: "-2px",
  },
  ".katex .vlist-s": {
    display: "table-cell",
    fontSize: "1px",
    minWidth: "2px",
    verticalAlign: "bottom",
    width: "2px",
  },
  ".katex .vbox": {
    alignItems: "baseline",
    display: "inline-flex",
    flexDirection: "column",
  },
  ".katex .hbox": {
    width: "100%",
  },
  ".katex .hbox, .katex .thinbox": {
    display: "inline-flex",
    flexDirection: "row",
  },
  ".katex .thinbox": {
    maxWidth: "0",
    width: "0",
  },
  ".katex .msupsub": {
    textAlign: "left",
  },
  ".katex .mfrac > span > span": {
    textAlign: "center",
  },
  ".katex .mfrac .frac-line": {
    borderBottomStyle: "solid",
    display: "inline-block",
    width: "100%",
  },
  ".katex .hdashline, .katex .hline, .katex .mfrac .frac-line, .katex .overline .overline-line, .katex .rule, .katex .underline .underline-line":
    {
      minHeight: "1px",
    },
  ".katex .mspace": {
    display: "inline-block",
  },
  ".katex .clap, .katex .llap, .katex .rlap": {
    position: "relative",
    width: "0",
  },
  ".katex .clap > .inner, .katex .llap > .inner, .katex .rlap > .inner": {
    position: "absolute",
  },
  ".katex .clap > .fix, .katex .llap > .fix, .katex .rlap > .fix": {
    display: "inline-block",
  },
  ".katex .llap > .inner": {
    right: "0",
  },
  ".katex .clap > .inner, .katex .rlap > .inner": {
    left: "0",
  },
  ".katex .clap > .inner > span": {
    marginLeft: "-50%",
    marginRight: "50%",
  },
  ".katex .rule": {
    border: "0 solid",
    display: "inline-block",
    position: "relative",
  },
  ".katex .hline, .katex .overline .overline-line, .katex .underline .underline-line":
    {
      borderBottomStyle: "solid",
      display: "inline-block",
      width: "100%",
    },
  ".katex .hdashline": {
    borderBottomStyle: "dashed",
    display: "inline-block",
    width: "100%",
  },
  ".katex .sqrt > .root": {
    marginLeft: "0.27777778em",
    marginRight: "-0.55555556em",
  },
  ".katex .fontsize-ensurer.reset-size1.size1, .katex .sizing.reset-size1.size1":
    {
      fontSize: "1em",
    },
  ".katex .fontsize-ensurer.reset-size1.size2, .katex .sizing.reset-size1.size2":
    {
      fontSize: "1.2em",
    },
  ".katex .fontsize-ensurer.reset-size1.size3, .katex .sizing.reset-size1.size3":
    {
      fontSize: "1.4em",
    },
  ".katex .fontsize-ensurer.reset-size1.size4, .katex .sizing.reset-size1.size4":
    {
      fontSize: "1.6em",
    },
  ".katex .fontsize-ensurer.reset-size1.size5, .katex .sizing.reset-size1.size5":
    {
      fontSize: "1.8em",
    },
  ".katex .fontsize-ensurer.reset-size1.size6, .katex .sizing.reset-size1.size6":
    {
      fontSize: "2em",
    },
  ".katex .fontsize-ensurer.reset-size1.size7, .katex .sizing.reset-size1.size7":
    {
      fontSize: "2.4em",
    },
  ".katex .fontsize-ensurer.reset-size1.size8, .katex .sizing.reset-size1.size8":
    {
      fontSize: "2.88em",
    },
  ".katex .fontsize-ensurer.reset-size1.size9, .katex .sizing.reset-size1.size9":
    {
      fontSize: "3.456em",
    },
  ".katex .fontsize-ensurer.reset-size1.size10, .katex .sizing.reset-size1.size10":
    {
      fontSize: "4.148em",
    },
  ".katex .fontsize-ensurer.reset-size1.size11, .katex .sizing.reset-size1.size11":
    {
      fontSize: "4.976em",
    },
  ".katex .fontsize-ensurer.reset-size2.size1, .katex .sizing.reset-size2.size1":
    {
      fontSize: "0.83333333em",
    },
  ".katex .fontsize-ensurer.reset-size2.size2, .katex .sizing.reset-size2.size2":
    {
      fontSize: "1em",
    },
  ".katex .fontsize-ensurer.reset-size2.size3, .katex .sizing.reset-size2.size3":
    {
      fontSize: "1.16666667em",
    },
  ".katex .fontsize-ensurer.reset-size2.size4, .katex .sizing.reset-size2.size4":
    {
      fontSize: "1.33333333em",
    },
  ".katex .fontsize-ensurer.reset-size2.size5, .katex .sizing.reset-size2.size5":
    {
      fontSize: "1.5em",
    },
  ".katex .fontsize-ensurer.reset-size2.size6, .katex .sizing.reset-size2.size6":
    {
      fontSize: "1.66666667em",
    },
  ".katex .fontsize-ensurer.reset-size2.size7, .katex .sizing.reset-size2.size7":
    {
      fontSize: "2em",
    },
  ".katex .fontsize-ensurer.reset-size2.size8, .katex .sizing.reset-size2.size8":
    {
      fontSize: "2.4em",
    },
  ".katex .fontsize-ensurer.reset-size2.size9, .katex .sizing.reset-size2.size9":
    {
      fontSize: "2.88em",
    },
  ".katex .fontsize-ensurer.reset-size2.size10, .katex .sizing.reset-size2.size10":
    {
      fontSize: "3.45666667em",
    },
  ".katex .fontsize-ensurer.reset-size2.size11, .katex .sizing.reset-size2.size11":
    {
      fontSize: "4.14666667em",
    },
  ".katex .fontsize-ensurer.reset-size3.size1, .katex .sizing.reset-size3.size1":
    {
      fontSize: "0.71428571em",
    },
  ".katex .fontsize-ensurer.reset-size3.size2, .katex .sizing.reset-size3.size2":
    {
      fontSize: "0.85714286em",
    },
  ".katex .fontsize-ensurer.reset-size3.size3, .katex .sizing.reset-size3.size3":
    {
      fontSize: "1em",
    },
  ".katex .fontsize-ensurer.reset-size3.size4, .katex .sizing.reset-size3.size4":
    {
      fontSize: "1.14285714em",
    },
  ".katex .fontsize-ensurer.reset-size3.size5, .katex .sizing.reset-size3.size5":
    {
      fontSize: "1.28571429em",
    },
  ".katex .fontsize-ensurer.reset-size3.size6, .katex .sizing.reset-size3.size6":
    {
      fontSize: "1.42857143em",
    },
  ".katex .fontsize-ensurer.reset-size3.size7, .katex .sizing.reset-size3.size7":
    {
      fontSize: "1.71428571em",
    },
  ".katex .fontsize-ensurer.reset-size3.size8, .katex .sizing.reset-size3.size8":
    {
      fontSize: "2.05714286em",
    },
  ".katex .fontsize-ensurer.reset-size3.size9, .katex .sizing.reset-size3.size9":
    {
      fontSize: "2.46857143em",
    },
  ".katex .fontsize-ensurer.reset-size3.size10, .katex .sizing.reset-size3.size10":
    {
      fontSize: "2.96285714em",
    },
  ".katex .fontsize-ensurer.reset-size3.size11, .katex .sizing.reset-size3.size11":
    {
      fontSize: "3.55428571em",
    },
  ".katex .fontsize-ensurer.reset-size4.size1, .katex .sizing.reset-size4.size1":
    {
      fontSize: "0.625em",
    },
  ".katex .fontsize-ensurer.reset-size4.size2, .katex .sizing.reset-size4.size2":
    {
      fontSize: "0.75em",
    },
  ".katex .fontsize-ensurer.reset-size4.size3, .katex .sizing.reset-size4.size3":
    {
      fontSize: "0.875em",
    },
  ".katex .fontsize-ensurer.reset-size4.size4, .katex .sizing.reset-size4.size4":
    {
      fontSize: "1em",
    },
  ".katex .fontsize-ensurer.reset-size4.size5, .katex .sizing.reset-size4.size5":
    {
      fontSize: "1.125em",
    },
  ".katex .fontsize-ensurer.reset-size4.size6, .katex .sizing.reset-size4.size6":
    {
      fontSize: "1.25em",
    },
  ".katex .fontsize-ensurer.reset-size4.size7, .katex .sizing.reset-size4.size7":
    {
      fontSize: "1.5em",
    },
  ".katex .fontsize-ensurer.reset-size4.size8, .katex .sizing.reset-size4.size8":
    {
      fontSize: "1.8em",
    },
  ".katex .fontsize-ensurer.reset-size4.size9, .katex .sizing.reset-size4.size9":
    {
      fontSize: "2.16em",
    },
  ".katex .fontsize-ensurer.reset-size4.size10, .katex .sizing.reset-size4.size10":
    {
      fontSize: "2.5925em",
    },
  ".katex .fontsize-ensurer.reset-size4.size11, .katex .sizing.reset-size4.size11":
    {
      fontSize: "3.11em",
    },
  ".katex .fontsize-ensurer.reset-size5.size1, .katex .sizing.reset-size5.size1":
    {
      fontSize: "0.55555556em",
    },
  ".katex .fontsize-ensurer.reset-size5.size2, .katex .sizing.reset-size5.size2":
    {
      fontSize: "0.66666667em",
    },
  ".katex .fontsize-ensurer.reset-size5.size3, .katex .sizing.reset-size5.size3":
    {
      fontSize: "0.77777778em",
    },
  ".katex .fontsize-ensurer.reset-size5.size4, .katex .sizing.reset-size5.size4":
    {
      fontSize: "0.88888889em",
    },
  ".katex .fontsize-ensurer.reset-size5.size5, .katex .sizing.reset-size5.size5":
    {
      fontSize: "1em",
    },
  ".katex .fontsize-ensurer.reset-size5.size6, .katex .sizing.reset-size5.size6":
    {
      fontSize: "1.11111111em",
    },
  ".katex .fontsize-ensurer.reset-size5.size7, .katex .sizing.reset-size5.size7":
    {
      fontSize: "1.33333333em",
    },
  ".katex .fontsize-ensurer.reset-size5.size8, .katex .sizing.reset-size5.size8":
    {
      fontSize: "1.6em",
    },
  ".katex .fontsize-ensurer.reset-size5.size9, .katex .sizing.reset-size5.size9":
    {
      fontSize: "1.92em",
    },
  ".katex .fontsize-ensurer.reset-size5.size10, .katex .sizing.reset-size5.size10":
    {
      fontSize: "2.30444444em",
    },
  ".katex .fontsize-ensurer.reset-size5.size11, .katex .sizing.reset-size5.size11":
    {
      fontSize: "2.76444444em",
    },
  ".katex .fontsize-ensurer.reset-size6.size1, .katex .sizing.reset-size6.size1":
    {
      fontSize: "0.5em",
    },
  ".katex .fontsize-ensurer.reset-size6.size2, .katex .sizing.reset-size6.size2":
    {
      fontSize: "0.6em",
    },
  ".katex .fontsize-ensurer.reset-size6.size3, .katex .sizing.reset-size6.size3":
    {
      fontSize: "0.7em",
    },
  ".katex .fontsize-ensurer.reset-size6.size4, .katex .sizing.reset-size6.size4":
    {
      fontSize: "0.8em",
    },
  ".katex .fontsize-ensurer.reset-size6.size5, .katex .sizing.reset-size6.size5":
    {
      fontSize: "0.9em",
    },
  ".katex .fontsize-ensurer.reset-size6.size6, .katex .sizing.reset-size6.size6":
    {
      fontSize: "1em",
    },
  ".katex .fontsize-ensurer.reset-size6.size7, .katex .sizing.reset-size6.size7":
    {
      fontSize: "1.2em",
    },
  ".katex .fontsize-ensurer.reset-size6.size8, .katex .sizing.reset-size6.size8":
    {
      fontSize: "1.44em",
    },
  ".katex .fontsize-ensurer.reset-size6.size9, .katex .sizing.reset-size6.size9":
    {
      fontSize: "1.728em",
    },
  ".katex .fontsize-ensurer.reset-size6.size10, .katex .sizing.reset-size6.size10":
    {
      fontSize: "2.074em",
    },
  ".katex .fontsize-ensurer.reset-size6.size11, .katex .sizing.reset-size6.size11":
    {
      fontSize: "2.488em",
    },
  ".katex .fontsize-ensurer.reset-size7.size1, .katex .sizing.reset-size7.size1":
    {
      fontSize: "0.41666667em",
    },
  ".katex .fontsize-ensurer.reset-size7.size2, .katex .sizing.reset-size7.size2":
    {
      fontSize: "0.5em",
    },
  ".katex .fontsize-ensurer.reset-size7.size3, .katex .sizing.reset-size7.size3":
    {
      fontSize: "0.58333333em",
    },
  ".katex .fontsize-ensurer.reset-size7.size4, .katex .sizing.reset-size7.size4":
    {
      fontSize: "0.66666667em",
    },
  ".katex .fontsize-ensurer.reset-size7.size5, .katex .sizing.reset-size7.size5":
    {
      fontSize: "0.75em",
    },
  ".katex .fontsize-ensurer.reset-size7.size6, .katex .sizing.reset-size7.size6":
    {
      fontSize: "0.83333333em",
    },
  ".katex .fontsize-ensurer.reset-size7.size7, .katex .sizing.reset-size7.size7":
    {
      fontSize: "1em",
    },
  ".katex .fontsize-ensurer.reset-size7.size8, .katex .sizing.reset-size7.size8":
    {
      fontSize: "1.2em",
    },
  ".katex .fontsize-ensurer.reset-size7.size9, .katex .sizing.reset-size7.size9":
    {
      fontSize: "1.44em",
    },
  ".katex .fontsize-ensurer.reset-size7.size10, .katex .sizing.reset-size7.size10":
    {
      fontSize: "1.72833333em",
    },
  ".katex .fontsize-ensurer.reset-size7.size11, .katex .sizing.reset-size7.size11":
    {
      fontSize: "2.07333333em",
    },
  ".katex .fontsize-ensurer.reset-size8.size1, .katex .sizing.reset-size8.size1":
    {
      fontSize: "0.34722222em",
    },
  ".katex .fontsize-ensurer.reset-size8.size2, .katex .sizing.reset-size8.size2":
    {
      fontSize: "0.41666667em",
    },
  ".katex .fontsize-ensurer.reset-size8.size3, .katex .sizing.reset-size8.size3":
    {
      fontSize: "0.48611111em",
    },
  ".katex .fontsize-ensurer.reset-size8.size4, .katex .sizing.reset-size8.size4":
    {
      fontSize: "0.55555556em",
    },
  ".katex .fontsize-ensurer.reset-size8.size5, .katex .sizing.reset-size8.size5":
    {
      fontSize: "0.625em",
    },
  ".katex .fontsize-ensurer.reset-size8.size6, .katex .sizing.reset-size8.size6":
    {
      fontSize: "0.69444444em",
    },
  ".katex .fontsize-ensurer.reset-size8.size7, .katex .sizing.reset-size8.size7":
    {
      fontSize: "0.83333333em",
    },
  ".katex .fontsize-ensurer.reset-size8.size8, .katex .sizing.reset-size8.size8":
    {
      fontSize: "1em",
    },
  ".katex .fontsize-ensurer.reset-size8.size9, .katex .sizing.reset-size8.size9":
    {
      fontSize: "1.2em",
    },
  ".katex .fontsize-ensurer.reset-size8.size10, .katex .sizing.reset-size8.size10":
    {
      fontSize: "1.44027778em",
    },
  ".katex .fontsize-ensurer.reset-size8.size11, .katex .sizing.reset-size8.size11":
    {
      fontSize: "1.72777778em",
    },
  ".katex .fontsize-ensurer.reset-size9.size1, .katex .sizing.reset-size9.size1":
    {
      fontSize: "0.28935185em",
    },
  ".katex .fontsize-ensurer.reset-size9.size2, .katex .sizing.reset-size9.size2":
    {
      fontSize: "0.34722222em",
    },
  ".katex .fontsize-ensurer.reset-size9.size3, .katex .sizing.reset-size9.size3":
    {
      fontSize: "0.40509259em",
    },
  ".katex .fontsize-ensurer.reset-size9.size4, .katex .sizing.reset-size9.size4":
    {
      fontSize: "0.46296296em",
    },
  ".katex .fontsize-ensurer.reset-size9.size5, .katex .sizing.reset-size9.size5":
    {
      fontSize: "0.52083333em",
    },
  ".katex .fontsize-ensurer.reset-size9.size6, .katex .sizing.reset-size9.size6":
    {
      fontSize: "0.5787037em",
    },
  ".katex .fontsize-ensurer.reset-size9.size7, .katex .sizing.reset-size9.size7":
    {
      fontSize: "0.69444444em",
    },
  ".katex .fontsize-ensurer.reset-size9.size8, .katex .sizing.reset-size9.size8":
    {
      fontSize: "0.83333333em",
    },
  ".katex .fontsize-ensurer.reset-size9.size9, .katex .sizing.reset-size9.size9":
    {
      fontSize: "1em",
    },
  ".katex .fontsize-ensurer.reset-size9.size10, .katex .sizing.reset-size9.size10":
    {
      fontSize: "1.20023148em",
    },
  ".katex .fontsize-ensurer.reset-size9.size11, .katex .sizing.reset-size9.size11":
    {
      fontSize: "1.43981481em",
    },
  ".katex .fontsize-ensurer.reset-size10.size1, .katex .sizing.reset-size10.size1":
    {
      fontSize: "0.24108004em",
    },
  ".katex .fontsize-ensurer.reset-size10.size2, .katex .sizing.reset-size10.size2":
    {
      fontSize: "0.28929605em",
    },
  ".katex .fontsize-ensurer.reset-size10.size3, .katex .sizing.reset-size10.size3":
    {
      fontSize: "0.33751205em",
    },
  ".katex .fontsize-ensurer.reset-size10.size4, .katex .sizing.reset-size10.size4":
    {
      fontSize: "0.38572806em",
    },
  ".katex .fontsize-ensurer.reset-size10.size5, .katex .sizing.reset-size10.size5":
    {
      fontSize: "0.43394407em",
    },
  ".katex .fontsize-ensurer.reset-size10.size6, .katex .sizing.reset-size10.size6":
    {
      fontSize: "0.48216008em",
    },
  ".katex .fontsize-ensurer.reset-size10.size7, .katex .sizing.reset-size10.size7":
    {
      fontSize: "0.57859209em",
    },
  ".katex .fontsize-ensurer.reset-size10.size8, .katex .sizing.reset-size10.size8":
    {
      fontSize: "0.69431051em",
    },
  ".katex .fontsize-ensurer.reset-size10.size9, .katex .sizing.reset-size10.size9":
    {
      fontSize: "0.83317261em",
    },
  ".katex .fontsize-ensurer.reset-size10.size10, .katex .sizing.reset-size10.size10":
    {
      fontSize: "1em",
    },
  ".katex .fontsize-ensurer.reset-size10.size11, .katex .sizing.reset-size10.size11":
    {
      fontSize: "1.19961427em",
    },
  ".katex .fontsize-ensurer.reset-size11.size1, .katex .sizing.reset-size11.size1":
    {
      fontSize: "0.20096463em",
    },
  ".katex .fontsize-ensurer.reset-size11.size2, .katex .sizing.reset-size11.size2":
    {
      fontSize: "0.24115756em",
    },
  ".katex .fontsize-ensurer.reset-size11.size3, .katex .sizing.reset-size11.size3":
    {
      fontSize: "0.28135048em",
    },
  ".katex .fontsize-ensurer.reset-size11.size4, .katex .sizing.reset-size11.size4":
    {
      fontSize: "0.32154341em",
    },
  ".katex .fontsize-ensurer.reset-size11.size5, .katex .sizing.reset-size11.size5":
    {
      fontSize: "0.36173633em",
    },
  ".katex .fontsize-ensurer.reset-size11.size6, .katex .sizing.reset-size11.size6":
    {
      fontSize: "0.40192926em",
    },
  ".katex .fontsize-ensurer.reset-size11.size7, .katex .sizing.reset-size11.size7":
    {
      fontSize: "0.48231511em",
    },
  ".katex .fontsize-ensurer.reset-size11.size8, .katex .sizing.reset-size11.size8":
    {
      fontSize: "0.57877814em",
    },
  ".katex .fontsize-ensurer.reset-size11.size9, .katex .sizing.reset-size11.size9":
    {
      fontSize: "0.69453376em",
    },
  ".katex .fontsize-ensurer.reset-size11.size10, .katex .sizing.reset-size11.size10":
    {
      fontSize: "0.83360129em",
    },
  ".katex .fontsize-ensurer.reset-size11.size11, .katex .sizing.reset-size11.size11":
    {
      fontSize: "1em",
    },
  ".katex .delimsizing.size1": {
    fontFamily: "KaTeX_Size1",
  },
  ".katex .delimsizing.size2": {
    fontFamily: "KaTeX_Size2",
  },
  ".katex .delimsizing.size3": {
    fontFamily: "KaTeX_Size3",
  },
  ".katex .delimsizing.size4": {
    fontFamily: "KaTeX_Size4",
  },
  ".katex .delimsizing.mult .delim-size1 > span": {
    fontFamily: "KaTeX_Size1",
  },
  ".katex .delimsizing.mult .delim-size4 > span": {
    fontFamily: "KaTeX_Size4",
  },
  ".katex .nulldelimiter": {
    display: "inline-block",
    width: "0.12em",
  },
  ".katex .delimcenter, .katex .op-symbol": {
    position: "relative",
  },
  ".katex .op-symbol.small-op": {
    fontFamily: "KaTeX_Size1",
  },
  ".katex .op-symbol.large-op": {
    fontFamily: "KaTeX_Size2",
  },
  ".katex .accent > .vlist-t, .katex .op-limits > .vlist-t": {
    textAlign: "center",
  },
  ".katex .accent .accent-body": {
    position: "relative",
  },
  ".katex .accent .accent-body:not(.accent-full)": {
    width: "0",
  },
  ".katex .overlay": {
    display: "block",
  },
  ".katex .mtable .vertical-separator": {
    display: "inline-block",
    minWidth: "1px",
  },
  ".katex .mtable .arraycolsep": {
    display: "inline-block",
  },
  ".katex .mtable .col-align-c > .vlist-t": {
    textAlign: "center",
  },
  ".katex .mtable .col-align-l > .vlist-t": {
    textAlign: "left",
  },
  ".katex .mtable .col-align-r > .vlist-t": {
    textAlign: "right",
  },
  ".katex .svg-align": {
    textAlign: "left",
  },
  ".katex svg": {
    fill: "currentcolor",
    stroke: "currentcolor",
    fillRule: "nonzero",
    fillOpacity: "1",
    strokeWidth: "1",
    strokeLinecap: "butt",
    strokeLinejoin: "miter",
    strokeMiterlimit: "4",
    strokeDasharray: "none",
    strokeDashoffset: "0",
    strokeOpacity: "1",
    display: "block",
    height: "inherit",
    position: "absolute",
    width: "100%",
  },
  ".katex svg path": {
    stroke: "none",
  },
  ".katex img": {
    borderStyle: "none",
    maxHeight: "none",
    maxWidth: "none",
    minHeight: "0",
    minWidth: "0",
  },
  ".katex .stretchy": {
    display: "block",
    overflow: "hidden",
    position: "relative",
    width: "100%",
  },
  ".katex .stretchy:after, .katex .stretchy:before": {
    content: '""',
  },
  ".katex .hide-tail": {
    overflow: "hidden",
    position: "relative",
    width: "100%",
  },
  ".katex .halfarrow-left": {
    left: "0",
    overflow: "hidden",
    position: "absolute",
    width: "50.2%",
  },
  ".katex .halfarrow-right": {
    overflow: "hidden",
    position: "absolute",
    right: "0",
    width: "50.2%",
  },
  ".katex .brace-left": {
    left: "0",
    overflow: "hidden",
    position: "absolute",
    width: "25.1%",
  },
  ".katex .brace-center": {
    left: "25%",
    overflow: "hidden",
    position: "absolute",
    width: "50%",
  },
  ".katex .brace-right": {
    overflow: "hidden",
    position: "absolute",
    right: "0",
    width: "25.1%",
  },
  ".katex .x-arrow-pad": {
    padding: "0 0.5em",
  },
  ".katex .cd-arrow-pad": {
    padding: "0 0.55556em 0 0.27778em",
  },
  ".katex .mover, .katex .munder, .katex .x-arrow": {
    textAlign: "center",
  },
  ".katex .boxpad": {
    padding: "0 0.3em",
  },
  ".katex .fbox, .katex .fcolorbox": {
    border: "0.04em solid",
    boxSizing: "border-box",
  },
  ".katex .cancel-pad": {
    padding: "0 0.2em",
  },
  ".katex .cancel-lap": {
    marginLeft: "-0.2em",
    marginRight: "-0.2em",
  },
  ".katex .sout": {
    borderBottomStyle: "solid",
    borderBottomWidth: "0.08em",
  },
  ".katex .angl": {
    borderRight: "0.049em solid",
    borderTop: "0.049em solid",
    boxSizing: "border-box",
    marginRight: "0.03889em",
  },
  ".katex .anglpad": {
    padding: "0 0.03889em",
  },
  ".katex .eqn-num:before": {
    content: '"(" counter(katexEqnNo) ")"',
    counterIncrement: "katexEqnNo",
  },
  ".katex .mml-eqn-num:before": {
    content: '"(" counter(mmlEqnNo) ")"',
    counterIncrement: "mmlEqnNo",
  },
  ".katex .mtr-glue": {
    width: "50%",
  },
  ".katex .cd-vert-arrow": {
    display: "inline-block",
    position: "relative",
  },
  ".katex .cd-label-left": {
    display: "inline-block",
    position: "absolute",
    right: "calc(50% + 0.3em)",
    textAlign: "left",
  },
  ".katex .cd-label-right": {
    display: "inline-block",
    left: "calc(50% + 0.3em)",
    position: "absolute",
    textAlign: "right",
  },
  ".katex-display": {
    display: "block",
    margin: "1em 0",
    textAlign: "center",
  },
  ".katex-display > .katex": {
    display: "block",
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  ".katex-display > .katex > .katex-html": {
    display: "block",
    position: "relative",
  },
  ".katex-display > .katex > .katex-html > .tag": {
    position: "absolute",
    right: "0",
  },
  ".katex-display.leqno > .katex > .katex-html > .tag": {
    left: "0",
    right: "auto",
  },
  ".katex-display.fleqn > .katex": {
    paddingLeft: "2em",
    textAlign: "left",
  },
  body: {
    counterReset: "katexEqnNo mmlEqnNo",
  },
};
