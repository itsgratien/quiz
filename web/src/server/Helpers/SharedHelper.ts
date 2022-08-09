import slugify from 'slugify';
import { ModelType, PaginationArg } from '@/generated/Shared';

export const generateSlug = (value: string) =>
  slugify(
    `${value}-${Date.now()}-${Math.random() * new Date().getFullYear()}`,
    { replacement: '-', lower: true }
  );

export const generatePagination = async (
  model: ModelType,
  value: PaginationArg
) => {
  const totalDocs = await model.countDocuments();

  const limit = value.limit || 15;

  const offset = limit * value.page + 1;

  return {
    totalDocs,
    offset,
  };
};
