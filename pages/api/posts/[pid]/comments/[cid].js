import prisma from "lib/prisma";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req })
  const commentId = req.query.cid

  switch (req.method) {
    case 'DELETE':
      await handleDELETE(session, commentId, res)
      break
    default:
      res.setHeader('Allow', ['DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

// DELETE /api/posts/:pid/comments/:cid
async function handleDELETE(session, commentId, res) {
  // Guest
  if (!session) {
    res.status(401).end('Unauthorized')
  }
  // check if user wants to delete others' comment
  const commentAuthorId = await prisma.user.findUnique({
    where: {
      Comment: {
        id: commentId,
      },
    },
  }).id
  const currentUserId = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  }).id
  if (commentAuthorId !== currentUserId) {
    res.status(403).end('Forbidden')
  }
  // delete comment
  const comment = await prisma.comment.delete({
    where: { id: Number(commentId) },
  })
  res.status(204).json(comment)
}