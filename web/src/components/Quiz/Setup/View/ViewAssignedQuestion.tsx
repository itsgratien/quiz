import React from 'react';
import classname from 'classnames';
import style from './View.module.scss';
import Modal from '../ModalContainer';
import Button from '../Button';
import SectionTitle from '../../SectionTitle';
import NotFound from './NotFound';
import AddNewButton from './AddNewButton';
import QuestionItem from '@/components/Quiz/QuestionItem/QuestionItem';
import Grid from '@mui/material/Grid';
import SetupQuestion from '../SetupQuestion/SetupQuestion';
import LeftTitle from '../LeftTitle';
import QuestionDetail from './QuestionDetail';
import { SetupProps } from '@/generated/Shared';
import useSetup from '@/hooks/useSetup';
import { SetupStep } from '@/generated/Enum';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';
import useGetQuestionAssignedToTest from '@/hooks/useGetQuestionAssignedToTest';
import LoadMoreButton from '@/components/Quiz/LoadMoreButton';

export const ViewAssignedQuestion = ({ open, handleClose }: SetupProps) => {
  const [openQ, setOpenQ] = React.useState<boolean>(false);

  const [viewQ, setViewQ] = React.useState<boolean>(false);

  const [questionId, setQuestionId] = React.useState<string>();

  const [loadFull, setLoadFull] = React.useState<boolean>(true);

  const limit = 30;

  const setup = useSetup();

  const { test } = setup;

  const { items, handleLoadMore, loading, totalDoc, handleReload } =
    useGetQuestionAssignedToTest({ testId: test?._id, limit });

  const handleNext = () => {
    if (setup.handleStep) {
      setup.handleStep(SetupStep.Attendant);
    }
  };

  const handleLoad = async () => {
    setLoadFull(false);
    await handleLoadMore();
  };

  const handleCloseSetup = (load?: boolean) => {
    setOpenQ(false);
    setQuestionId(undefined);
    if (load) {
      setLoadFull(true);
      handleReload();
    }
  };

  const handleViewQuestion = (id: string) => {
    setViewQ(true);
    setQuestionId(id);
  };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      nextButton={
        <Button name="Next" className="next" handleClick={handleNext} />
      }
      leftElement={<LeftTitle title={test && test.title} />}
    >
      {openQ && (
        <SetupQuestion
          open={openQ}
          handleClose={handleCloseSetup}
          testId={test?._id}
        />
      )}
      {viewQ && questionId && (
        <QuestionDetail
          open={viewQ}
          handleClose={() => setViewQ(false)}
          questionId={questionId}
        />
      )}
      <div className={classname(style.setup, style.viewAssignedQuestion)}>
        {loading && loadFull ? (
          <LoadingSpinner />
        ) : (
          <>
            <SectionTitle
              title="Add Questions To The Quiz"
              titleColor="fewBlack"
              total="(Javascript programming quiz)"
              textSize={14}
              totalMarginLeft="0"
              totalColor="fewBlack"
            />
            {items && (
              <>
                {items.length > 0 ? (
                  <>
                    <div style={{ marginTop: '70px' }}>
                      <Grid container spacing={6}>
                        {items.map((item) => (
                          <Grid item xs={4} key={item._id}>
                            <QuestionItem
                              {...item}
                              handleView={() => handleViewQuestion(item._id)}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                    <AddNewButton
                      position="fixed"
                      onClick={() => setOpenQ(true)}
                    />
                  </>
                ) : (
                  <div className={classname(style.notFoundSec)}>
                    <NotFound message="There are No Questions Added, click on the button below to add new" />
                    <div style={{ marginTop: '38px' }}>
                      <AddNewButton onClick={() => setOpenQ(true)} />
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
        {items && totalDoc && totalDoc > items.length ? (
          <div className="mt-10">
            <LoadMoreButton
              handleClick={handleLoad}
              align="center"
              loading={loading}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
};

export default ViewAssignedQuestion;
