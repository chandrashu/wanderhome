const axios = require("axios");
const ExpressError = require("./ExpressError");

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const DEFAULT_GEOMETRY = {
  type: "Point",
  coordinates: [77.2090, 28.6139],
};
const allowGeocodeFallback =
  process.env.NODE_ENV !== "production" || process.env.GEOCODING_FALLBACK === "true";

const getFallbackGeometry = () => ({
  type: DEFAULT_GEOMETRY.type,
  coordinates: [...DEFAULT_GEOMETRY.coordinates],
});

const geocodeLocation = async ({ location, country }) => {
  const query = [location, country].filter(Boolean).join(", ");

  if (!query.trim()) {
    throw new ExpressError(400, "Location and country are required for map coordinates.");
  }

  try {
    const response = await axios.get(NOMINATIM_URL, {
      params: {
        q: query,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent":
          process.env.GEOCODING_USER_AGENT || "WanderHome/1.0 local-development",
        "Accept-Language": "en",
      },
      timeout: 10000,
    });

    const place = response.data && response.data[0];
    if (!place) {
      throw new ExpressError(
        400,
        "Could not find this location on the map. Please enter a more specific location."
      );
    }

    const longitude = Number(place.lon);
    const latitude = Number(place.lat);

    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      throw new ExpressError(502, "Map service returned invalid coordinates.");
    }

    return {
      type: "Point",
      coordinates: [longitude, latitude],
    };
  } catch (error) {
    if (error instanceof ExpressError) {
      if (allowGeocodeFallback) {
        return getFallbackGeometry();
      }

      throw error;
    }

    if (allowGeocodeFallback) {
      return getFallbackGeometry();
    }

    throw new ExpressError(
      502,
      "Could not reach the map service. Please try again in a moment."
    );
  }
};

module.exports = geocodeLocation;
