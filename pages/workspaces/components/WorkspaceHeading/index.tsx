import { useUpdateWorkspaceMutation } from '@/graphql/workspace/UpdateWorkspace.generated';
import { Heading, Spinner, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const WorkspaceHeading: React.FC<{
  workspaceName?: string;
  workspaceId: string;
  loading: boolean;
}> = ({ workspaceName, workspaceId, loading }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newName, setNewName] = useState(workspaceName ? workspaceName : '');
  const [afterUpdateName, setAfterUpdateName] = useState('');
  const [mutate] = useUpdateWorkspaceMutation();

  const makeUpdate = async () => {
    await mutate({ variables: { id: workspaceId, name: newName } });
  };

  // this is so the input element starts with the existing workspace name
  // (which isn't immediately available)
  useEffect(() => {
    if (!workspaceName) {
      return;
    }

    setNewName(workspaceName);
  }, [workspaceName]);

  // this is to clear the afterUpdateName once the workspaceName has been refetched

  useEffect(() => {
    if (workspaceName && afterUpdateName && workspaceName === afterUpdateName) {
      setAfterUpdateName('');
      setIsUpdating(false);
    }
  }, [workspaceName, afterUpdateName]);

  return (
    <Heading
      _hover={{ cursor: 'pointer' }}
      onClick={() => setIsEditingName(true)}
      as="h1"
    >
      {isEditingName ? (
        <Input
          size="large"
          fontWeight="bold"
          value={newName}
          autoFocus
          onFocus={(e) => {
            const el = e.target;
            el.setSelectionRange(0, el.value.length);
          }}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={(e) => {
            /**
             * update UI logic
             * setIsEditing changes H1 to an input
             * afterUpdateName is to maintain new name until it's refetched
             * makeUpdate triggers the mutation with the latest input data
             */
            setNewName((prev) => {
              const next = e.target.value;

              if (!next) {
                return prev;
              }

              setIsEditingName(false);
              setAfterUpdateName(next);
              setIsUpdating(true);
              makeUpdate();

              return next;
            });
          }}
          placeholder={workspaceName}
        />
      ) : // this handles when update is sent over network but isn't refetched yet
      // aka my hacky version of optimistic UI
      loading || isUpdating ? (
        <Spinner />
      ) : (
        workspaceName || 'Manage Workspaces'
      )}
    </Heading>
  );
};

export default WorkspaceHeading;
