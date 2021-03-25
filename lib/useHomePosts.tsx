import useSWR from "swr";
import { Post } from "types/main";

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

export const useHomePosts = () => {
  const { data, error } = useSWR<Post[]>("/api/home", fetcher);
  return {
    posts: data,
    isLoading: !error && !data,
    isError: error
  };
};

export function useDashboardPosts() {
  const { data, error } = useSWR<Post[]>("/api/dashboard?posts=true", fetcher);
  return {
    posts: data,
    isLoading: !error && !data,
    isError: error
  };
}

export function useDashboardStats() {
  const { data, error } = useSWR("/api/dashboard", fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

export const useCommentsCountByPostId = postId => {
  const { data, error } = useSWR<number>(`/api/posts/${postId}/comments?count=true`, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
};
