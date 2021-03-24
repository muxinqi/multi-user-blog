import { getSession } from "next-auth/client";
import prisma from "lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end("Unauthorized");
  }
  switch (req.method) {
    case "GET":
      if (Boolean(req.query.posts) === true) {
        await handleGetPosts(session, res)
        return
      }
      await handleGET(session, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGET(session, res) {
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  });
  const countData = await prisma.post.groupBy({
    by: ["authorId"],
    where: {
      authorId: user.id
    },
    sum: {
      likesCount: true,
      viewsCount: true
    }
  });
  const data = {
    view: countData[0].sum.viewsCount,
    like: countData[0].sum.likesCount
  };
  if (!countData) {
    res.status(404).end("Not Found");
  } else {
    res.status(200).json(data);
  }
}

async function handleGetPosts(session, res) {
  const posts = await prisma.post.findMany({
    where: {
      author: {
        email: session.user.email
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
  })
  res.status(200).json(posts)
}