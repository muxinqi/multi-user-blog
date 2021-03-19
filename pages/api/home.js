import prisma from "lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'GET') {
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
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        }
      }
    })
    if (!data) {
      res.status(404)
    } else {
      res.status(200).json(data)
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}