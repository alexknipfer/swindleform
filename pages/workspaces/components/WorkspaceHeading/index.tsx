import { useUpdateWorkspaceMutation } from '@/graphql/workspace/UpdateWorkspace.generated';
import { Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const WorkspaceHeading: React.FC<{
  workspaceName?: string;
  workspaceId: string;
  loading: boolean;
}> = ({ workspaceName, workspaceId }) => {
  const [isEditingName, setIsEditingName] = useState(false);
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
  // and to clear the updating loading state
  useEffect(() => {
    if (workspaceName && afterUpdateName && workspaceName === afterUpdateName) {
      setAfterUpdateName('');
    }
  }, [workspaceName, afterUpdateName]);

  const saveUpdate = (el: HTMLInputElement, enterPressed = false) => {
    setNewName((prev) => {
      const nextValue = el.value;

      if (!nextValue) {
        return prev;
      }

      setIsEditingName(false);
      setAfterUpdateName(nextValue);
      makeUpdate();

      if (enterPressed) {
        el.blur();
      }

      return nextValue;
    });
  };

  return (
    <Input
      size="lg"
      variant={isEditingName ? 'flushed' : 'unstyled'}
      fontWeight="bold"
      fontSize={32}
      value={newName}
      onFocus={(e) => {
        const el = e.target;
        el.setSelectionRange(0, el.value.length);
        setIsEditingName(true);
      }}
      onChange={(e) => setNewName(e.target.value)}
      onBlur={(e) => saveUpdate(e.target)}
      onKeyPress={(e) => e.key === 'Enter' && saveUpdate(e.currentTarget, true)}
    />
  );
};

export default WorkspaceHeading;
