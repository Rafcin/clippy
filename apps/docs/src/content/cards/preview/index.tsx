import React from "react";
import { Box, ListItemButton } from "@mui/material";
import { default as Grid } from "@mui/material/Unstable_Grid2";
import {
  AspectRatio,
  CardContainer,
  CardContent,
  CardCover,
  SkeletonWrapper,
} from "@oxygen/design-system";
import { Glimpse, useGlimpse } from "@beskar-labs/glimpse/client";
import Image from "next/image";

const fetcher = async (url: string) => {
  const response = await fetch("/api/glimpse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
    }),
  });

  return response.json();
};

export const Preview: React.FC<any> = React.memo(
  ({
    cover,
    ar,
    direction,
    children,
    details,
    url,
    ...props
  }: {
    children?: React.ReactNode;
    cover?: React.ReactNode;
    details?: React.ReactNode;
    ar: string;
    direction: "vertical" | "horizontal";
    url: string;
  }) => {
    const carouselOrientation = direction === "vertical" ? 12 : 5;
    const bodyOrientation = direction === "vertical" ? 12 : 7;
    const data = useGlimpse(fetcher);

    if (!data?.image) {
      return null;
    }

    return (
      <span>
        <ListItemButton
          {...props}
          disableRipple={true}
          sx={{ display: "block" }}
        >
          <span>
            <Grid container spacing={0} columns={12} sx={{ padding: 0 }}>
              <Grid
                xs={12}
                sm={carouselOrientation}
                md={carouselOrientation}
                lg={carouselOrientation}
              >
                <Box
                  component="div"
                  sx={(theme: any) => ({
                    borderRadius: "12px",
                    position: "relative",
                    contain: "none",
                    overflow: "hidden",
                    WebkitMaskImage:
                      "-webkit-radial-gradient(center,white,black)",
                    "&::after": {
                      content: '" "',
                      position: "absolute",
                      inset: 0,
                      borderRadius: "inherit",
                      pointerEvents: "none",
                    },
                    transition: "transform 300ms ease-out 0s",
                    "&:hover": {
                      border: `5px solid ${theme?.vars.palette?.background?.inverse}`,
                    },
                  })}
                >
                  <AspectRatio ratio={ar}>
                    <CardContainer
                      sx={{
                        cursor: "pointer",
                        borderRadius: "0px",
                      }}
                    >
                      <CardCover>
                        <Box sx={{ width: "100%", height: "100%" }}>
                          <Glimpse>
                            <Image
                              className="m-0 h-[174px] w-full rounded-sm object-cover"
                              src={data.image}
                              width={316}
                              height={174}
                              alt=""
                              unoptimized
                            />
                          </Glimpse>
                        </Box>
                      </CardCover>
                      <CardContent sx={{ width: "100%" }}>
                        {children}
                      </CardContent>
                    </CardContainer>
                  </AspectRatio>
                </Box>
              </Grid>
              <Grid
                xs={12}
                sm={bodyOrientation}
                md={bodyOrientation}
                lg={bodyOrientation}
                sx={{ cursor: "pointer" }}
              >
                {details}
              </Grid>
            </Grid>
          </span>
        </ListItemButton>
      </span>
    );
  }
);
