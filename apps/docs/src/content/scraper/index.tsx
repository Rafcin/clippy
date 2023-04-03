import { api } from "@/trpc/api";
import { removeDuplicateUrls } from "@/utils/scraper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { Error, Loading } from "@oxygen/design-system";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UrlPreview } from "../preview";
import { ScraperContainer, ScraperMain, ScraperTextarea } from "./styles";

interface PreviewData {
  previewData: {
    metadata: {
      screenshot: string;
      url: string;
    };
    pageContent?: any;
  };
}

interface UrlPreviewData {
  urlInput: string;
}

const urlSchema = z.object({
  urlInput: z.string().url("Please enter a valid URL"),
});

export default function Scraper() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UrlPreviewData>({
    resolver: zodResolver(urlSchema),
  });

  // TRPC mutation
  const glimpse = api.glimpse.web.useMutation();

  async function onSubmit(data: UrlPreviewData) {
    const { urlInput } = data;
    if (!urlInput) {
      alert("Please input a URL");
      return;
    }
    // Clear the input field
    setValue("urlInput", "");
    // Split the input string by spaces and store it in an array
    const urls = urlInput.split(" ").filter((url) => url.trim());
    await glimpse.mutateAsync({ urls: urls, debug: true });
  }

  return (
    <Box>
      <ScraperContainer>
        <ScraperMain>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              padding: "2rem 0",
              flexDirection: "column",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <ScraperTextarea
                  disabled={glimpse.isLoading}
                  autoFocus={false}
                  rows={1}
                  maxLength={512}
                  id="urlInput"
                  placeholder={
                    glimpse.isLoading
                      ? "Fetching preview..."
                      : "Enter URL to preview..."
                  }
                  {...register("urlInput")}
                />
                {glimpse.isLoading ? (
                  <Loading />
                ) : (
                  <Button type="submit" disabled={glimpse.isLoading}>
                    {glimpse.isLoading ? "Loading..." : "Preview"}
                  </Button>
                )}
                {glimpse.isError && (
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Error name="Error" error={glimpse.error.message} />
                  </Box>
                )}
                {glimpse.isSuccess &&
                  Array.isArray(glimpse.data?.metadata) &&
                  glimpse.data?.metadata.map(
                    (data: {
                      description: string;
                      image: string;
                      title: string;
                      url: string;
                    }) => (
                      <Box sx={{ width: "100%" }}>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <h3>{data.title}</h3>
                          <p>{data.url}</p>
                          <img
                            src={data.image}
                            alt="Screenshot"
                            style={{
                              marginRight: "1rem",
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          {data && <UrlPreview url={data.url} />}
                        </Box>
                      </Box>
                    )
                  )}
              </Box>
            </Box>
          </Box>
        </ScraperMain>
      </ScraperContainer>
    </Box>
  );
}
