import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.pid

  switch (req.method) {
    case 'PATCH':
      await handlePATCH(postId, res)
      break
    default:
      res.setHeader('Allow', ['PATCH'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

// PATCH /api/posts/:pid/views
const handlePATCH = async (postId, res: NextApiResponse) => {
  const result = await prisma.post.update({
    where: { id: Number(postId) },
    data: {
      viewsCount: {
        increment: 1
      }
    }
  })
  if (!result) {
    res.status(500).end('Internal Error')
  } else {
    res.status(200).json(result)
  }
}