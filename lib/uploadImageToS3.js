import aws from "aws-sdk"
import { v4 as uuidv4 } from "uuid"

const bucketName = process.env.AWS_S3_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const uploadImageToS3 = async (buffer, mimetype, originalname) => {
  const fileKey = `uploads/${uuidv4()}/${originalname}`

  const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
  })

  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: buffer,
    ContentType: mimetype,
  }

  const result = await s3.upload(params).promise()
  return result.Location
}

export default uploadImageToS3
