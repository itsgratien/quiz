import React from 'react';
import style from './View.module.scss';
import classname from 'classnames';
import Modal from '../ModalContainer';
import LeftTitle from '../LeftTitle';
import SectionTitle from '../../SectionTitle';
import QuestionMock from '@/mocks/Question';
import Heading from '@/components/Quiz/QuestionDetail/Heading';
import DetailChoice from '@/components/Quiz/QuestionDetail/DetailChoice';
import Description from '@/components/Quiz/QuestionDetail/Description';

const QuestionDetail = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      leftElement={<LeftTitle title="Question" />}
    >
      <div className={classname(style.setup, style.questionDetail)}>
        <Heading />
        <div className={classname(style.detailChoice)}>
          <DetailChoice />
        </div>
        <div className={classname(style.description)}>
          <Description />
        </div>
      </div>
    </Modal>
  );
};

export default QuestionDetail;
