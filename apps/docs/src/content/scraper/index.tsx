import { api } from "@/trpc/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UrlPreview } from "../preview";
import { ScraperContainer, ScraperMain, ScraperTextarea } from "./styles";

interface PreviewData {
  screenshot: string;
  websiteName: string;
  websiteUrl: string;
  websiteHostname: string;
  websitePathname: string;
  insights: string;
}

interface UrlPreviewData {
  urlInput: string;
}

const urlSchema = z.object({
  urlInput: z.string().url("Please enter a valid URL"),
});

export default function Scraper() {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    setValue("urlInput", "");

    // Split the input string by spaces and store it in an array
    const urls = urlInput.split(" ").filter((url) => url.trim());

    try {
      console.log("Urls", urls);
      const response = await glimpse.mutateAsync({ urls: urls });
      setPreviewData(response);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
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
                  disabled={loading}
                  autoFocus={false}
                  rows={1}
                  maxLength={512}
                  id="urlInput"
                  placeholder={
                    loading ? "Fetching preview..." : "Enter URL to preview..."
                  }
                  {...register("urlInput")}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Preview"}
                </Button>
              </Box>
            </Box>
          </Box>
          {previewData && (
            <Box sx={{ width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <h3>{previewData.websiteName}</h3>
                <p>{previewData.websiteUrl}</p>
                <img
                  src={`data:image/png;base64,${previewData.screenshot}`}
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
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                {previewData && <UrlPreview previewData={previewData} />}
              </Box>
            </Box>
          )}
        </ScraperMain>
      </ScraperContainer>
    </Box>
  );
}
