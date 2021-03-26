import prisma from "lib/prisma";
import { LIMIT_PER_PAGE } from "../../lib/constants";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  // 👇 handle GET request

  // query from this post id
  let postId = Array.isArray(req.query.offset)
    ? req.query.offset[0]
    : req.query.offset;
  // size of result
  let limit = Array.isArray(req.query.limit)
    ? req.query.limit[0]
    : req.query.limit;
  postId = postId ? Number(postId) : null;
  if (postId === 0) {
    res.status(204).send(null);
    return;
  }
  limit = limit ? Number(limit) : LIMIT_PER_PAGE;
  let queryResults;
  // first query request
  if (!postId) {
    queryResults = await prisma.post.findMany({
      take: limit,
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
        coverImage: true,
        tags: true,
        likesCount: true,
        viewsCount: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
  } else {
    //  second query request
    queryResults = await prisma.post.findMany({
      take: limit,
      skip: 1,
      cursor: {
        id: postId,
      },
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
        coverImage: true,
        tags: true,
        likesCount: true,
        viewsCount: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
  }
  if (!queryResults) {
    res.status(404).end("Not Found");
  } else {
    const lastPostIndex = limit - 1;
    // cursor will return 0 when there aren't more posts
    const cursor =
      lastPostIndex < queryResults.length ? queryResults[lastPostIndex].id : 0;
    let data = {
      data: queryResults,
      cursor: cursor,
    };
    res.status(200).json(data);
  }
}
