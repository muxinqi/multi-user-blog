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

export function useDashboardPosts() {
  const { data, error } = useSWR("/api/dashboard?posts=true", fetcher);
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
  const { data, error } = useSWR(`/api/posts/${postId}/comments?count=true`, fetcher)
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}
