import "katex/dist/katex.min.css";
import ReactMarkdown from "react-markdown";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { Box, Button } from "@mui/material";
import { FiCopy } from "react-icons/fi";
import { code } from "@/styles/markdown";

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
              <Box
                component="code"
                sx={{
                  marginBottom: "10px",
                }}
              >
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
                      //@ts-ignore
                      style={code}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  </Box>
                ) : (
                  <Box
                    component="span"
                    sx={{
                      borderRadius: "0.45rem",
                      overflowX: "auto",
                      padding: "0.3em",
                      paddingLeft: "0.5em",
                      paddingRight: "0.5em",
                      background: "black",
                      color: "white",
                      fontSize: "0.8rem",
                    }}
                  >
                    {children}
                  </Box>
                )}
              </Box>
            );
          },
          p({ node, className, children, ...props }) {
            return (
              <Box component="p" sx={{ margin: 0 }}>
                {children}
              </Box>
            );
          },
        }}
      />
    </div>
  );
};

export default Markdown;
