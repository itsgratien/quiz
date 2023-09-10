import React from 'react';

export const InputError = ({ error }: { error?: string }) => {
  if (!error) {
    return <></>;
  }
  return (
    <>{error && <small className="text-red-500 font-bold">{error}</small>}</>
  );
};
export default InputError;
