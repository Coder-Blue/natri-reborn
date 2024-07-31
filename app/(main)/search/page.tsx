import type { Metadata } from "next";
import TrendsSidebar from "@/components/TrendsSidebar";
import SearchResults from "./SearchResults";

type SearchPageProps = {
  searchParams: { q: string };
};

export function generateMetadata({
  searchParams: { q },
}: SearchPageProps): Metadata {
  return {
    title: `Kết quả tìm kiếm cho "${q}"`,
  };
}

function SearchPage({ searchParams: { q } }: SearchPageProps) {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h1 className="line-clamp-2 break-all text-center text-2xl font-bold">
            Kết quả tìm kiếm cho &quot;{q}&quot;
          </h1>
        </div>
        <SearchResults query={q} />
      </div>
      <TrendsSidebar />
    </main>
  );
}

export default SearchPage;
