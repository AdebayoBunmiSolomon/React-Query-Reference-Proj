import { endpoints } from "@src/constant/endpoints";
import { UserProfile } from "@src/types/api";
import { useQuery } from "@tanstack/react-query";
import { getResource } from "..";
import { querykeys } from "../querkeys";



export const getUser = async ():Promise<UserProfile> => {
  const data = await getResource({
    pathUrl: endpoints.profile,
  });
  return data;
};

export const useGetUserProfile = () => {
  const query = useQuery({
    queryKey: [querykeys.GET_USER],
    queryFn: () => getUser(),
  });
  return query;
};
