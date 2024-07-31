"use client";

import { PropsWithChildren } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { HTTPError } from "ky";
import kyInstance from "@/lib/ky";
import { UserData } from "@/lib/types";
import UserTooltip from "@/components/UserTooltip";

interface UserLinkWithTooltipProps extends PropsWithChildren {
  username: string;
}

export default function UserLinkWithTooltip({
  children,
  username,
}: UserLinkWithTooltipProps) {
  const { data } = useQuery({
    queryKey: ["user-data", username],
    queryFn: () =>
      kyInstance.get(`/api/users/username/${username}`).json<UserData>(),
    retry(failureCount, error) {
      if (error instanceof HTTPError && error.response.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: Infinity,
  });

  if (!data) {
    return (
      <Link
        href={`/users/${username}`}
        className="text-blue-500 hover:underline"
      >
        {children}
      </Link>
    );
  }

  return (
    <UserTooltip user={data}>
      <Link
        href={`/users/${username}`}
        className="text-blue-500 hover:underline"
      >
        {children}
      </Link>
    </UserTooltip>
  );
}
