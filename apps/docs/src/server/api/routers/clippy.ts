import { getBaseUrl } from "@/utils/api";
import axios from "axios";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const clippyRouter = createTRPCRouter({
  query: publicProcedure
    .input(
      z.object({
        question: z.string(),
        history: z.array(z.tuple([z.string(), z.string()])),
      })
    )
    .mutation(async ({ input }) => {
      return await axios
        .post(
          `${getBaseUrl()}/api/clippy/query`,
          { question: input.question, history: input.history },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res.data);
    }),
});
