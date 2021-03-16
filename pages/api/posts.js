import prisma from "lib/prisma";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  
  switch (req.method) {
    case 'GET':
      await handleGET(res)
      break
    case 'POST':
      await handlePOST(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

// GET /api/posts
async function handleGET(res) {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: true
    },
  })
  res.json(posts)
}

// POST /api/posts
async function handlePOST(req, res) {
  const session = await getSession({ req })
  // if not logged in
  if (!session) {
    res.status(401).end('Unauthorized')
  } else {
    const { title, slug, rawContent, renderedContent, published } = req.body
    const result = await prisma.post.create({
      data: {
        title: title,
        slug: slug,
        rawContent: rawContent,
        renderedContent: renderedContent,
        published: published,
        author: {
          connect: {
            email: session.user.email,
          },
        },
      },
    })
    res.status(201).json(result)
  }
}