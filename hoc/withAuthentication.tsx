import Chakra from '@/components/Chakra';
import { Flex, Spinner } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function withAuthentication<Props>(
  WrappedComponent: React.ComponentType<Props>,
) {
  const RequiresAuthentication = (props: Props) => {
    const router = useRouter();
    const [session, loading] = useSession();

    useEffect(() => {
      if (!session && !loading) {
        router.push('/login');
      }
    }, [session, router, loading]);

    return session ? (
      <WrappedComponent {...props} />
    ) : (
      <Chakra>
        <Flex h="full" w="full" align="center" justify="center">
          <Spinner size="lg" />
        </Flex>
      </Chakra>
    );
  };

  return RequiresAuthentication;
}

export default withAuthentication;
