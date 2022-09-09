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
import { get } from 'lodash';

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

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      leftElement={<LeftTitle title="Question" />}
    >
      <div className={classname(style.setup, style.questionDetail)}>
        {!loading && data && data.getQuestion && (
          <>
            <Heading
              title={get(data.getQuestion.data, 'title', '')}
              status={get(data.getQuestion.data, 'status', undefined)}
            />
            <div className={classname(style.detailChoice)}>
              <DetailChoice
                choices={get(data.getQuestion.data, 'choices', undefined)}
              />
            </div>
            <div className={classname(style.description)}>
              <Description
                value={get(data.getQuestion.data, 'description', '')}
              />
            </div>
          </>
        )}
        {loading && !data && <LoadingSpinner alignItem="center" />}
      </div>
    </Modal>
  );
};

export default QuestionDetail;
