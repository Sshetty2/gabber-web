import { type MouseEventHandler } from 'react';
import { ChannelList, ChannelListProps } from 'stream-chat-react';

import { CreateChannel, MessagingChannelListHeader, MessagingChannelPreview } from '../index';
import { useThemeContext } from '../../context';

type MessagingSidebarProps = {
  channelListOptions: {
    filters: ChannelListProps['filters'];
    sort: ChannelListProps['sort'];
    options: ChannelListProps['options'];
  };
  onClick: MouseEventHandler;
  onCreateChannel: () => void;
  onPreviewSelect: MouseEventHandler;
  toggleMobile: () => void;
  isCreating: boolean;
  setIsCreating: (isCreating: boolean) => void;
};

const MessagingSidebar = ({
  channelListOptions,
  onClick,
  onCreateChannel,
  onPreviewSelect,
  toggleMobile,
  isCreating,
  setIsCreating
}: MessagingSidebarProps) => {
  const { themeClassName } = useThemeContext();

  return (
    <div
      className={`str-chat messaging__sidebar ${themeClassName}`}
      id="mobile-channel-list"
      onClick={onClick}
    >
      <MessagingChannelListHeader onCreateChannel={onCreateChannel} />
      <ChannelList
        {...channelListOptions}

        // @ts-ignore TODO: investigate
        Preview={props => <MessagingChannelPreview
          {...props}
          onClick={onPreviewSelect} />}
      />
      {isCreating && (
        <CreateChannel
          toggleMobile={toggleMobile}
          onClose={() => setIsCreating(false)} />
      )}
    </div>
  );
};

export default MessagingSidebar;
