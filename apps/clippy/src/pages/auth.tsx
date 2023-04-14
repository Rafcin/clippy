import { Sign } from "@/content/controls/sign";
import { Box, Container } from "@mui/material";

const Auth = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Sign provider="discord" />
      </Box>
    </Container>
  );
};

export default Auth;
