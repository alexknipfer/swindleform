import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';

const Home: React.FC = () => {
  const [session] = useSession();

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
