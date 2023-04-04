import axios from "axios"
import { useState } from "react"
import { Button, Container, Form, ListGroup } from "react-bootstrap"

const BatchUpload = () => {
  const [files, setFiles] = useState([])
  const [prompt, setPrompt] = useState("")
  const [urls, setUrls] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const promises = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append("prompt", prompt)
      formData.append("image", file)
      promises.push(
        axios
          .post("/api/posts", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response)
            return response
          })
      )
    }

    Promise.all(promises)
      .then((results) => {
        setUrls(results)
        const csvContent =
          "data:text/csv;charset=utf-8," + convertToCsv(results)
        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "batch_upload_urls.csv")
        document.body.appendChild(link)
        link.click()
      })
      .catch((error) => console.error(error))
  }

  const convertToCsv = (data) => {
    const rows = []
    rows.push(["filename", "url"])
    data.forEach((item) => {
      const row = [item.filename, item.url]
      rows.push(row)
    })

    return rows.map((row) => row.join(",")).join("\n")
  }

  return (
    <Container>
      <h1>Batch Uploader</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Prompt</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter prompt"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Form.Control
            id="image"
            label="Select files"
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Upload
        </Button>
      </Form>
      <hr />

      <h2>Uploaded Files</h2>
      {urls.length > 0 && (
        <ListGroup>
          {urls.map((url) => (
            <ListGroup.Item key={url.filename}>
              {url.filename} -{" "}
              <a href={url.url} target="_blank" rel="noopener noreferrer">
                {url.url}
              </a>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  )
}

export default BatchUpload
