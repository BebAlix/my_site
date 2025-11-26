import axios from "axios";

export const useApi = () => {
  const config = useRuntimeConfig();

  const getHello = async (): Promise<string | null> => {
    try {
      const res = await axios.get<string>(`${config.public.apiBase}/api`);
      return res.data;
    } catch (err) {
      console.error("API call failed:", err);
      return null;
    }
  };

  return { getHello };
};
