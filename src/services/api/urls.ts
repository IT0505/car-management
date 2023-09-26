const BASEURL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3000'; // Staging
const API_BASE = `${BASEURL}/api`;

export const API_URL = {
  carGetAll: `${API_BASE}/car/get-all`,
  carAdd: `${API_BASE}/car/add`,
  carDelete: `${API_BASE}/car/delete`,
  carEdit: `${API_BASE}/car/edit`,
  carGetNearby: `${API_BASE}/car/get-nearby`,
};
