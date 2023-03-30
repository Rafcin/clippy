import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you
import ReactMarkdown from "react-markdown";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { code } from "@/styles/code";
import { Box, Button } from "@mui/material";
import { FiCopy } from "react-icons/fi";

const getMarkdownSyntaxIdentifier = (className: any) => {
  const match = /language-(\w+)/.exec(className || "");
  return match ? match[1] : null;
};

interface MarkdownProps extends ReactMarkdownOptions {}

const CopyButton: React.FC<{ text: any }> = ({ text }) => {
  return (
    <Button
      startIcon={
        <Box component={FiCopy} sx={{ width: "15px", height: "15px" }} />
      }
      sx={{
        fontSize: "0.7rem",
        padding: "1px",
      }}
      onClick={() =>
        navigator.clipboard.writeText(String(text).replace(/\n$/, ""))
      }
    >
      Copy code
    </Button>
  );
};

const Markdown: React.FC<MarkdownProps> = ({ children }) => {
  return (
    <div>
      <ReactMarkdown
        children={children}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return (
              <Box>
                {!inline && match ? (
                  <Box
                    sx={{
                      borderRadius: "0.45rem",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={(theme: any) => ({
                        position: "relative",
                        paddingBottom: "0.2rem",
                        paddingTop: "0.2rem",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        fontSize: "0.75rem",
                        lineHeight: "1rem",
                        backgroundColor:
                          theme?.vars.palette.background?.contrastBackground,
                        color: theme?.vars.palette.text?.contrastText,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      })}
                    >
                      {getMarkdownSyntaxIdentifier(match)}
                      <CopyButton text={children} />
                    </Box>

                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, "")}
                      // @ts-ignore
                      style={code}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      borderRadius: "0.45rem",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={(theme: any) => ({
                        position: "relative",
                        paddingBottom: "0.2rem",
                        paddingTop: "0.2rem",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        fontSize: "0.75rem",
                        lineHeight: "1rem",
                        backgroundColor:
                          theme?.vars.palette.background?.contrastBackground,
                        color: theme?.vars.palette.text?.contrastText,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "right",
                      })}
                    >
                      {getMarkdownSyntaxIdentifier(match)}
                      <CopyButton text={children} />
                    </Box>
                    <Box
                      component="code"
                      className={className}
                      {...props}
                      sx={{
                        display: "block",
                        overflowX: "auto",
                        padding: "0.7em",
                        background: "black",
                        color: "white",
                      }}
                    >
                      {children}
                    </Box>
                  </Box>
                )}
              </Box>
            );
          },
        }}
      />
    </div>
  );
};

export default Markdown;
