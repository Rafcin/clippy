import { getBaseUrl } from "@/utils/api";
import axios from "axios";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const clippyRouter = createTRPCRouter({
  query: publicProcedure
    .input(z.object({ query: z.string() }))
    .mutation(async ({ input }) => {
      return await axios
        .post(
          `${getBaseUrl()}/api/clippy`,
          { question: input.query },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res.data);
    }),
});
