import axiosInstance, { TOKEN, saveToken } from "./config";

type RegisterUserTypes = IUser;

export const registerUser = async ({
  email,
  name,
  password,
}: RegisterUserTypes) => {
  try {
    const response = await axiosInstance.post("/users/create", {
      name,
      email,
      password,
    });
    return response.data.user;
  } catch (error: any) {
    if (error.response) {
      // The request was made, but the server responded with a non-2xx status code
      console.log("Request failed with status code", error.response.status);
      console.log("Response data:", error.response.data);
    } else if (error.request) {
      // The request was made, but there was no response from the server
      console.log(
        "No response received. The request was made but no response."
      );
    } else {
      // Something else happened while setting up the request
      console.log("Error:", error.message);
    }
    throw error;
  }
};
type LoginUserTypes = Omit<IUser, "name">;

export const LoginUser = async ({ email, password }: LoginUserTypes) => {
  try {
    const response = await axiosInstance.post("/users/login", {
      email,
      password,
    });
    const _token = response.data.token;
    // add token to headers
    axiosInstance.defaults.headers.common["Authorization"] = _token;
    saveToken(TOKEN, _token);
    return response.data.user;
  } catch (error: any) {
    if (error.response) {
      // The request was made, but the server responded with a non-2xx status code
      console.log("Request failed with status code", error.response.status);
      console.log("Response data:", error.response.data);
    } else if (error.request) {
      // The request was made, but there was no response from the server
      console.log(
        "No response received. The request was made but no response."
      );
    } else {
      // Something else happened while setting up the request
      console.log("Error:", error.message);
    }
    throw error;
  }
};
