import FormEditorLayout from '@/layouts/FormEditor';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const CreateForm: NextPage = () => {
  const { query } = useRouter();

  return (
    <FormEditorLayout>
      <h3>Create form for: {query.formId} </h3>
    </FormEditorLayout>
  );
};

export default CreateForm;
