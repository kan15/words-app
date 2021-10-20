export const notReachable = (state: never): never => {
    throw new Error(state);
};