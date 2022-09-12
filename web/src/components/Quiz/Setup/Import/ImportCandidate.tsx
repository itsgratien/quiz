import React from 'react';
import style from './Import.module.scss';
import classname from 'classnames';
import Modal from '../ModalContainer';
import Button from '../Button';
import LeftTitle from '../LeftTitle';
import NB from './NB';
import * as sheet from 'xlsx';
import Grid from '@mui/material/Grid';
import CandidateItem from '../../Candidates/CandidateItem';
import { AttendantStatus } from '@/generated/Enum';
import ImportButton from './ImportButton';
import { toast } from 'react-hot-toast';

const ImportCandidate = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: (reload?: boolean) => void;
}) => {
  const [showNextButton, setShowNextButton] = React.useState<boolean>(false);

  const [items, setItems] =
    React.useState<{ names: string; email: string; phoneNumber: string }[]>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileReader = new FileReader();
      setShowNextButton(false);

      fileReader.onload = (event) => {
        if (event.target && event.target.result) {
          const data = event.target.result;

          const workbook = sheet.read(data, { type: 'array' });

          const sheetName = workbook.SheetNames[0];

          const worksheet = workbook.Sheets[sheetName];

          const json: any = sheet.utils.sheet_to_json(worksheet);

          let error;

          if (json) {
            for (const j of json) {
              if (!j.email || !j.names) {
                error = 'emails & names must be available';
              }
            }
            if (error) {
              toast.error(error);
            } else {
              setItems(json);
              setShowNextButton(true);
            }
          }
        }
      };
      fileReader.readAsArrayBuffer(e.target.files[0]);
    } else {
      return undefined;
    }
  };

  const handleRemove = (itemKey: number) => {
    if (items && items.length > 0) {
      const filter = items.filter((_item, index) => index !== itemKey);
      setItems(filter);
    }
  };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      nextButton={
        showNextButton ? (
          <Button
            type="submit"
            name="Accept & Close"
            className="accept"
            handleClick={() => handleClose(true)}
          />
        ) : undefined
      }
      leftElement={<LeftTitle title="Import New Candidate" />}
    >
      <div className={classname(style.setup, style.importCandidate)}>
        {items && items.length > 0 ? (
          <div className="relative">
            <div style={{ marginBottom: '20px' }}>
              <span
                className={classname('text-14')}
                style={{ color: 'rgba(0, 0, 0, 0.5)' }}
              >
                {items.length} candidates imported
              </span>
            </div>
            <Grid spacing={6} container>
              {items.map((item, itemKey) => (
                <Grid xs={4} item key={itemKey}>
                  <CandidateItem
                    {...item}
                    handleEdit={() => ''}
                    status={AttendantStatus.Started}
                    handleRemove={() => handleRemove(itemKey)}
                  />
                </Grid>
              ))}
            </Grid>
            <div className={classname('fixed bottom-10 right-10')}>
              <ImportButton handleChange={handleFileChange} />
            </div>
          </div>
        ) : (
          <NB handleChange={handleFileChange} />
        )}
      </div>
    </Modal>
  );
};
export default ImportCandidate;
