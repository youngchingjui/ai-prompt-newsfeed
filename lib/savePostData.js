import axios from "axios"

const savePostData = async (formData) => {
  try {
    const response = await axios.post("/api/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    })

    if (!response.statusText == "OK") {
      throw new Error("Error saving post")
    }
  } catch (error) {
    console.error(error)
  }
}
export default savePostData
