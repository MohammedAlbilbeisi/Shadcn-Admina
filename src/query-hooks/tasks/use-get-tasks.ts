import client from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const fetchTasks = async () => {
  const response = await client.get("tasks");
  return response.data;
};

export const useGetTasks = () => {
  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(),
  });

  return query;
};
