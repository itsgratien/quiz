import React from 'react';
import classname from 'classnames';
import style from './QuestionDetail.module.scss';
import SectionTitle from '@/components/Quiz/SectionTitle';
import QuestionMock from '@/mocks/Question';
import AnswerItem from '@/components/Quiz/Answer/AnswerGroup/AnswerItem';

const DetailChoice = ({
  titleMarginLeft,
  choices,
}: {
  titleMarginLeft?: string;
  choices?: string[];
}) => {
  return (
    <div className={classname(style.detailChoice, 'w-full')}>
      <div style={{ marginLeft: titleMarginLeft || '25%' }}>
        <SectionTitle
          title="Choices"
          iconName="academicons:open-data"
          total={choices && `${choices.length} choices`}
          iconColor="#001AFF"
          totalMarginLeft="35"
          totalMarginTop="-5px"
          textSize={14}
        />
      </div>
      <div className="w-full">
        {choices && choices.length > 0 && (
          <div className={classname('flex items-center flex-wrap')}>
            {choices.map((item, itemKey) => (
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
  );
};
export default DetailChoice;
