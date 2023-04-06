import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

import getLikes from "../getLikes"

// Gets a user's likes
const useLikes = () => {
  const [likes, setLikes] = useState([])
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) {
      return
    }

    // Once logged in, fetch user's likes
    const fetchLikes = async () => {
      const newLikes = await getLikes({ user_id: session.user.id })
      setLikes(newLikes)
    }
    fetchLikes()
  }, [session])

  return likes
}

export default useLikes
