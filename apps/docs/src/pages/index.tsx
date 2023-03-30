import { api } from "@/trpc/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you
import Markdown from "@/content/markdown";

export const getStaticProps: GetStaticProps<{}> = async ({}) => {
  return {
    props: {},
  };
};

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({}) => {
  const theme = useTheme();
  const schema = z.object({
    query: z.string(),
  });

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      query: "",
    },
    resolver: zodResolver(schema),
  });

  const query = api.clippy.query.useMutation();
  const onSubmit = async (data: { query: string }) => {
    query.mutate({ query: data.query });
    setValue("query", "");
  };

  return (
    <Box
      sx={(theme: any) => ({
        marginTop: "30px",
        marginBottom: "80px",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "20px",
        paddingRight: "20px",
        [theme.breakpoints.up("lg")]: {
          paddingLeft: "80px",
          paddingRight: "80px",
        },
        [theme.breakpoints.up("md")]: {
          paddingLeft: "40px",
          paddingRight: "40px",
        },
        [theme.breakpoints.up("sm")]: {
          paddingLeft: "20px",
          paddingRight: "20px",
        },
      })}
    >
      <div>
        <Markdown children={query.data || ""} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="embeds-input-field"
          placeholder="Ask your question here"
          {...register("query")}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" disabled={query.isLoading}>
          Ask
        </Button>
      </form>
    </Box>
  );
};

export default Home;
