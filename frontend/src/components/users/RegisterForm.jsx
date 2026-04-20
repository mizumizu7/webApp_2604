import { useState } from "react"
import axios from "axios"

const RegisterForm = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState("")
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [error, setError]       = useState("")
  const [success, setSuccess]   = useState(false)
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      await axios.post("http://localhost:8000/users/register", {
        username,
        email,
        password,
      })

      setSuccess(true)
      setUsername("")
      setEmail("")
      setPassword("")
      onRegisterSuccess?.()
    } catch (err) {
      setError(
        err.response?.data?.detail || "ユーザ登録に失敗しました"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>ユーザ登録</h2>

      <div>
        <label>メールアドレス</label><br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>ユーザ名</label><br />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label>パスワード</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          maxLength={64}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>登録が完了しました</p>}

      <button type="submit" disabled={loading}>
        {loading ? "登録中..." : "登録"}
      </button>
    </form>
  )
}

export default RegisterForm
