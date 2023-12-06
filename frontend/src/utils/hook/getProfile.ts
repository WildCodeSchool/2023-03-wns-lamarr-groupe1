
import { GET_PROFILE_QUERY } from "graphql/queries/GET_PROFILE_QUERY";
import { useQuery } from "@apollo/client";

type File = {
  id: number;
  filename: string;
  content: string;
  createdAt: string;
  image: string;
  isPublic: boolean;
};

export const useGetPublicFiles = () => {
    const { data } = useQuery(
    GET_PROFILE_QUERY,
    {
      variables: { filter: {isPublic: false} },
    }
    );
   const publicFiles = data?.getProfile.files || []
    return publicFiles
  }
export const useGetPrivateFiles = () => {
    const { data } = useQuery(
    GET_PROFILE_QUERY,
    {
      variables: { filter: {isPublic: true} },
    }
    );
   const privateFiles = data?.getProfile.files || []
    return privateFiles
  }

export const useGetProfile = () => {
    const { data } = useQuery(
    GET_PROFILE_QUERY,
    {
      variables: { filter: {isPublic: null} },
    }
    );
   const profile = data?.getProfile
    return profile
  }