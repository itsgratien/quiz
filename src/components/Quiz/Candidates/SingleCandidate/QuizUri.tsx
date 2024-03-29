import React from 'react';
import classname from 'classnames';
import style from './SingleCandidate.module.scss';
import { Icon } from '@iconify/react';

const QuizUri = ({ label, value }: { value: string; label?: string }) => {
  const [copy, setCopy] = React.useState<boolean>(false);

  const handleCopy = () => {
    if (navigator && navigator.clipboard) {
      setCopy(true);
      return navigator.clipboard.writeText(value);
    }
  };

  React.useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false);
      }, 1000);
    }
  }, [copy]);

  return (
    <div className={classname('relative bg-yellow', style.quizUri)}>
      <div className="ml-10 text-12 uppercase">{label || 'Quiz Link'}</div>
      <div
        className={classname(
          'relative flex items-center justify-between rounded mt-2',
          style.input
        )}
      >
        <input
          type="text"
          value={value}
          className="outline-none focus:outline-none text-12 font-bold copyInput"
          disabled
        />
        <button
          type="button"
          className={classname(
            'outline-none focus:outline-none border-none rounded-10 bg-black flex items-center justify-center'
          )}
          style={{ height: '45px', padding: '0 20px' }}
          onClick={handleCopy}
          title={!copy ? 'Click to copy' : ''}
        >
          <Icon
            icon={
              copy ? 'akar-icons:circle-check-fill' : 'fluent:copy-24-regular'
            }
            fontSize={20}
            color={copy ? '#ffec44' : 'rgba(255, 236, 68, 0.5)'}
          />
          <span
            className="text-white text-14 ml-2 font-bold"
            style={{ color: copy ? '#ffec44' : 'rgba(255, 236, 68, 0.5)' }}
          >
            Copy
          </span>
        </button>
        {copy && (
          <div
            className={classname(
              'absolute right-0 text-12 flex items-center',
              style.copied
            )}
          >
            <Icon icon="akar-icons:circle-check-fill" />
            <span className="ml-2">copied</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default QuizUri;
