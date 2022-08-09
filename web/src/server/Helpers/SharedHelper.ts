import slugify from 'slugify';

export const generateSlug = (value: string) =>
  slugify(
    `${value}-${Date.now()}-${Math.random() * new Date().getFullYear()}`,
    { replacement: '-', lower: true }
  );
