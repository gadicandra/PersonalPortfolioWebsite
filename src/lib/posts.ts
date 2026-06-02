import { prisma } from "./prisma";

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: Date;
};

export async function getAllPosts(): Promise<PostMeta[]> {
  return prisma.post.findMany({
    orderBy: { publishedAt: "desc" },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      tags: true,
      publishedAt: true,
    },
  });
}

export async function getLatestPosts(take = 3): Promise<PostMeta[]> {
  return prisma.post.findMany({
    orderBy: { publishedAt: "desc" },
    take,
    select: {
      slug: true,
      title: true,
      excerpt: true,
      tags: true,
      publishedAt: true,
    },
  });
}

export function getPostBySlug(slug: string) {
  return prisma.post.findUnique({ where: { slug } });
}

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
