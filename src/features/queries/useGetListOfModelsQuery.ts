import { queryOptions, useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";

export const listOfModelsQueryOptions = () =>
  queryOptions({
    queryKey: ["getListOfModels"],
    queryFn: async () => {
      const models = await invoke("get_list_of_models").then((res) => res);
      return models as LocalModel[];
    },
  });

const useGetListOfModelsQuery = () => {
  const { data, isLoading } = useQuery(listOfModelsQueryOptions());
  return { data, isLoading };
};
export default useGetListOfModelsQuery;
