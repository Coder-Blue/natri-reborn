import { useRouter } from "next/navigation";
import { updateUserProfile } from "./actions";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useUploadThing } from "@/lib/uploadthing";
import { PostsPage } from "@/lib/types";
import { UpdateUserProfileValues } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";

export function useUpdateProfileMutation() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { startUpload: startAvatarUpload } = useUploadThing("avatar");

  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async ({
      values,
      avatar,
    }: {
      values: UpdateUserProfileValues;
      avatar?: File;
    }) => {
      return Promise.all([
        updateUserProfile(values),
        avatar && startAvatarUpload([avatar]),
      ]);
    },
    onSuccess: async ([updatedUser, uploadResult]) => {
      const newAvatarUrl = uploadResult?.[0].serverData.avatarUrl;

      const queryFilter: QueryFilters = {
        queryKey: ["post-feed"],
      };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.map((post) => {
                if (post.user.id === updatedUser.id) {
                  return {
                    ...post,
                    user: {
                      ...updatedUser,
                      avatarUrl: newAvatarUrl || updatedUser.avatarUrl,
                    },
                  };
                }
                return post;
              }),
            })),
          };
        },
      );
      router.refresh();

      toast({
        description: "Hồ sơ cập nhật thành công",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Chưa thể cập nhật hồ sơ, vui lòng thử lại sau",
      });
    },
  });

  return mutation;
}
