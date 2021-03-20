import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useHomePosts = () => {
  const { data, error } = useSWR("/api/home", fetcher);
  return {
    posts: data,
    isLoading: !error && !data,
    isError: error
  };
};