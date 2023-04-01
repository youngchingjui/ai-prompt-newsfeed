const createPostFormData = (prompt, image) => {
  // Create the FormData to be submitted
  const formData = new FormData()
  formData.append("prompt", prompt)

  if (image) {
    const fileStream = image.slice(0, image.size, image.type)
    formData.append("image", fileStream, image.name)
  }

  return formData
}

export default createPostFormData
