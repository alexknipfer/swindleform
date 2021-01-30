import { Heading } from '@chakra-ui/react';
import WorkspacesLayout from '@/layouts/Workspaces';
import withAuthentication from '@/hoc/withAuthentication';
import { useRouter } from 'next/router';
import { gql, useMutation, useQuery } from '@apollo/client';
import { WorkspaceSnapshot } from '@/models/workspace';
import { Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  UpdateWorkspaceMutationResponse,
  UPDATE_WORKSPACE_MUTATION,
} from '@/mutations/updateWorkspace';

const WorkspaceQuery = gql`
  query workspace($workspaceId: String!) {
    workspace(workspaceId: $workspaceId) {
      id
      workspaceName
      users
      formCount
    }
  }
`;

const WorkspaceHeading: React.FC<{
  workspaceId: string;
  workspaceName?: string;
}> = ({ workspaceName, workspaceId }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(workspaceName ? workspaceName : '');
  const [afterUpdateName, setAfterUpdateName] = useState('');
  const [mutate] = useMutation<
    UpdateWorkspaceMutationResponse,
    { name: string; id: string }
  >(UPDATE_WORKSPACE_MUTATION);

  const makeUpdate = async () => {
    await mutate({ variables: { name: newName, id: workspaceId } });
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
              makeUpdate();

              return next;
            });
          }}
          placeholder={workspaceName}
        />
      ) : (
        // this handles when update is sent over network but isn't refetched yet
        // aka my hacky version of optimistic UI
        afterUpdateName || workspaceName
      )}
    </Heading>
  );
};

const Workspaces: React.FC = () => {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;

  const { data } = useQuery<
    {
      workspace: WorkspaceSnapshot;
    },
    { workspaceId: string }
  >(WorkspaceQuery, { variables: { workspaceId } });

  console.log({ data });

  return (
    <WorkspacesLayout>
      <WorkspaceHeading
        workspaceId={workspaceId}
        workspaceName={!!data && data.workspace.workspaceName}
      />
    </WorkspacesLayout>
  );
};

export default withAuthentication(Workspaces);
