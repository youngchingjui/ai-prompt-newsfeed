import axios from "axios"

const updateLike = async ({ postId, userId, isLiked }) => {
  try {
    const res = await axios.post(`/api/likes`, {
      post_id: postId,
      user_id: userId,
      is_liked: !isLiked,
    })
    if (!res.statusText == "OK") {
      throw new Error("Failed to update like status")
    }
    return { success: true }
  } catch (err) {
    console.error("Failed to update like status", err)
    return { success: false }
  }
}

export default updateLike
