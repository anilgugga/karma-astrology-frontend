export const fetchMyCharts = async () => {
  const res = await api.get("/my-charts");
  return res.data;
};

export const saveMyChart = async (chart) => {
  const res = await api.post("/my-charts", chart);
  return res.data;
};

export const deleteMyChart = async (chartId) => {
  const res = await api.delete(`/my-charts/${chartId}`);
  return res.data;
};
