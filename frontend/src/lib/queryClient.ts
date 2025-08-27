import { QueryClient } from '@tanstack/react-query'

// Create a client instance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
      retry: 1, // Retry failed requests once
    },
  },
})