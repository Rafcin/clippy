import Scraper from "@/content/scraper";
import { Box } from "@mui/material";
import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps<{}> = async ({}) => {
  return {
    props: {},
  };
};

const Scrape: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({}) => {
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
      <Scraper />
    </Box>
  );
};

export default Scrape;
