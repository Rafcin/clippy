import superjson from "superjson";

export default {
  transformer: superjson,
  //@ts-ignore
  errorFormatter({ shape }) {
    return shape;
  },
};
