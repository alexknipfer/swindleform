import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRef } from 'react';
import { useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { UserQueryResponse, USER_QUERY } from '@/queries/userQuery';
import {
  CreateWorkspaceMutationResponse,
  CREATE_WORKSPACE_MUTATION,
} from '@/mutations/createWorkspace';
import { useRouter } from 'next/router';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  workspaceName: Yup.string().required('Required'),
});

const AddWorkspaceModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [mutate] = useMutation<CreateWorkspaceMutationResponse>(
    CREATE_WORKSPACE_MUTATION,
  );
  const router = useRouter();
  const {
    errors,
    touched,
    values,
    isValid,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      workspaceName: '',
    },
    initialErrors: {
      workspaceName: '',
    },
    validationSchema,
    onSubmit: async ({ workspaceName }) => {
      const result = await mutate({
        variables: { name: workspaceName },
        optimisticResponse: {
          createWorkspace: {
            id: uuidv4(),
            workspaceName,
            users: [],
            formCount: 0,
          },
        },
        update: (proxy, { data: { createWorkspace } }) => {
          const cache = proxy.readQuery<UserQueryResponse>({
            query: USER_QUERY,
          });

          proxy.writeQuery({
            query: USER_QUERY,
            data: {
              user: {
                ...cache.user,
                workspaces: [...cache.user.workspaces, createWorkspace],
              },
            },
          });
        },
      });
      onClose();
      router.push(`/workspaces/${result.data.createWorkspace.id}`);
    },
  });

  const initialRef = useRef();
  const finalRef = useRef();

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>Create Workspace</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl
              isInvalid={errors.workspaceName && touched.workspaceName}
            >
              <FormLabel htmlFor="workspaceName">Workspace Name</FormLabel>
              <Input
                type="text"
                id="workspaceName"
                name="workspaceName"
                ref={initialRef}
                placeholder="Enter a name for your workspace"
                value={values.workspaceName}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.workspaceName}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              isDisabled={!isValid}
              isLoading={isSubmitting}
              loadingText="Submitting"
            >
              Create Workspace
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddWorkspaceModal;
