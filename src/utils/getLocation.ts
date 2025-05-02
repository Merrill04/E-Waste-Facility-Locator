// Simple location utility without Mapbox dependency
const getLocation = (): Promise<{ coordinates: [number, number] | null; address: string | null }> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const coordinates: [number, number] = [lon, lat];
          
          // Just return coordinates without using Mapbox for geocoding
          resolve({ coordinates, address: "Current location" });
        },
        (error) => {
          console.error(error);
          resolve({ coordinates: null, address: null });
        },
        options
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      resolve({ coordinates: null, address: null });
    }
  });
};

export default getLocation;
  