import prisma from "lib/prisma";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  switch (req.method) {
    case "PATCH":
      await handlePATCH(req, res);
      break;
    default:
      res.setHeader("Allow", ["PATCH"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// PATCH /api/posts/:pid/likes
const handlePATCH = async (req, res) => {
  const session = await getSession({ req });
  // if not logged in
  if (!session) {
    res.status(401).end("Unauthorized");
    return;
  }
  const postId = req.query.pid;
  const result = await prisma.post.update({
    where: { id: Number(postId) },
    data: {
      likesCount: {
        increment: 1,
      },
    },
  });
  if (!result) {
    res.status(500).end("Internal Error");
  } else {
    res.status(200).json(result);
  }

  // // check if user has liked post
  // let userHasLiked = false
  // if (likesFromUser.likedByUsers.length > 0) {
  //   for (let i = 0; i < likesFromUser.likedByUsers.length; i++) {
  //     console.log(likesFromUser.likedByUsers);
  //     console.log("two id : "+ likesFromUser.likedByUsers[i].id + " " + user.id);
  //     if (likesFromUser.likedByUsers[i].userId === user.id) {
  //       userHasLiked = true
  //       break
  //     }
  //   }
  // }
  // console.log(userHasLiked);
  // res.status(200).json(userHasLiked)
  // return

  // const likeResult = await prisma.post.upsert({
  //   where: { id: Number(postId) },
  //
  // })
};
