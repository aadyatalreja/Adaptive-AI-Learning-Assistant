import axios from "axios";

export const api = axios.create({
  baseURL: "/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optionally handle global unauthorized state
    }
    return Promise.reject(error);
  }
);

export const AuthAPI = {
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload)
};

export const UserAPI = {
  selectRole: (payload) => api.post("/user/select-role", payload),
  selectSubjects: (payload) => api.post("/user/select-subjects", payload),
  me: () => api.get("/user/me")
};

export const AssessmentAPI = {
  generate: (subject) => api.get(`/assessment/generate?subject=${encodeURIComponent(subject)}`),
  checkStatus: () => api.get("/assessment/status"),
  submit: (payload) => api.post("/assessment/submit", payload)
};

export const AnalysisAPI = {
  weakAreas: () => api.get("/analysis/weak-areas")
};

export const CourseAPI = {
  generate: (payload) => api.post("/course/generate", payload),
  myCourse: () => api.get("/course/my-course"),
  moduleContent: (payload) => api.post("/course/module-content", payload)
};

export const StudyAPI = {
  generate: (subject) => api.get(`/study/generate?subject=${encodeURIComponent(subject)}`)
};

export async function generateCourse(data) {
  const token = localStorage.getItem("token");
  const response = await api.post("/course/generate", data, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  return response.data;
}

