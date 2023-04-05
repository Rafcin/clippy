import Scraper from "@/content/scraper";
import { getServerAuthSession } from "@/server/auth";
import { Box } from "@mui/material";
import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  // Pass data to the page via props
  return { props: { session } };
};

const Scrape: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
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
