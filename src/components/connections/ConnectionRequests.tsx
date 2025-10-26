"use client";

import { useState, useEffect } from "react";
import { ConnectionCard } from "./ConnectionCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Users, UserPlus, Clock } from "lucide-react";

interface Connection {
  id: string;
  status: string;
  message?: string;
  createdAt: string;
  acceptedAt?: string;
  otherUser: {
    id: string;
    fullName: string;
    profileImage?: string;
    headline?: string;
    role: string;
    companyName?: string;
    location?: string;
  };
  isInitiator: boolean;
}

interface ConnectionRequestsProps {
  onMessage?: (userId: string) => void;
}

export function ConnectionRequests({ onMessage }: ConnectionRequestsProps) {
  const [receivedRequests, setReceivedRequests] = useState<Connection[]>([]);
  const [sentRequests, setSentRequests] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("received");

  // Debug logging
  console.log('ConnectionRequests render - receivedRequests:', receivedRequests.length);
  console.log('ConnectionRequests render - sentRequests:', sentRequests.length);
  console.log('ConnectionRequests render - loading:', loading);

  useEffect(() => {
    fetchConnectionRequests();
  }, []);

  const fetchConnectionRequests = async () => {
    try {
      setLoading(true);
      
      // Fetch received requests
      console.log('Fetching received requests...');
      const receivedResponse = await fetch('/api/connections/pending?type=received');
      const receivedData = await receivedResponse.json();
      console.log('Received response:', receivedResponse.status, receivedData);
      
      // Fetch sent requests
      console.log('Fetching sent requests...');
      const sentResponse = await fetch('/api/connections/pending?type=sent');
      const sentData = await sentResponse.json();
      console.log('Sent response:', sentResponse.status, sentData);

      if (receivedResponse.ok) {
        console.log('Setting received requests:', receivedData.connections);
        console.log('Received data structure:', receivedData);
        setReceivedRequests(receivedData.connections || []);
      } else {
        console.error('Failed to fetch received requests:', receivedData);
        console.error('Response status:', receivedResponse.status);
        console.error('Response headers:', Object.fromEntries(receivedResponse.headers.entries()));
      }

      if (sentResponse.ok) {
        console.log('Setting sent requests:', sentData.connections);
        setSentRequests(sentData.connections || []);
      } else {
        console.error('Failed to fetch sent requests:', sentData);
      }
    } catch (error) {
      console.error('Error fetching connection requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (connectionId: string, newStatus: string) => {
    // Update received requests
    setReceivedRequests(prev => 
      prev.map(conn => 
        conn.id === connectionId 
          ? { ...conn, status: newStatus }
          : conn
      ).filter(conn => conn.status === 'pending')
    );

    // Update sent requests
    setSentRequests(prev => 
      prev.map(conn => 
        conn.id === connectionId 
          ? { ...conn, status: newStatus }
          : conn
      ).filter(conn => conn.status === 'pending')
    );
  };

  const handleRemove = (connectionId: string) => {
    // Remove from both lists
    setReceivedRequests(prev => prev.filter(conn => conn.id !== connectionId));
    setSentRequests(prev => prev.filter(conn => conn.id !== connectionId));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading connection requests...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Connection Requests</h2>
        <Button onClick={fetchConnectionRequests} variant="outline" size="sm">
          Refresh
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="received" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Received ({receivedRequests.length})</span>
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center space-x-2">
            <UserPlus className="h-4 w-4" />
            <span>Sent ({sentRequests.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="space-y-4">
          {receivedRequests.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No pending requests
              </h3>
              <p className="text-muted-foreground">
                You don't have any pending connection requests at the moment.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {receivedRequests.map((connection) => (
                <ConnectionCard
                  key={connection.id}
                  connection={connection}
                  onStatusChange={handleStatusChange}
                  onRemove={handleRemove}
                  onMessage={onMessage}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          {sentRequests.length === 0 ? (
            <div className="text-center py-12">
              <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No sent requests
              </h3>
              <p className="text-muted-foreground">
                You haven't sent any connection requests yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sentRequests.map((connection) => (
                <ConnectionCard
                  key={connection.id}
                  connection={connection}
                  onStatusChange={handleStatusChange}
                  onRemove={handleRemove}
                  onMessage={onMessage}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}


