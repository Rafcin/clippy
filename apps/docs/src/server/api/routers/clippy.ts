import { getBaseUrl } from "@/utils/api";
import axios from "axios";
import { BaseChatMessage } from "langchain/schema";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const clippyRouter = createTRPCRouter({
  query: publicProcedure
    .input(
      z.object({
        question: z.string(),
        history: z.array(
          z.object({
            text: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      return await axios
        .post(
          `${getBaseUrl()}/api/clippy`,
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
