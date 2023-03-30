import { getBaseUrl } from "@/utils/api";
import axios from "axios";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const embedsRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ urls: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      return await axios
        .post(
          `${getBaseUrl()}/api/embeds/create`,
          { urls: input.urls },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res.data);
    }),
});
