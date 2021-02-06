import WorkspacesLayout from '@/layouts/Workspaces';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const CreateForm: NextPage = () => {
  const { query } = useRouter();

  return (
    <WorkspacesLayout>
      <h3>Create form for: {query.formId} </h3>
    </WorkspacesLayout>
  );
};

export default CreateForm;
