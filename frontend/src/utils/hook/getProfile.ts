import { GET_PROFILE_QUERY } from "graphql/queries/GET_PROFILE_QUERY";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";

export const useGetPublicFiles = () => {
  const { data } = useQuery(GET_PROFILE_QUERY, {
    variables: { filter: { isPublic: false } },
  });
  const publicFiles = data?.getProfile.files || [];
  return publicFiles;
};
export const useGetPrivateFiles = () => {
  const { data } = useQuery(GET_PROFILE_QUERY, {
    variables: { filter: { isPublic: true } },
  });
  const privateFiles = data?.getProfile.files || [];
  return privateFiles;
};

export const useGetProfile = () => {
  const { data } = useQuery(GET_PROFILE_QUERY, {
    variables: { filter: { isPublic: null } },
  });
  const profile = data?.getProfile;
  return profile;
};

export const useRefetchProfile = () => {
  const { refetch, data } = useQuery(GET_PROFILE_QUERY, {
    variables: { filter: { isPublic: null } },
  });
  return refetch();
};
