import prisma from "lib/prisma";
import {getSession} from "next-auth/client"
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
      res.status(405).end(`Method ${method} Not Allowed`)
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
  if (!session) {
    res.status(401).end('Unauthorized')
  } else {
    const post = await prisma.post.delete({
      where: {id: Number(postId)},
    })
    res.status(204).json(post)
  }
}

// PUT /api/posts/:pid
async function handlePUT(session, postId, req, res) {
  // Guest
  if (!session) {
    res.status(401).end('Unauthorized')
  }
  // check if user wants to update others' post
  const postAuthorId = await prisma.user.findUnique({
    where: {
      Post: {
        id: postId,
      },
    },
  }).id
  const currentUserId = await prisma.user.findUnique({
    where: {
      email: session.user.email
    },
  }).id
  if (postAuthorId !== currentUserId) {
    res.status(403).end('Forbidden')
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