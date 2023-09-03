import { Metadata } from 'next';
import { headers } from 'next/headers';
import apollo from '@/utils/ApolloClient';
import { GetSingleTestDocument, GetSingleTestQuery } from '@/generated/graphql';

const getAssessment = async (slug?: string) => {
  const cookie = headers().get('cookie');

  try {
    const res = await apollo({ cookie } as any).query<GetSingleTestQuery>({
      query: GetSingleTestDocument,
      variables: { slug },
    });

    const { getSingleTest } = res.data;

    if (getSingleTest.data) {
      return {
        data: getSingleTest.data,
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    return {
      error: 'internal server error',
    };
  }
};

interface AssessmentDetailPageProps {
  params: {
    slug: string;
  };
}
const AssessmentDetailPage = async ({ params }: AssessmentDetailPageProps) => {
  const res = await getAssessment(params.slug);

  console.log('tes:', res);

  return (
    <>
      <h1>hello</h1>
    </>
  );
};
export default AssessmentDetailPage;
