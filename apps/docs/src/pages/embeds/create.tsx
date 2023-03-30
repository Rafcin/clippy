import { api } from "@/trpc/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextareaAutosize, useTheme } from "@mui/material";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const getStaticProps: GetStaticProps<{}> = async ({}) => {
  return {
    props: {},
  };
};

const Create: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({}) => {
  const theme = useTheme();
  const schema = z.object({
    urls: z.string(),
  });

  const { register, handleSubmit } = useForm({
    defaultValues: {
      urls: "",
    },
    resolver: zodResolver(schema),
  });

  const create = api.embeds.create.useMutation();
  const onSubmit = async (data: { urls: string }) => {
    create.mutate({ urls: data.urls.split("\n") });
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextareaAutosize
          id="embeds-input-field"
          placeholder="Enter URLs here"
          {...register("urls")}
        />
        <Button type="submit" disabled={create.isLoading}>
          Generate Embeddings
        </Button>
      </form>
    </Box>
  );
};

export default Create;
