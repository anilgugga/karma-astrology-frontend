import Geocode from "react-geocode";

// Set your Google Maps API key here
Geocode.setApiKey("YOUR_GOOGLE_MAPS_API_KEY"); // Replace with your key
Geocode.setLanguage("en");
Geocode.setRegion("in");

export async function getLatLng(address) {
  try {
    const response = await Geocode.fromAddress(address);
    const { lat, lng } = response.results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    return { lat: "", lng: "" };
  }
}

export async function getTimezone(lat, lng) {
  const timestamp = Math.floor(Date.now() / 1000);
  const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your key
  const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "OK") {
      return data.timeZoneId;
    }
    return "";
  } catch {
    return "";
  }
}
