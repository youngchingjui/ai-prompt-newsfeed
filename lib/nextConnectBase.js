import nextConnect from "next-connect"

const nextConnectBase = () => {
  const handler = nextConnect({
    onError(error, req, res) {
      console.error(error)
      res.status(500).json({ error: "Internal Server Error" })
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
    },
  })

  return handler
}

export default nextConnectBase
