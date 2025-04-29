import axios, { AxiosHeaders } from "axios";
import { useQuery } from "@tanstack/react-query";

interface UseGetRequestOptions {
  url: string;
  queryKey: string;
  header?: AxiosHeaders;
  staleTime?: number;
  gcTime?: number;
}

export const useGetRequest = ({
  url,
  queryKey,
  header,
  staleTime,
  gcTime
}: UseGetRequestOptions) => {
  const getData = async () => {
    const response = await axios.get(url, header && { headers: header });
    return response.data;
  };

  const { data, error, isPending } = useQuery({
    queryKey: [queryKey],
    queryFn: getData,
    staleTime: staleTime || 0,
    gcTime: gcTime || 1000 * 60 * 5
  });

  return { data, error, isPending };
};
