import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { Layout } from '@/components/Layout';
import classname from 'classnames';
import style from 'src/styles/Quiz.module.scss';
import Status from '@/components/Quiz/QuizItem/Status';
import QDate from '@/components/Quiz/QuizItem/QuizDate';
import Head from 'next/head';
import apollo from '@/utils/ApolloClient';
import { GetSingleTestDocument, GetSingleTestQuery } from '@/generated/graphql';
import { QuizDetailPageProps } from '@/generated/Quiz';
import NotFound from '@/components/Quiz/Setup/View/NotFound';
import QuestionAsked from '@/components/Quiz/QuizDetail/QuestionAsked';
import InvitedCandidate from '@/components/Quiz/QuizDetail/InvitedCandidate';
import Setup from '@/components/Quiz/Setup/Setup';
import SetupButtonContainer from '@/components/SetupButton/SetupButtonContainer';
import { Icon } from '@iconify/react';
import usePublishTest from '@/hooks/usePublishTest';
import Warning from '@/components/Shared/Alert/WarningAlertModal';
import { TestStatus } from '@/generated/Enum';

const QuizDetailPage: NextPage<QuizDetailPageProps> = ({ data }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const [warn, setWarn] = React.useState<boolean>(false);

  const [toggleMenu, setToggleMenu] = React.useState<boolean>(false);

  const [showPublish, setShowPublish] = React.useState<boolean>(false);

  const [showEdit, setShowEdit] = React.useState<boolean>(false);

  const { handlePublish } = usePublishTest();

  const handleEditClick = () => {
    setOpen(!open);
  };

  const handleWarning = () => {
    setWarn(!warn);
    setToggleMenu(false);
  };

  const handlePublishFunc = async () => {
    await handlePublish(data?._id);
    handleWarning();
  };

  React.useEffect(() => {
    if (
      data &&
      data.attendants &&
      data.questions &&
      data.questions.length > 0 &&
      data.attendants.length > 0
    ) {
      setShowPublish(true);
    }

    if (data && data.status === TestStatus.Draft) {
      setShowEdit(true);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Quiz</title>
      </Head>
      <Layout goBack>
        {warn && (
          <Warning
            message="Are you sure you want to publish this quiz ?"
            handleClose={handleWarning}
            open={warn}
            enable={{
              onClick: handlePublishFunc,
              name: 'Yes',
            }}
            disable={{ onClick: handleWarning, name: 'No' }}
          />
        )}
        <div className={style.quiz}>
          {data ? (
            <>
              {open && (
                <Setup
                  open={open}
                  handleClose={handleEditClick}
                  slug={data.slug}
                />
              )}
              <div className={classname('relative', style.quizDetail)}>
                <div className="text-25">{data.title}</div>
                <div className={style.status}>
                  <Status status={String(data.status)} />
                </div>
                <div style={{ marginTop: '29px' }}>
                  <QDate
                    label="start date & end date"
                    value={
                      <>
                        {new Date(data.startDate).toDateString()}&nbsp; to
                        &nbsp;
                        {new Date(data.endDate).toDateString()}
                      </>
                    }
                  />
                  <QDate
                    label="Subject"
                    value={data.subject}
                    iconName="mdi:air-humidifier"
                  />
                </div>
              </div>
              {data.questions && (
                <div
                  className={style.hr}
                  style={{ transform: 'rotate(-2.67deg)' }}
                ></div>
              )}
              <QuestionAsked testId={data._id} />
              <InvitedCandidate testId={data._id} />
              <SetupButtonContainer>
                <SetupButtonContainer.EditButton
                  handleClick={() => setToggleMenu(!toggleMenu)}
                  icon="bx:dots-horizontal"
                />
                {toggleMenu && (
                  <SetupButtonContainer.Menu>
                    <>
                      {showEdit && (
                        <li
                          className={classname('flex items-center')}
                          onClick={handleEditClick}
                        >
                          <Icon icon="iconoir:design-pencil" />
                          <span>Edit</span>
                        </li>
                      )}
                      {showPublish && (
                        <li
                          className={classname('flex items-center')}
                          onClick={handleWarning}
                        >
                          <Icon icon="ic:round-published-with-changes" />
                          <span>Publish</span>
                        </li>
                      )}
                    </>
                  </SetupButtonContainer.Menu>
                )}
              </SetupButtonContainer>
            </>
          ) : (
            <NotFound message="Quiz Not Found" alignItem="center" />
          )}

          <div className="mt-5"></div>
        </div>
      </Layout>
    </>
  );
};

export default QuizDetailPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { params }: any = ctx;

    const res = await apollo(ctx).query<GetSingleTestQuery>({
      query: GetSingleTestDocument,
      variables: { slug: params.slug },
    });

    const { getSingleTest } = res.data;

    if (getSingleTest && getSingleTest.data) {
      return {
        props: {
          data: getSingleTest.data,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    return {
      props: {},
    };
  }
};
