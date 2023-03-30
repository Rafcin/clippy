import { clippyRouter } from "./routers/clippy";
import { embedsRouter } from "./routers/embeds";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  embeds: embedsRouter,
  clippy: clippyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
