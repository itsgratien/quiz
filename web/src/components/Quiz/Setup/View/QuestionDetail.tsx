import React from 'react';
import style from './View.module.scss';
import classname from 'classnames';
import Modal from '../ModalContainer';
import LeftTitle from '../LeftTitle';
import Heading from '@/components/Quiz/QuestionDetail/Heading';
import DetailChoice from '@/components/Quiz/QuestionDetail/DetailChoice';
import Description from '@/components/Quiz/QuestionDetail/Description';
import { useGetQuestionQuery } from '@/generated/graphql';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';
import NotFound from '@/components/Quiz/Setup/View/NotFound';
import { toast } from 'react-hot-toast';

const QuestionDetail = ({
  open,
  handleClose,
  questionId,
}: {
  open: boolean;
  handleClose: () => void;
  questionId: string;
}) => {
  const { data, loading } = useGetQuestionQuery({
    variables: { id: questionId },
  });

  React.useEffect(() => {
    if (data && data.getQuestion && data.getQuestion.error) {
      toast.error(data.getQuestion.error);
    }
  }, [data]);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      leftElement={<LeftTitle title="Question" />}
    >
      <div className={classname(style.setup, style.questionDetail)}>
        {!loading && data && data.getQuestion && data.getQuestion.data && (
          <>
            <Heading
              title={data.getQuestion.data.title}
              status={data.getQuestion.data.status ?? undefined}
            />
            <div className={classname(style.detailChoice)}>
              <DetailChoice
                choices={data.getQuestion.data.choices ?? undefined}
              />
            </div>
            <div className={classname(style.description)}>
              <Description
                value={data.getQuestion.data.description ?? undefined}
              />
            </div>
          </>
        )}
        {loading && !data && <LoadingSpinner justify="center" />}
        {data && data.getQuestion.error && (
          <NotFound message={data.getQuestion.error} />
        )}
      </div>
    </Modal>
  );
};

export default QuestionDetail;
