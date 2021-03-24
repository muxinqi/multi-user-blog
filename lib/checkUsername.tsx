import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json())
const baseUrl = ""

export const checkUsername = path => {
  if (!path) {
    throw new Error("Path is required")
  }

  const url = baseUrl + path
  const { data , error } = useSWR(url, fetcher)
  return { isAvailable: data, error }
}