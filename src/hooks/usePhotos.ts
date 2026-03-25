"use client";

import { useQuery, NetworkStatus } from "@apollo/client";
import { GET_PHOTOS } from "@/graphql/queries";
import { Photo, Connection } from "@/types";

interface UsePhotosVariables {
  orderBy?: string;
  orderDirection?: string;
  searchKeyword?: string;
  type?: string;
  username?: string;
  first?: number;
  after?: string;
  checkUserLike?: string;
  checkUserCollect?: string;
}

interface PhotosData {
  photos: Connection<Photo>;
}

export function usePhotos(variables: UsePhotosVariables = {}) {
  const { data, fetchMore, refetch, loading, error, networkStatus } = useQuery<PhotosData>(GET_PHOTOS, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    variables: {
      first: 20,
      ...variables,
    },
  });

  const fetchingMore = networkStatus === NetworkStatus.fetchMore;

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.photos.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.photos.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;

        return {
          photos: {
            ...fetchMoreResult.photos,
            edges: [
              ...previousResult.photos.edges,
              ...fetchMoreResult.photos.edges,
            ],
          },
        };
      },
    });
  };

  const photos = data?.photos.edges.map((edge) => edge.node) ?? [];

  return {
    photos,
    fetchMore: handleFetchMore,
    hasNextPage: data?.photos.pageInfo.hasNextPage ?? false,
    totalCount: data?.photos.pageInfo.totalCount ?? 0,
    refetch,
    loading,
    fetchingMore,
    error,
  };
}
