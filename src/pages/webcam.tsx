import React from 'react';
import type { NextPage } from 'next';
import Webcam from 'react-webcam';
import { useSSR } from '@/hooks/useSSR';

const WebCamPage: NextPage = () => {
  const webcamRef = React.useRef<any>(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log('imageSrc:', imageSrc);
  }, [webcamRef]);

  const isSSR = useSSR();

  if (isSSR) {
    return <></>;
  }

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };
  return (
    <>
      <h1>welcome</h1>
      <Webcam
        screenshotFormat="image/jpeg"
        audio={false}
        width={500}
        height={500}
        videoConstraints={videoConstraints}
        ref={webcamRef}
      ></Webcam>
      <button onClick={capture}>Capture photo</button>
    </>
  );
};
export default WebCamPage;
