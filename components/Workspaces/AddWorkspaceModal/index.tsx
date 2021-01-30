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
import { FocusableElement } from '@chakra-ui/utils';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import USER_QUERY from '@/queries/UserQuery.graphql';
import { useRouter } from 'next/router';
import {
  useCreateWorkspaceMutation,
  UserQuery,
} from 'generated/apolloComponents';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  workspaceName: Yup.string().required('Required'),
});

const AddWorkspaceModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [mutate] = useCreateWorkspaceMutation();
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
        update: (proxy, { data }) => {
          try {
            const cachedUserData = proxy.readQuery<UserQuery>({
              query: USER_QUERY,
            });

            if (!cachedUserData || !data) {
              return;
            }

            proxy.writeQuery<UserQuery>({
              query: USER_QUERY,
              data: {
                user: {
                  ...cachedUserData.user,
                  workspaces: [
                    ...cachedUserData.user.workspaces,
                    data.createWorkspace,
                  ],
                },
              },
            });
          } catch (e) {
            console.error(e);
            onClose();

            return;
          }
        },
      });
      onClose();

      if (result.data) {
        router.push(`/workspaces/${result.data?.createWorkspace.id}`);
      }
    },
  });

  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<FocusableElement>(null);

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
              isInvalid={!!errors.workspaceName && touched.workspaceName}
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
