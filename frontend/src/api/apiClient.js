import axios from "axios"


const apiClient = axios.create({
    baseURL: "http://localhost:8000",
})

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

// response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token")
    }

    return Promise.reject(error)
  }
)

export default apiClient
