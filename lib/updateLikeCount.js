import axios from "axios"

const updateLikeCount = async (postId, likeCount) => {
  try {
    const response = await axios.put(`/api/posts/${postId}`, {
      likeCount,
    })

    if (!response.data) {
      throw new Error("Failed to update like count")
    }
  } catch (error) {
    console.error(error)
  }
}
export default updateLikeCount
