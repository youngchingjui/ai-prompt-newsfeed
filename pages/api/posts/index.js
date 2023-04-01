import multer from "multer"
import nextConnect from "next-connect"

import { insertPost } from "../../lib/insertPost"
import uploadImageToS3 from "../../lib/uploadImageToS3"

const upload = multer()

const handler = nextConnect({
  onError(error, req, res) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

handler.use(upload.single("image"))

handler.post(async (req, res) => {
  const { prompt } = req.body
  const { originalname, mimetype, size, buffer } = req.file
  const image_url = await uploadImageToS3(buffer, mimetype, originalname)
  const row = await insertPost(prompt, image_url)
  res.status(200).json({ message: "File uploaded successfully", row })
})

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
