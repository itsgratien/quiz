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

  const onUpdateAnswer = (value: string) => {
    const find = formik.values.answers.find((item: string) => item === value);

    if (!find) {
      const newAnswers = [...formik.values.answers, value];
      formik.setFieldValue('answers', newAnswers);
    } else {
      const filterAnswers = formik.values.answers.filter(
        (item: string) => item !== value
      );
      formik.setFieldValue('answers', filterAnswers);
    }
  };

  return (
    <div className={classname(style.inputGroup)}>
      <FieldArray
        name="choices"
        render={(arrayHelper) => {
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
                        >
                          <textarea
                            style={{ resize: 'none', height: '100px' }}
                            className={classname(
                              'w-full outline-none focus:outline-none h-full bg-f1 pt-7 pb-1',
                              choices.length < 5 ? 'pl-10 pr-10' : 'pl-5 pr-5'
                            )}
                            placeholder="Type your answer"
                            onChange={(e) =>
                              arrayHelper.replace(itemKey, e.target.value)
                            }
                            value={item}
                          >
                            {item}
                          </textarea>
                        </div>
                        <div className="ml-3">
                          <CheckBox
                            label={item}
                            onClick={onUpdateAnswer}
                            value={formik.values.answers.find(
                              (a: string) => a === item
                            )}
                          />
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
