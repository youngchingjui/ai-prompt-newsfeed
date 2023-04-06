import axios from "axios"

const getLikes = async ({ user_id }) => {
  try {
    const res = await axios.get("/api/likes", {
      params: { user_id },
    })
    return res.data.rows
  } catch (e) {
    console.error(e)
  }
}

export default getLikes
