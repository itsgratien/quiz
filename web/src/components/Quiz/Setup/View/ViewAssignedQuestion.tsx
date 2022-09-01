import React from 'react';
import classname from 'classnames';
import style from './View.module.scss';
import Modal from '../ModalContainer';
import Button from '../Button';
import SectionTitle from '../../SectionTitle';
import NotFound from './NotFound';
import QuestionMock from '@/mocks/Question';
import AddNewButton from './AddNewButton';
import QuestionItem from '@/components/Quiz/QuestionItem/QuestionItem';
import Grid from '@mui/material/Grid';
import SetupQuestion from '../SetupQuestion/SetupQuestion';

export const ViewAssignedQuestion = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose?: () => void;
}) => {
  const [openQ, setOpenQ] = React.useState<boolean>(false);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      nextButton={
        <Button name="Next" className="next" handleClick={() => ''} />
      }
      leftElement={
        <div>
          <span className="font-bold text-14 text-black">Javascript Quiz</span>
        </div>
      }
    >
      <div className={classname(style.setup, style.viewAssignedQuestion)}>
        {openQ && (
          <SetupQuestion open={openQ} handleClose={() => setOpenQ(false)} />
        )}
        <SectionTitle
          title="Add Questions To The Quiz"
          titleColor="fewBlack"
          total="(Javascript programming quiz)"
          textSize={14}
          totalMarginLeft="0"
          totalColor="fewBlack"
        />
        {QuestionMock.getAll.length > 0 ? (
          <>
            <div style={{ marginTop: '70px' }}>
              <Grid container spacing={6}>
                {QuestionMock.getAll.map((item) => (
                  <Grid item xs={4} key={item._id}>
                    <QuestionItem {...item} handleEdit={() => ''} />
                  </Grid>
                ))}
              </Grid>
            </div>
            <AddNewButton position="fixed" onClick={() => setOpenQ(true)} />
          </>
        ) : (
          <div className={classname(style.notFoundSec)}>
            <NotFound message="There are No Questions Added, click on the button below to add new" />
            <div style={{ marginTop: '38px' }}>
              <AddNewButton onClick={() => setOpenQ(true)} />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
export default ViewAssignedQuestion;
