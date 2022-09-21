import type { NextPage, GetServerSidePropsContext } from 'next';
import * as React from 'react';
import { withAuth } from '@/utils/WithAuth';
import Layout from '@/components/Layout';
import Head from 'next/head';
import classname from 'classnames';
import style from 'src/styles/Candidate.module.scss';
import Status from '@/components/Quiz/QuizItem/Status';
import Svg from '@/components/Quiz/Candidates/SingleCandidate/SVG';
import CandidateLabel from '@/components/Quiz/Candidates/SingleCandidate/CandidateLabel';
import QuizUri from '@/components/Quiz/Candidates/SingleCandidate/QuizUri';
import SectionTitle from '@/components/Quiz/SectionTitle';
import AnswerGroup from '@/components/Quiz/Answer/AnswerGroup/AnswerGroup';
import apollo from '@/utils/ApolloClient';
import {
  GetAttendantByIdDocument,
  GetAttendantByIdQuery,
  GetAttendantByIdQueryVariables,
  Attendant,
  Question,
} from '@/generated/graphql';
import { TestStatus } from '@/generated/Enum';
import NotFound from '@/components/Quiz/Setup/View/NotFound';
import useGetQuestion from '@/hooks/useGetQuestionAssignedToTest';

const CandidatePage: NextPage<{
  data?: Attendant;
  error?: string;
}> = ({ data }) => {
  const [showResult, setShowResult] = React.useState<boolean>(false);

  const { items, loading } = useGetQuestion({
    testId: data?.test?._id,
    limit: 100,
  });

  React.useEffect(() => {
    if (data && data.test) {
      setShowResult(data.test.status === TestStatus.Published);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>{`Candidate | ${data && data.names}`}</title>
      </Head>
      <Layout goBack>
        {data && (
          <>
            <div className={classname('relative', style.header)}>
              <Svg />
              <div
                className={classname(
                  'absolute top-0 right-0 left-0 z-10 w-full'
                )}
              >
                <div style={{ marginTop: '53px', marginLeft: '15%' }}>
                  <div className={classname('font-bold text-25 capitalize')}>
                    {data.names}
                  </div>
                  <Status
                    status={String(data.status)}
                    size="12"
                    bold
                    className="mt-19"
                  />
                </div>
                {showResult && (
                  <div className={classname('absolute top-0 right-20 mt-30')}>
                    <div className="flex items-center">
                      <span
                        className={classname('font-bold text-20 text-black')}
                      >
                        50%
                      </span>
                      <span
                        className={classname('font-bold text-f1 text-15 ml-2')}
                        style={{ color: 'rgba(0, 0, 0, 0.28)' }}
                      >
                        Overall grade
                      </span>
                    </div>
                    <div className={classname('font-bold text-right text-14')}>
                      {data.status}
                    </div>
                  </div>
                )}
                <div style={{ marginLeft: '13%', marginTop: '27px' }}>
                  <div className="flex items-center">
                    <CandidateLabel
                      label="Email Address"
                      value={data.email}
                      iconName="eva:email-outline"
                    />
                    <CandidateLabel
                      label="Phone Number"
                      value={data.phoneNumber}
                      iconName="bi:phone"
                    />
                  </div>
                  {data.testUri && (
                    <div>
                      <QuizUri value={data.testUri} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={classname('relative', style.result)}>
              <div className={style.sectionTitle}>
                <SectionTitle title="Final Results" iconName="wpf:statistics" />
                <div
                  className="text-12"
                  style={{
                    color: 'rgba(0, 0, 0, 0.6)',
                    width: '186px',
                    marginLeft: '32px',
                  }}
                >
                  Questions asked and answers of each provided by the attendants
                </div>
              </div>
              <div>
                {items && items.length > 0 ? (
                  <>
                    {items.map((item) => (
                      <AnswerGroup
                        key={item._id}
                        item={item as Question}
                        testId={data.test?._id}
                        attendantId={data._id}
                      />
                    ))}
                  </>
                ) : (
                  <div className="mt-5">
                    <NotFound message=" " alignItem="start" />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};
export default CandidatePage;

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  withAuth(context, async () => {
    try {
      const { id } = context.params as any;

      const res = await apollo(context).query<
        GetAttendantByIdQuery,
        GetAttendantByIdQueryVariables
      >({
        query: GetAttendantByIdDocument,
        variables: { attendantId: id },
      });

      const { getAttendantById } = res.data;

      if (getAttendantById && getAttendantById.data) {
        return {
          props: {
            data: getAttendantById.data,
            error: getAttendantById.error,
          },
        };
      }
      return {
        notFound: true,
      };
    } catch (error) {
      return {
        props: {},
      };
    }
  });
