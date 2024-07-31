import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { BookmarkInfo } from "@/lib/types";
import kyInstance from "@/lib/ky";
import { useToast } from "@/components/ui/use-toast";
import { Bookmark } from "lucide-react";

type BookmarkButtonProps = {
  postId: string;
  initialState: BookmarkInfo;
};

export default function BookmarkButton({
  postId,
  initialState,
}: BookmarkButtonProps) {
  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["bookmark-info", postId];

  const { toast } = useToast();

  const { data } = useQuery({
    queryKey,
    queryFn: () =>
      kyInstance.get(`/api/posts/${postId}/bookmark`).json<BookmarkInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isBookmarkedByUser
        ? kyInstance.delete(`/api/posts/${postId}/bookmark`)
        : kyInstance.post(`/api/posts/${postId}/bookmark`),
    onMutate: async () => {
      toast({
        description: `Bài viết ${data.isBookmarkedByUser ? "đã được gỡ khỏi" : "đã được lưu vào"} bookmark`,
      });

      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<BookmarkInfo>(queryKey);

      queryClient.setQueryData<BookmarkInfo>(queryKey, () => ({
        isBookmarkedByUser: !previousState?.isBookmarkedByUser,
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Đã xảy ra lỗi, hãy thử lại.",
      });
    },
  });

  return (
    <button onClick={() => mutate()} className="flex items-center gap-2">
      <Bookmark
        className={cn(
          "size-5",
          data.isBookmarkedByUser && "fill-violet-500 text-violet-500",
        )}
      />
    </button>
  );
}
