import prisma from "lib/prisma";
import { getSession } from "next-auth/client";
import remark from "remark";
import html from "remark-html";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await handleGET(req, res);
      break;
    case "POST":
      await handlePOST(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// GET /api/posts/:pid/comments
// GET /api/posts/:pid/comments?count
async function handleGET(req, res) {
  const postId = req.query.pid
  const countComments = Boolean(req.query.count)
  if (countComments) {
    await handleCountComments(postId, res)
    return
  }
  const comments = await prisma.comment.findMany({
    where: { postId: Number(postId) },
    orderBy: { createdAt: "desc" },
    include: { author: true }
  });
  if (!comments) {
    res.status(404);
  } else {
    res.status(200).json(comments);
  }
}

// POST /api/posts/:pid/comments
async function handlePOST(req, res) {
  const session = await getSession({ req })
  if (!session) {
    res.status(401).end('Unauthorized')
  } else {
    const { rawContent } = req.body;
    const renderedContent = await remark()
      .use(html)
      .process(rawContent);
    const result = await prisma.comment.create({
      data: {
        rawContent: rawContent,
        renderedContent: renderedContent.toString(),
        author: { connect: { email: session.user.email } },
        post: { connect: { id: Number(req.query.pid) } }
      }
    });
    res.status(201).json(result);
  }
}

async function handleCountComments(postId, res) {
  const postData = await prisma.post.findUnique({
    where: { id: Number(postId) }
  })
  if (!postData) {
    res.status(404).end()
    return;
  }
  const commentsCount = await prisma.comment.count({
    where: { postId: Number(postId) }
  })

  res.status(200).json(Number(commentsCount))
}