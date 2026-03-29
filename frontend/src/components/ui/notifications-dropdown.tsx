"use client"

import * as React from "react"
import { Bell, Check, X, Trash2, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "info" | "success" | "warning" | "error"
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New expense added",
    description: "Your expense of $45.50 for lunch has been recorded",
    time: "2 min ago",
    read: false,
    type: "success"
  },
  {
    id: "2",
    title: "Budget alert",
    description: "You've used 80% of your monthly budget",
    time: "1 hour ago",
    read: false,
    type: "warning"
  },
  {
    id: "3",
    title: "Monthly report ready",
    description: "Your expense report for November is ready to view",
    time: "3 hours ago",
    read: true,
    type: "info"
  }
]

export function NotificationsDropdown() {
  const [notifications, setNotifications] = React.useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = React.useState(false)
  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success": return "🟢"
      case "warning": return "🟡"
      case "error": return "🔴"
      default: return "🔵"
    }
  }

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-primary/10 transition-colors"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive hover:bg-destructive/80">
                {unreadCount}
              </Badge>
            )}
            <span className="sr-only">Notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-80 p-0 z-50"
          sideOffset={10}
        >
          <div className="bg-background/95 backdrop-blur-md border border-border/50 shadow-2xl">
            <div className="flex items-center justify-between p-4 bg-background/80">
              <DropdownMenuLabel className="text-base font-medium p-0">
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {unreadCount} unread
                  </Badge>
                )}
              </DropdownMenuLabel>
              <div className="flex gap-1">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="h-8 px-2 text-xs"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Mark all read
                  </Button>
                )}
                {notifications.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllNotifications}
                    className="h-8 px-2 text-xs"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Clear all
                  </Button>
                )}
              </div>
            </div>
            <Separator />
            <div className="max-h-96 overflow-y-auto bg-background/60">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div key={notification.id} className="relative">
                    <DropdownMenuItem
                      className="flex flex-col items-start p-4 cursor-pointer hover:bg-accent/70 transition-colors"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <span className="text-lg flex-shrink-0">{getNotificationIcon(notification.type)}</span>
                        <div className="flex-1 space-y-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium truncate ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 break-words">
                            {notification.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.time}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            clearNotification(notification.id)
                          }}
                          className="h-6 w-6 p-0 opacity-50 hover:opacity-100 flex-shrink-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </DropdownMenuItem>
                    {notification.id !== notifications[notifications.length - 1].id && (
                      <Separator />
                    )}
                  </div>
                ))
              )}
            </div>
            {notifications.length > 0 && (
              <>
                <Separator />
                <div className="p-2 bg-background/80">
                  <DropdownMenuItem className="w-full justify-center cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Notification Settings</span>
                  </DropdownMenuItem>
                </div>
              </>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
