import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { getImage } from './assets';
import { getChannelListOptions } from './channelListOptions';
import { ThemeContextProvider } from './context';
import { UserResponse } from 'stream-chat';
import { StreamChatGenerics } from './types';

import './index.css';
import Auth from './Auth';

const root = createRoot(document.getElementById('root')!);

const urlParams = new URLSearchParams(window.location.search);
const apiKey = urlParams.get('api_key') || import.meta.env.VITE_STREAM_API_KEY;

// TODO: get user from Amplify Auth
// const user = urlParams.get('user') || import.meta.env.VITE_USER_ID;
// const userToken = urlParams.get('user_token') || import.meta.env.VITE_USER_TOKEN;

const user = 'example-user';

const noChannelNameFilter = urlParams.get('no_channel_name_filter') || true;
const skipNameImageSet = urlParams.get('skip_name_image_set') || false;

const channelListOptions = getChannelListOptions(!!noChannelNameFilter, user);
const userToConnect: UserResponse<StreamChatGenerics> = {
  id              : user,
  name            : skipNameImageSet ? undefined : user,
  image           : skipNameImageSet ? undefined : getImage(user),
  privacy_settings: { typing_indicators: { enabled: false } }
};

root.render(
  <StrictMode>
    <ThemeContextProvider>
      <Auth
        apiKey={apiKey!}
        userToConnect={userToConnect}
        channelListOptions={channelListOptions}
      />
    </ThemeContextProvider>
  </StrictMode>
);
