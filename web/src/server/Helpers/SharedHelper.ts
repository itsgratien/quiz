import slugify from 'slugify';
import { PaginationArgs } from '@/server/TypeGraphql/Question';
import cryptr from 'cryptr';

export const generateSlug = (value: string) =>
  slugify(
    `${value}-${Date.now()}-${Math.random() * new Date().getFullYear()}`,
    { replacement: '-', lower: true }
  );

export const generatePagination = async (
  model: any,
  value: PaginationArgs,
  filter?: { [key: string]: string }
) => {
  const totalDocs = await model.find(filter || {}).countDocuments();

  const limit = value.limit || 15;

  const page = value.page > 0 ? value.page - 1 : 0;

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

export const decryptFunc = (value: string, secret?: string) =>
  new cryptr(secret || process.env.SECRET_KEY || '').decrypt(value);
