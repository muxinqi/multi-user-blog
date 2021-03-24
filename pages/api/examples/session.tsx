import type { NextApiRequest, NextApiResponse } from 'next'
// This is an example of how to access a session from an API route
import { getSession } from "next-auth/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  res.send(JSON.stringify(session, null, 2))
}