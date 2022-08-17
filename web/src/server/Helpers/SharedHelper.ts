import slugify from 'slugify';
import { ModelType } from '@/generated/Shared';
import { PaginationArgs } from '@/server/TypeGraphql/Question';

export const generateSlug = (value: string) =>
  slugify(
    `${value}-${Date.now()}-${Math.random() * new Date().getFullYear()}`,
    { replacement: '-', lower: true }
  );

export const generatePagination = async (
  model: ModelType,
  value: PaginationArgs
) => {
  const totalDocs = await model.countDocuments();

  const limit = value.limit || 15;

  const page = value.page > 1 ? value.page - 1 : 0;

  const offset = limit * page;

  const totalPages = Math.ceil(totalDocs / limit);

  return {
    totalDocs,
    offset,
    limit,
    totalPages,
  };
};

export const errorResponse = (error?: string, status?: number) => ({
  error: error || 'Internal Server Error',
  status,
});
