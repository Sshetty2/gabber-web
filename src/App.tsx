import { useEffect, useState } from 'react';
import { ChannelFilters, ChannelOptions, ChannelSort, StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  Window
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

const API_KEY = import.meta.env.VITE_STREAM_API_KEY; // Replace with your Stream API key
const client = StreamChat.getInstance(API_KEY);

function App () {
  const [clientReady, setClientReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const setupClient = async () => {
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

        const { token } = await response.json();

        await client.connectUser(
          {
            id  : 'example-user',
            name: 'Example User'
          },
          token
        );

        setClientReady(true);
      } catch (e) {
        console.error('Error connecting user:', error);
        setError(e instanceof Error ? e.message : 'Unknown error occurred');
      }
    };

    setupClient();

    return () => {
      client.disconnectUser();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!clientReady) {
    return <div>Loading...</div>;
  }

  const filters: ChannelFilters = {
    type   : 'messaging',
    members: { $in: ['example-user'] }
  };
  const options: ChannelOptions = {
    state   : true,
    presence: true,
    limit   : 10
  };
  const sort: ChannelSort = {
    last_message_at: -1,
    updated_at     : -1
  };

  return (
    <Chat client={client}>
      <ChannelList
        filters={filters}
        sort={sort}
        options={options}
        showChannelSearch
      />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput focus />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
}

export default App;
