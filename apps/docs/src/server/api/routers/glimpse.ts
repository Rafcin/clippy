import { getBaseUrl } from "@/utils/api";
import axios from "axios";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const glimpseRouter = createTRPCRouter({
  web: publicProcedure
    .input(
      z.object({ urls: z.array(z.string()), debug: z.boolean().optional() })
    )
    .mutation(async ({ input }) => {
      return await axios
        .post(
          `${getBaseUrl()}/api/glimpse/web`,
          { urls: input.urls, debug: input.debug },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res.data);
    }),
});
