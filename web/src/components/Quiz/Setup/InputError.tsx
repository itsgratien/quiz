import React from 'react';

const InputError = ({ error }: { error?: string }) => {
  return (
    <>{error && <small className="text-red-500 font-bold">{error}</small>}</>
  );
};
export default InputError;
