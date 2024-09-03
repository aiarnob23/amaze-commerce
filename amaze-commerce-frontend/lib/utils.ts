export const catchAsync = <T extends (...args: any[]) => Promise<any>>(fn: T) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error("Error caught:", error);
      // You can handle the error in a more specific way here, like showing a notification or setting error state.
      throw error; // re-throw the error if needed
    }
  };
};


