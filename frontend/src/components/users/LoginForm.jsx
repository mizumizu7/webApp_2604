import { useState } from "react"
import apiClient from "../../api/apiClient"


const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await apiClient.post(
        "/users/login",
        {
          email,
          password,
        }
      )

      // 親コンポーネントにログイン成功を通知(tokenだけ渡す)
      onLoginSuccess(res.data.access_token)
    } catch (err) {
      setError("メールアドレスまたはパスワードが正しくありません")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>ログイン</h2>

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
        <label>パスワード</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "ログイン中..." : "ログイン"}
      </button>
    </form>
  )
}

export default LoginForm
