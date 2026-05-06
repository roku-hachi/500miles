import axios from "axios";

const API_URL = "https://mqlyxvahrgewsosffxft.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xbHl4dmFocmdld3Nvc2ZmeGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNDYyNTcsImV4cCI6MjA5MzYyMjI1N30.liA-ARjBxbRPb-ov2w8hn4eSaOfgtLMxSkrzNuFdxWU"; // lấy trong Supabase Settings → API

const api = axios.create({
  baseURL: `${API_URL}/rest/v1`,
  headers: {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

/* =======================
   REQUEST INTERCEPTOR
======================= */
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    // Nếu bạn có login Supabase Auth → dùng token user
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err) => Promise.reject(err),
);

/* =======================
   RESPONSE INTERCEPTOR
======================= */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Supabase thường trả 401 nếu token sai / RLS block
    if (err.response?.status === 401) {
      console.error("Unauthorized - check RLS hoặc token");
    }

    return Promise.reject(err);
  },
);

// const api = axios.create({
//   baseURL: "https://mqlyxvahrgewsosffxft.supabase.co/rest/v1/",
// });

// /* =======================
//    REQUEST INTERCEPTOR
// ======================= */
// api.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accessToken");

//     if (
//       accessToken &&
//       !config.url.includes("/login") &&
//       !config.url.includes("/register") &&
//       !config.url.includes("/refresh-token")
//     ) {
//       config.headers.Authorization = "Bearer " + accessToken;
//     }

//     return config;
//   },
//   (err) => Promise.reject(err),
// );

// /* =======================
//    REFRESH TOKEN QUEUE
// ======================= */
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// /* =======================
//    RESPONSE INTERCEPTOR
// ======================= */
// api.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalRequest = err.config;

//     // Nếu không phải 401 thì bỏ qua
//     if (err.response?.status !== 401) {
//       return Promise.reject(err);
//     }

//     // Tránh loop refresh token
//     if (originalRequest.url.includes("/refresh-token")) {
//       localStorage.clear();
//       window.location.href = "/login";
//       return Promise.reject(err);
//     }

//     // Nếu đã retry rồi thì không làm lại
//     if (originalRequest._retry) {
//       return Promise.reject(err);
//     }

//     const refreshToken = localStorage.getItem("refreshToken");

//     // Không có refresh token → logout
//     if (!refreshToken) {
//       localStorage.clear();
//       window.location.href = "/login";
//       return Promise.reject(err);
//     }

//     // Nếu đang refresh → queue request
//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         failedQueue.push({
//           resolve: (token) => {
//             originalRequest.headers.Authorization = "Bearer " + token;
//             resolve(api(originalRequest));
//           },
//           reject,
//         });
//       });
//     }

//     originalRequest._retry = true;
//     isRefreshing = true;

//     try {
//       const res = await api.post("/refresh-token", {
//         refreshToken,
//       });

//       const newAccessToken = res.data.accessToken;

//       // lưu token mới
//       localStorage.setItem("accessToken", newAccessToken);

//       // xử lý queue
//       processQueue(null, newAccessToken);

//       // retry request cũ
//       originalRequest.headers.Authorization = "Bearer " + newAccessToken;

//       return api(originalRequest);
//     } catch (refreshErr) {
//       processQueue(refreshErr, null);

//       // refresh fail → logout
//       localStorage.clear();
//       window.location.href = "/login";

//       return Promise.reject(refreshErr);
//     } finally {
//       isRefreshing = false;
//     }
//   },
// );

export default api;
