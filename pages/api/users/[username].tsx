import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "lib/prisma";
import { getSession } from "next-auth/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  switch (req.method) {
    case 'GET':
      await handleGET(req, res)
      break
    case 'PATCH':
      await handlePATCH(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'PATCH'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

// GET /api/users/:username
async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const username = req.query.username
  const checkAvailable = Boolean(req.query.checkAvailable)

  if (checkAvailable) {
    const userCount = await prisma.user.count({
      where: { username: username }
    })
    res.status(200).json({ "isAvailable": userCount == 0 })
  } else {
    const user = await prisma.user.findUnique({
      where: { username: username }
    })
    res.status(200).json(user)
  }
}
// PATCH /api/users/:username
// set username
async function handlePATCH(req: NextApiRequest, res: NextApiResponse) {
  const username = req.query.username
  const session = await getSession({ req })
  // if user not logged in
  if (!session) {
    res.status(401).json('Unauthorized')
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { username: true }
  })
  // if user don't have username
  if (!user.username) {
    const updateUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { username: username }
    })
    res.status(200).json(updateUser)
  } else {
    res.status(403)
  }
}