export async function handleAction<T>(actionFn: () => Promise<T>): Promise<T> {
  try {
    return await actionFn();
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred",
    );
  }
}
