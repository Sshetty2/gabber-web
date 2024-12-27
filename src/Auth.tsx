import { useEffect, useState } from 'react';
import { ChannelFilters, ChannelOptions, ChannelSort } from 'stream-chat';
import App from './App';

type AppProps = {
    apiKey: string;
    userToConnect: { id: string; name?: string; image?: string };
    channelListOptions: {
      options: ChannelOptions;
      filters: ChannelFilters;
      sort: ChannelSort;
    };
  };

const Auth = (props: AppProps) => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/stream/token`, {
          method : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body   : JSON.stringify({ userId: 'example-user' })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to get token');
        }

        const { token: _token } = await response.json();
        setToken(_token);
      } catch (e) {
        console.error('Error connecting user:', error);
        setError(e instanceof Error ? e.message : 'Unknown error occurred');
      }
    };

    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: show error message
  if (error || !token) {
    return <div>Error: {error}</div>;
  }

  return (
    <App
      {...props}
      userToken={token}
    />
  );
};

export default Auth;
