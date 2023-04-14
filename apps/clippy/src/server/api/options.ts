import superjson from "superjson";
import { ZodError } from "zod";

export default {
  transformer: superjson,
  //@ts-ignore
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
};
