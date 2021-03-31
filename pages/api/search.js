import prisma from "lib/prisma";

const parseQuery = (req, target) => {
  if (!req || !target) return null;
  return Array.isArray(req.query[target])
    ? req.query[target][0]
    : req.query[target];
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } else {
    // GET /api/search
    const keywords = parseQuery(req, "keywords");
    const filters = parseQuery(req, "filters") || "posts";
    const qSort = parseQuery(req, "sort");
    console.log("qSort: ", qSort);
    let sort;
    switch (qSort) {
      case "oldest":
        sort = "asc";
        break;
      case "relevant":
      case "newest":
      default:
        sort = "desc";
    }
    let result;
    if (!keywords) {
      result = 1;
      res.status(200).end("");
      return;
    }
    switch (filters) {
      case "posts": {
        if (qSort === "relevant") {
          // sort with likes count (Most Relevant)
          console.log("relevant");
          result = await prisma.post.findMany({
            where: {
              AND: {
                published: true,
                OR: [
                  {
                    rawContent: {
                      contains: keywords,
                      mode: "insensitive",
                    },
                  },
                  {
                    title: {
                      contains: keywords,
                      mode: "insensitive",
                    },
                  },
                ],
              },
            },
            orderBy: [
              {
                likesCount: "desc",
              },
              {
                createdAt: "desc",
              },
            ],
            select: {
              id: true,
              title: true,
              slug: true,
              createdAt: true,
              tags: true,
              rawContent: true,
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
          // sort without likes count (Newest or Oldest)
          console.log(sort);
          result = await prisma.post.findMany({
            where: {
              AND: {
                published: true,
                OR: [
                  {
                    rawContent: {
                      contains: keywords,
                      mode: "insensitive",
                    },
                  },
                  {
                    title: {
                      contains: keywords,
                      mode: "insensitive",
                    },
                  },
                ],
              },
            },
            orderBy: {
              createdAt: sort,
            },
            select: {
              id: true,
              title: true,
              slug: true,
              createdAt: true,
              tags: true,
              rawContent: true,
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
        break;
      }
    }
    if (!result) {
      res.status(204).end("No Content");
    } else {
      res.status(200).json(result);
    }
  }
}
