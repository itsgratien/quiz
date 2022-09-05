import React from 'react';
import style from './View.module.scss';
import classname from 'classnames';
import Modal from '../ModalContainer';
import LeftTitle from '../LeftTitle';
import SectionTitle from '../../SectionTitle';
import AnswerItem from '../../Answer/AnswerGroup/AnswerItem';
import { TestStatus } from '@/generated/Enum';
import Status from '@/components/Quiz/QuizItem/Status';
import QuestionMock from '@/mocks/Question';
import QType from '@/components/Quiz/QuestionItem/QType';

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
        <div className={style.heading}>
          <div
            style={{ width: '150px', marginLeft: '30px', marginBottom: '20px' }}
          >
            <QType name="Multiple Choice" />
          </div>
          <div className={classname('text-20')}>
            Javascript the programming language and the weird part.
          </div>
          <div
            className={classname('text-12 mt-2')}
            style={{ color: '#505050' }}
          >
            Created on 25 June 2020
          </div>
          <div style={{ marginTop: '25px' }}>
            <Status status={TestStatus.Closed} />
          </div>
        </div>
        <div className={classname(style.detailChoice)}>
          <div className={style.title}>
            <SectionTitle
              title="Choices"
              iconName="academicons:open-data"
              total="5 choices"
              iconColor="#001AFF"
              totalMarginLeft="35"
              totalMarginTop="-5px"
              textSize={14}
            />
          </div>
          <div className="w-full">
            {QuestionMock.getAll[0].choices.length > 0 && (
              <div className={classname('flex items-center flex-wrap')}>
                {QuestionMock.getAll[0].choices.map((item, itemKey) => (
                  <div
                    key={itemKey}
                    style={{
                      width: '45%',
                      margin: '15px',
                      marginTop: '0px',
                      marginBottom: '0px',
                    }}
                  >
                    <AnswerItem
                      value={item}
                      solutions={QuestionMock.getAll[0].answers}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={classname(style.heading)} style={{ marginTop: '40px' }}>
          <SectionTitle
            title="Description"
            iconName="academicons:open-data"
            iconColor="#001AFF"
          />
          <div
            className={classname(
              'text-14 mt-3 bg-f1 rounded-10',
              style.description
            )}
          >
            {QuestionMock.getAll[0].description}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QuestionDetail;
