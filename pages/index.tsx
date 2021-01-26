import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';
import { Spinner } from '@chakra-ui/react';

const Home: React.FC = () => {
  const [session, loading] = useSession();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Home</h1>
      <Link href="/workspaces">Go to Workspaces</Link>
      {session && (
        <div>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </div>
  );
};

export default Home;
