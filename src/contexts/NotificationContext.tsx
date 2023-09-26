import { notification } from 'antd';
import { ReactNode, createContext, useContext } from 'react';

export type ViewType = 'list' | 'grid';

export const defaultNotificationContext = {
  showNotification: () => {},
};

type Notification = {
  message: string;
  description: string;
  type?: 'success' | 'error';
};

type NotificationContextType = {
  showNotification: (val: Notification) => void;
};

export const NotificationContext = createContext<NotificationContextType>(
  defaultNotificationContext
);

export const usePage = () => useContext(NotificationContext);

interface NotificationProviderProps {
  children: ReactNode;
}
const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const showNotification = ({ type, message, description }: Notification) => {
    switch (type) {
      case 'error':
        return notification.error({
          message: message,
          description: description,
        });
      case 'success':
        return notification.success({
          message: message,
          description: message,
        });
      default:
        return notification.open({
          message: message,
          description: message,
        });
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
