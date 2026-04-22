import axios from "axios";

export const api = axios.create({
  baseURL: "/api"
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
  getQuestions: () => api.get("/assessment/questions"),
  submit: (payload) => api.post("/assessment/submit", payload)
};

export const AnalysisAPI = {
  weakAreas: () => api.get("/analysis/weak-areas")
};

