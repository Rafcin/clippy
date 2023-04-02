import { default as ChatUI } from "@/content/chat";
import { getServerAuthSession } from "@/server/auth";
import { Box } from "@mui/material";
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

const Chat: React.FC<
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
      <ChatUI />
    </Box>
  );
};

export default Chat;
