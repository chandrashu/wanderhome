const axios = require("axios");
const ExpressError = require("./ExpressError");

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

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
      throw error;
    }

    throw new ExpressError(
      502,
      "Could not reach the map service. Please try again in a moment."
    );
  }
};

module.exports = geocodeLocation;
