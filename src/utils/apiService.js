// utils/apiService.js

export async function fetchCompatibility(data, token) {
  const response = await fetch('http://localhost:8000/predict-compatibility', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function fetchMarriageAge(data, token) {
  const response = await fetch('http://localhost:8000/predict-marriage-age', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function fetchBirthChartDetails(data, token) {
  const response = await fetch('http://localhost:8000/birth-chart-detailed', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
}
