import { allCoreContent, sortPosts } from '@shipixen/pliny/utils/contentlayer';
import { allBlogs } from 'shipixen-contentlayer/generated';
import { POSTS_PER_PAGE } from '@/app/all-deals/settings';
import ListLayout from '@/layouts/ListLayoutWithTags';
import Header from '@/components/shared/Header';

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));

  return paths;
};

export default function Page({ params }: { params: { page: string } }) {
  const posts = allCoreContent(sortPosts(allBlogs));
  const pageNumber = parseInt(params.page as string);
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber,
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return (
    <div className="flex flex-col w-full items-center justify-between">
      <Header />

      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Deals"
      />
    </div>
  );
}
