import { clippyRouter } from "./routers/clippy";
import { glimpseRouter } from "./routers/glimpse";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  clippy: clippyRouter,
  glimpse: glimpseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
