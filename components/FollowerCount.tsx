"use client";

import useFollowerInfo from "@/hooks/useFollowerInfo";
import { FollowerInfo } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

type FollowerCountProps = {
  userId: string;
  initialState: FollowerInfo;
};

export default function FollowerCount({
  userId,
  initialState,
}: FollowerCountProps) {
  const { data } = useFollowerInfo(userId, initialState);

  return (
    <span>
      Số người theo dõi:{" "}
      <span className="font-semibold">{formatNumber(data.followers)}</span>
    </span>
  );
}
