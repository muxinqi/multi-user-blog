import prisma from "lib/prisma";
import { getSession } from "next-auth/client";
import remark from "remark";
import html from "remark-html";

export default async function handler(req, res) {
  const postId = req.query.pid;

  switch (req.method) {
    case "GET":
      await handleGET(postId, res);
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
async function handleGET(postId, res) {
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