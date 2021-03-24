import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
    return
  }
  // handle GET request
  const data = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc'
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
          image: true
        }
      }
    }
  })
  if (!data) {
    res.status(404)
  } else {
    res.status(200).json(data)
  }
}