import { useQuery } from '@tanstack/react-query'
import { fetchParcels } from '../lib/api'

export function useParcels() {
  return useQuery({
    queryKey: ['parcels'],  // Unique key for this data
    queryFn: fetchParcels,  // Function to fetch the data
  })
}

// this is for my reference, so I don't have to make requests again and again.
// What this hook returns:
// {
//   data: Parcel[] | undefined,     // The actual parcel data
//   isLoading: boolean,             // true while fetching
//   error: Error | null,            // error if fetch failed
//   isError: boolean,               // true if there's an error
//   refetch: () => void,            // function to manually refetch
// }