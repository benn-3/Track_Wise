import axios from "axios";

const API_URL = "http://172.17.0.26:7000/api/token";

export const checkTokenIsValid = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/checktokenvalid`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log("Token is valid:", response.data);
      return response.data;
    } else {
      console.log("Invalid token");
      return response.data;
    }
  } catch (error) {
    console.error("Error checking token validity:", error.message || error);
    return error.response
      ? error.response.data
      : { message: "Error checking token validity" };
  }
};
