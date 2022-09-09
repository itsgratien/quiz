import React from 'react';
import style from './View.module.scss';
import classname from 'classnames';
import Modal from '../ModalContainer';
import LeftTitle from '../LeftTitle';
import Heading from '@/components/Quiz/QuestionDetail/Heading';
import DetailChoice from '@/components/Quiz/QuestionDetail/DetailChoice';
import Description from '@/components/Quiz/QuestionDetail/Description';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';
import NotFound from '@/components/Quiz/Setup/View/NotFound';
import useGetQuestion from '@/hooks/useGetQuestion';

const QuestionDetail = ({
  open,
  handleClose,
  questionId,
}: {
  open: boolean;
  handleClose: () => void;
  questionId: string;
}) => {
  const { data, error, loading } = useGetQuestion({ questionId });

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      leftElement={<LeftTitle title="Question" />}
    >
      <div className={classname(style.setup, style.questionDetail)}>
        {!loading && data && (
          <>
            <Heading title={data.title} status={data.status ?? undefined} />
            <div className={classname(style.detailChoice)}>
              <DetailChoice choices={data.choices ?? undefined} />
            </div>
            <div className={classname(style.description)}>
              <Description value={data.description ?? undefined} />
            </div>
          </>
        )}
        {loading && !data && <LoadingSpinner justify="center" />}
        {data && error && <NotFound message={error} />}
      </div>
    </Modal>
  );
};

export default QuestionDetail;
