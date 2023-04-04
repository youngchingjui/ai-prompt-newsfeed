import multer from "multer"
import { getServerSession } from "next-auth"

import { authOptions } from "/pages/api/auth/[...nextauth]"

import createPost from "../../../lib/createPost"
import nextConnectBase from "../../../lib/nextConnectBase"
import uploadImageToS3 from "../../../lib/uploadImageToS3"

const upload = multer()

const handler = nextConnectBase()

handler.use(upload.single("image"))

handler.post(async (req, res) => {
  const { prompt } = req.body
  const { originalname, mimetype, size, buffer } = req.file

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  // Upload the image to S3 first
  const image_url = await uploadImageToS3(buffer, mimetype, originalname)

  // Save post to database
  const row = await createPost({ prompt, image_url, user_id: session.user.id })

  res.status(200).json({ message: "File uploaded successfully", row })
})

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
