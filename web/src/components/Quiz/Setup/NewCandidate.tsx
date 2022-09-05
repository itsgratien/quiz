import React from 'react';
import style from './Setup.module.scss';
import classname from 'classnames';
import Modal from './ModalContainer';
import Button from './Button';
import InputField from './InputField';
import { SetupAttendantSchema } from './Schema';
import { useFormik } from 'formik';
import SectionTitle from '../SectionTitle';
import LeftTitle from './LeftTitle';

const NewCandidate = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const formik = useFormik({
    initialValues: { email: '', phoneNumber: '', names: '' },
    validationSchema: SetupAttendantSchema,
    onSubmit: (value) => {},
  });
  const { values, errors } = formik;

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      nextButton={
        <Button
          type="submit"
          name="Save & Close"
          className="primary"
          handleClick={formik.handleSubmit}
        />
      }
      leftElement={<LeftTitle title="New Candidate" />}
    >
      <div
        className={classname(
          style.setup,
          style.setupQuiz,
          'flex flex-col justify-center'
        )}
        style={{ width: '32%' }}
      >
        <div className={classname('flex items-center')}>
          <div className={style.inputGroup}>
            <SectionTitle title="Full Name" textSize={14} />
            <InputField
              name="names"
              value={values.names}
              onChange={formik.handleChange}
              placeholder="Enter Names"
              error={errors.names}
            />
          </div>
          <div className={classname(style.inputGroup, 'ml-12')}>
            <SectionTitle title="Email Address" textSize={14} />
            <InputField
              name="email"
              value={values.email}
              onChange={formik.handleChange}
              placeholder="Enter Email Address"
              error={errors.email}
            />
          </div>
        </div>
        <div
          className={classname('flex items-center')}
          style={{ marginTop: '60px' }}
        >
          <div className={style.inputGroup}>
            <SectionTitle title="Phone Number" textSize={14} />
            <InputField
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={formik.handleChange}
              placeholder="Enter Phone Number"
              error={errors.phoneNumber}
              type="number"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default NewCandidate;
