import useSWR, { useSWRInfinite } from "swr";
import { LIMIT_PER_PAGE } from "./constants";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useHomePosts = () => {
  const getKey = (pageIndex, previousPageData) => {
    // reached the end
    if (previousPageData && !previousPageData.data) return null;

    // first page, we don't have `previousPageData`
    if (pageIndex === 0) return `/api/home?limit=${LIMIT_PER_PAGE}`;

    // add the cursor to the API endpoint
    return `/api/home?offset=${previousPageData.cursor}&limit=${LIMIT_PER_PAGE}`;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  const isError = error;
  const isLoadingInitialData = !data && !error;

  let posts = !data
    ? []
    : data
        .map((val) => val.data)
        .reduce((pre, cur) => pre.concat(cur))
        .map((e) => e);

  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  const cursor = data && data[size - 1]?.cursor;
  const isEmpty = cursor === 0;
  const isLastLoadedDataInsufficient =
    data && data[size - 1]?.data.length < LIMIT_PER_PAGE;
  const isCursorMovedToEnd = cursor === 1;
  const isReachingEnd =
    isEmpty || isLastLoadedDataInsufficient || isCursorMovedToEnd;

  return {
    posts: posts,
    isLoading: isLoadingInitialData,
    isError,
    isLoadingMore,
    isReachingEnd,
    size,
    setSize,
  };
};

export function useDashboardPosts() {
  const { data, error } = useSWR("/api/dashboard?posts=true", fetcher);
  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useDashboardStats() {
  const { data, error } = useSWR("/api/dashboard", fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export const useCommentsCountByPostId = (postId) => {
  const { data, error } = useSWR(
    `/api/posts/${postId}/comments?count=true`,
    fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
