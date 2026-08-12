// Centralized REST API Service Client
const API_BASE = '/api';

const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_BASE}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`API Request error for ${url}:`, err.message);
    throw err;
  }
};

export const api = {
  // Auth
  login: (username, password) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  }),

  // Companies
  getCompanies: () => request('/companies'),
  createCompany: (companyData) => request('/companies', {
    method: 'POST',
    body: JSON.stringify(companyData)
  }),
  deleteCompany: (id) => request(`/companies/${id}`, { method: 'DELETE' }),

  // Projects
  getProjects: () => request('/projects'),
  createProject: (projectData) => request('/projects', {
    method: 'POST',
    body: JSON.stringify(projectData)
  }),
  updateProject: (id, updates) => request(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates)
  }),
  deleteProject: (id) => request(`/projects/${id}`, { method: 'DELETE' }),

  // Applications
  getApplications: () => request('/applications'),
  createApplication: (appData) => request('/applications', {
    method: 'POST',
    body: JSON.stringify(appData)
  }),

  // Releases
  getReleases: () => request('/releases'),
  createRelease: (releaseData) => request('/releases', {
    method: 'POST',
    body: JSON.stringify(releaseData)
  }),
  deleteRelease: (id) => request(`/releases/${id}`, { method: 'DELETE' }),

  // Issues
  getIssues: () => request('/issues'),
  createIssue: (issueData) => request('/issues', {
    method: 'POST',
    body: JSON.stringify(issueData)
  }),
  updateIssueStatus: (id, status) => request(`/issues/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  }),
  deleteIssue: (id) => request(`/issues/${id}`, { method: 'DELETE' }),

  // Users
  getUsers: () => request('/users'),
  createUser: (userData) => request('/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  deleteUser: (id) => request(`/users/${id}`, { method: 'DELETE' }),

  // Activities
  getActivities: () => request('/activities'),
  logActivity: (activityData) => request('/activities', {
    method: 'POST',
    body: JSON.stringify(activityData)
  })
};
