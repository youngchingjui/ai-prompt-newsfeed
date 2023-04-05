import { useRouter } from "next/router"
import { IoArrowBackSharp } from "react-icons/io5"

const BackButton = () => {
  const router = useRouter()

  return (
    <div onClick={() => router.back()}>
      <IoArrowBackSharp />
      <span>Back</span>
    </div>
  )
}

export default BackButton
