import React, { useState } from 'react';
import { Bell, Cloud, AlertTriangle, Sun, Zap, Droplets } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  title: string;
  message: string;
  icon: React.ReactNode;
  timestamp: string;
  type: 'weather' | 'alert' | 'info';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Heavy Rain Alert',
    message: '🌧 Heavy rain expected in your area for the next 6 hours',
    icon: <Droplets className="w-5 h-5 text-blue-500" />,
    timestamp: '2 minutes ago',
    type: 'weather'
  },
  {
    id: '2', 
    title: 'Cyclone Warning',
    message: '🌀 Cyclone warning issued for tomorrow - take necessary precautions',
    icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
    timestamp: '15 minutes ago',
    type: 'alert'
  },
  {
    id: '3',
    title: 'Clear Skies',
    message: '☀️ Perfect weather conditions for crop spraying today',
    icon: <Sun className="w-5 h-5 text-yellow-500" />,
    timestamp: '1 hour ago',
    type: 'weather'
  },
  {
    id: '4',
    title: 'Frost Warning',
    message: '❄️ Frost warning for tonight - protect sensitive crops',
    icon: <Cloud className="w-5 h-5 text-slate-500" />,
    timestamp: '2 hours ago',
    type: 'alert'
  },
  {
    id: '5',
    title: 'Hail Alert',
    message: '🧊 Hailstorm possible in the evening - secure equipment',
    icon: <Zap className="w-5 h-5 text-purple-500" />,
    timestamp: '3 hours ago',
    type: 'alert'
  },
  {
    id: '6',
    title: 'Irrigation Reminder',
    message: '💧 Optimal conditions for irrigation detected',
    icon: <Droplets className="w-5 h-5 text-green-500" />,
    timestamp: '5 hours ago',
    type: 'info'
  }
];

const NotificationModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'alert':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'weather':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'info':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="relative p-2 rounded-lg hover:bg-accent transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
            <span className="sr-only">New notifications</span>
          </span>
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
            <Badge variant="secondary" className="ml-auto">
              {mockNotifications.length}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-96 pr-4">
          <div className="space-y-3">
            {mockNotifications.map((notification) => (
              <div 
                key={notification.id}
                className="flex gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex-shrink-0 mt-1">
                  {notification.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {notification.title}
                    </h4>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getTypeColor(notification.type)}`}
                    >
                      {notification.type}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {notification.message}
                  </p>
                  
                  <span className="text-xs text-muted-foreground">
                    {notification.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;