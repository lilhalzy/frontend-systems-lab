import { useState } from "react"

const useUserForm = (onAddUser) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
  })

  const [formError, setFormError] = useState('')

  const handleInputChange = (e) => {
    const {name, value} = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmedName = formData.name.trim()
    const trimmedRole = formData.role.trim()

    if (!trimmedName || !trimmedRole) {
      setFormError('Name and role are required')
      return
    }

    if (trimmedName.length < 3) {
      setFormError('Name must be at least 3 characters')
      return
    }
    
    if (trimmedRole.length < 3) {
      setFormError('Role must be at least 3 characters')
      return
    }

    onAddUser({
      id: crypto.randomUUID(),
      name: trimmedName,
      role: trimmedRole,
      online: false,
      followers: 0,
    })

    setFormError('')

    setFormData({
      name: '',
      role: '',
    })
  }

  return {
    formData,
    formError,
    handleInputChange,
    handleSubmit,
  }
}

export default useUserForm