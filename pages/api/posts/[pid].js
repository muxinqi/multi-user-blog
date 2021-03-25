import prisma from "lib/prisma";
import { getSession } from "next-auth/client";
import remark from "remark";
import html from "remark-html";

export default async function handler(req, res) {
  const postId = req.query.pid
  const session = await getSession({req})

  switch (req.method) {
    case 'GET':
      await handleGET(postId, res)
      break
    case 'DELETE':
      await handleDELETE(session, postId, res)
      break
    case 'PUT':
      await handlePUT(session, postId, req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

// GET /api/posts/:pid
async function handleGET(postId, res) {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(postId)
    },
    include: {
      tags: true,
      author: true,
    },
  })
  if (!post) {
    res.status(404)
  } else {
    res.status(200).json(post)
  }
}

// DELETE /api/posts/:pid
async function handleDELETE(session, postId, res) {
  // check if user has logged in
  if (!session) {
    res.status(401).end('Unauthorized')
    return
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }
  })
  if (!user) {
    res.status(401).end('Unauthorized')
    return
  }
  const post = await prisma.post.findUnique({
    where: { id: Number(postId) },
    include: {
      author: {
        select: {
          id: true
        }
      }
    }
  })
  if (!post) {
    res.status(404).send("Not Found")
    return
  }
  const userIsNotAuthor = user.id !== post.author.id
  if (userIsNotAuthor) {
    res.status(403).send("Forbidden")
    return
  }
  const deleteComments = prisma.comment.deleteMany({
    where: { postId: Number(postId) }
  })
  const deletePost = prisma.post.delete({
    where: { id: Number(postId) },
  })

  const transaction = await prisma.$transaction([deleteComments, deletePost])
  if (!transaction) {
    res.status(500).send("Internal Error")
  } else {
    res.status(204).send(null)
  }
}

// PUT /api/posts/:pid
async function handlePUT(session, postId, req, res) {
  // Guest
  if (!session) {
    res.status(401).end('Unauthorized')
    return
  }
  // check if user wants to update others' post
  const postAuthor = await prisma.post
    .findUnique({ where: { id: Number(postId) } })
    .author()
  const user = await prisma.user
    .findUnique({ where: { email: session.user.email } })

  if (!postAuthor || !user || postAuthor.id !== user.id) {
    res.status(403).end('Forbidden')
    return
  }
  // update post
  const {id, title, slug, coverImage, rawContent, tags, published} = req.body
  const renderedContent = await remark()
    .use(html)
    .process(rawContent);
  const result = await prisma.post.update({
    where: { id: Number(postId) },
    data: {
      title: title,
      slug: slug,
      coverImage: coverImage,
      rawContent: rawContent,
      renderedContent: renderedContent.toString(),
      published: published,
    }
  })
  if (!result) {
    res.status(500)
  } else {
    res.status(200).json(result)
  }


}