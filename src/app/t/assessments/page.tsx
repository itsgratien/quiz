import { Metadata } from 'next';
import { isAuth } from '@/utils/IsAuth';
import { headers } from 'next/headers';
import Assessments from '@/components/Quiz';

export const metadata: Metadata = {
  title: 'Assessments',
};

const AssessmentsPage = async () => {
  const u = await isAuth({ cookie: headers().get('cookie') as any });

  return <Assessments me={u} />;
};
export default AssessmentsPage;
