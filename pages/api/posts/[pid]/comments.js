import prisma from "lib/prisma";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const postId = req.query.pid

  switch (req.method) {
    case 'GET':
      await handleGET(pid, res)
      break
    case 'POST':
      await handlePOST(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

// GET /api/posts/:pid/comments
async function handleGET(pid, res) {
  const comments = await prisma.comment.findMany({
    data: {
      where: { postId: Number(pid) },
      include: { author: true },
    },
  })
  res.status(200).json(comments)
}

// POST /api/posts/:pid/comments
async function handlePOST(req, res) {
  const session = await getSession({ req })
  if (!session) {
    res.status(401).end('Unauthorized')
  } else {
    const { rawContent, renderedContent } = req.body
    const result = await prisma.comment.create({
      data: {
        rawContent: rawContent,
        renderedContent: renderedContent,
        author: { connect: { email: session.user.email } },
        post: { connect: { id: req.query.pid } }
      }
    })
    res.status(201).json(result)
  }
}