import React from 'react';
import NewsNotificationPopup from './NewsNotificationPopup';
import type { NewsNotification } from '../../hooks/useNewsNotification';

interface NewsNotificationContainerProps {
  notifications: NewsNotification[];
  onRemoveNotification: (id: string) => void;
}

const NewsNotificationContainer: React.FC<NewsNotificationContainerProps> = ({
  notifications,
  onRemoveNotification,
}) => {
  // Only show the most recent notification (latest one)
  const latestNotification = notifications[notifications.length - 1];

  if (!latestNotification) {
    return null;
  }

  return (
    <NewsNotificationPopup
      key={latestNotification.id}
      content={latestNotification.content}
      priority={latestNotification.priority}
      autoCloseAfter={latestNotification.autoCloseAfter}
      showIcon={latestNotification.showIcon}
      onClose={() => onRemoveNotification(latestNotification.id)}
    />
  );
};

export default NewsNotificationContainer;
