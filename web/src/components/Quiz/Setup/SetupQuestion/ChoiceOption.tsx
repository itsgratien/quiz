import React from 'react';
import style from './SetupQuestion.module.scss';
import classname from 'classnames';
import { FormikProps, FieldArray } from 'formik';
import Grid from '@mui/material/Grid';
import CheckBox from './CheckBox';
import InputError from '../InputError';

export const ChoiceOption = ({
  formik,
  choices,
  errors,
}: {
  formik: FormikProps<any>;
  choices: string[];
  errors: any;
  answers?: string[];
}) => {
  const getError = (itemIndex: number) => {
    if (errors && errors.choices && errors.choices.length > 0) {
      const findError = errors.choices.find(
        (_e: any, eIndex: number) => eIndex === itemIndex
      );

      if (findError) {
        return findError;
      }
    }
    return undefined;
  };
  return (
    <div className={classname(style.inputGroup)}>
      <FieldArray
        name="choices"
        render={() => {
          return (
            <div className={classname(style.choiceOption, 'relative')}>
              {choices.length > 0 && (
                <Grid container spacing={4}>
                  {choices.map((item, itemKey) => (
                    <Grid item xs={choices.length < 5 ? 3 : 2} key={itemKey}>
                      <div
                        className={classname(
                          'flex items-center',
                          style.optionItem
                        )}
                      >
                        <div
                          className={classname(
                            'bg-f1 rounded-5',
                            style.optionInputField
                          )}
                        ></div>
                        <div className="ml-3">
                          <CheckBox label={item} onClick={(value) => ''} />
                        </div>
                      </div>
                      <InputError error={getError(itemKey)} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};
export default ChoiceOption;
