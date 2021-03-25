import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useCommentsByPostId = (postId) => {
  const { data, error } = useSWR(`/api/posts/${postId}/comments`, fetcher);
  return {
    comments: data,
    isLoading: !error && !data,
    isError: error,
  };
};
