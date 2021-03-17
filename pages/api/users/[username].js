import prisma from "lib/prisma";

export default async function handler(req, res) {

  switch (req.method) {
    case 'GET':
      await handleGET(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

// GET /api/users/:username
async function handleGET(req, res) {
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
