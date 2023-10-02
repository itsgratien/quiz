import React from 'react';
import Webcam from 'react-webcam';
import { useSSR } from '@/hooks/useSSR';
import cn from 'classnames';
import style from './Start.module.scss';
import { Icon } from '@iconify/react';
import { useUpdateAttendantImageMutation } from '@/generated/graphql';
import useTodo from '@/hooks/useTodo';
import { AttendantStatus } from '@/generated/Enum';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

export const TakePicture = () => {
  const [captured, setCaptured] = React.useState<boolean>(false);

  const [init, setInit] = React.useState<boolean>(false);

  const [second, setSecond] = React.useState<number>(0);

  const [src, setSrc] = React.useState<any>();

  const webcamRef = React.useRef<any>(null);

  const isSSR = useSSR();

  const todo = useTodo();

  const { attendant, changeStatus } = todo;

  const [fn, { data, loading }] = useUpdateAttendantImageMutation();

  const upload = React.useCallback(
    async (imageSrc: string) => {
      const url = 'https://api.cloudinary.com/v1_1/heza/image/upload';

      const formData = new FormData();

      formData.append('file', imageSrc);
      formData.append('cloud_name', 'heza');
      formData.append('upload_preset', 'image_preset');

      const d = await fetch(url, { method: 'POST', body: formData });
      const data = await d.json();

      if (d.status === 200) {
        const imageLink = data.secure_url;

        if (attendant) {
          // update
          fn({ variables: { image: imageLink, attendantId: attendant._id } });
        }
      }
    },
    [fn, attendant],
  );
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCaptured(true);
    setSrc(imageSrc);
    upload(imageSrc);
  }, [upload]);

  const onInit = () => {
    setInit(true);
  };

  React.useEffect(() => {
    if (init) {
      let t;
      if (second < 3) {
        t = setTimeout(() => {
          setSecond((prev) => prev + 1);
        }, 1000);
      } else {
        if (t) {
          clearTimeout(t);
        }
      }
    }
  }, [init, second]);

  React.useEffect(() => {
    if (second === 3 && !src) {
      capture();
    }
  }, [second, capture, src]);

  React.useEffect(() => {
    if (data && data.updateAttendantImage.message && changeStatus) {
      changeStatus(AttendantStatus.InProgress);
    }
  }, [data, changeStatus]);

  if (isSSR) {
    return <></>;
  }

  return (
    <div
      className={cn(
        'relative w-full bg-white flex flex-col items-center justify-center',
      )}
    >
      <Webcam
        screenshotFormat="image/jpeg"
        audio={false}
        width={500}
        height={500}
        videoConstraints={videoConstraints}
        ref={webcamRef}
      ></Webcam>
      <div className="flex items-center justify-center">
        <button
          onClick={onInit}
          className={cn(
            style.captureBtn,
            loading ? 'cursor-not-allowed' : 'cursor-pointer',
          )}
          disabled={loading}
        >
          <Icon icon={'uil:capture'} fontSize={40} />
        </button>
      </div>
      {second > 0 && (
        <div className="font-bold mt-5" style={{ fontSize: '20px' }}>
          {second} sec
        </div>
      )}
    </div>
  );
};
export default TakePicture;
