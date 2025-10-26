"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { ConnectionCard } from "@/components/connections/ConnectionCard";
import { ConnectionRequests } from "@/components/connections/ConnectionRequests";
import { SuggestedPeople } from "@/components/feed/SuggestedPeople";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  UserPlus, 
  Search, 
  Loader2, 
  MessageCircle,
  Building,
  MapPin,
  Badge as BadgeIcon,
  Briefcase
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

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

interface Suggestion {
  id: string;
  fullName: string;
  profileImage?: string;
  headline?: string;
  role: string;
  companyName?: string;
  location?: string;
  mutualConnections: number;
  skills?: string[];
  industry?: string;
}

export default function NetworkPage() {
  const { data: session, status } = useSession();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("connections");

  useEffect(() => {
    if (session?.user) {
      fetchConnections();
      fetchSuggestions();
    }
  }, [session]);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/connections?status=accepted');
      const data = await response.json();
      
      if (response.ok) {
        setConnections(data.connections || []);
      }
    } catch (error) {
      console.error('Error fetching connections:', error);
      toast.error('Failed to load connections');
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async () => {
    try {
      console.log('Fetching suggestions...');
      const response = await fetch('/api/connections/suggestions?limit=10');
      console.log('Suggestions response status:', response.status);
      const data = await response.json();
      console.log('Suggestions response data:', data);
      
      if (response.ok) {
        setSuggestions(data.suggestions || []);
      } else {
        console.error('Failed to fetch suggestions:', data);
        toast.error('Failed to load suggestions');
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      toast.error('Failed to load suggestions');
    }
  };

  const handleConnect = async (userId: string, message?: string) => {
    try {
      const response = await fetch('/api/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUserId: userId, message })
      });
      
      if (response.ok) {
        // Remove from suggestions only after successful request
        setSuggestions(prev => prev.filter(suggestion => suggestion.id !== userId));
        toast.success('Connection request sent!', {
          description: 'The person will be notified about your request',
          duration: 4000
        });
      } else {
        let errorData: any = {};
        try {
          errorData = await response.json();
        } catch (e) {
          console.error('Failed to parse error response:', e);
        }
        console.error('Connection request failed:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        throw new Error(errorData?.error || `Failed to send connection request (${response.status})`);
      }
    } catch (error) {
      console.error('Error sending connection request:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send connection request');
    }
  };

  const handleStatusChange = (connectionId: string, newStatus: string) => {
    setConnections(prev => 
      prev.map(conn => 
        conn.id === connectionId 
          ? { ...conn, status: newStatus }
          : conn
      ).filter(conn => conn.status === 'accepted')
    );
  };

  const handleRemove = (connectionId: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId));
  };

  const handleMessage = (userId: string) => {
    // Navigate to messaging with this user
    console.log('Starting conversation with user:', userId);
    window.location.href = `/messages?user=${userId}`;
  };

  const filteredConnections = connections.filter(conn =>
    conn.otherUser.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conn.otherUser.headline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conn.otherUser.companyName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your network</h2>
          <Button asChild>
            <a href="/auth/jobseeker/login">Login</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">My Network</h1>
          <p className="text-muted-foreground">
            Connect with professionals and grow your network
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="connections" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Connections ({connections.length})</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center space-x-2">
              <UserPlus className="h-4 w-4" />
              <span>Requests</span>
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Suggestions</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connections" className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search connections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={fetchConnections} variant="outline" size="sm">
                Refresh
              </Button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span>Loading connections...</span>
                </div>
              </div>
            ) : filteredConnections.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {searchQuery ? 'No connections found' : 'No connections yet'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery 
                    ? 'Try adjusting your search terms'
                    : 'Start building your professional network by connecting with others'
                  }
                </p>
                {!searchQuery && (
                  <Button onClick={() => setActiveTab('suggestions')}>
                    Find People to Connect With
                  </Button>
                )}
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatePresence>
                  {filteredConnections.map((connection, index) => (
                    <motion.div
                      key={connection.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                      className="transform-gpu"
                    >
                      <ConnectionCard
                        connection={connection}
                        onStatusChange={handleStatusChange}
                        onRemove={handleRemove}
                        onMessage={handleMessage}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="requests">
            <ConnectionRequests onMessage={handleMessage} />
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                People You May Know
              </h2>
              <Button onClick={fetchSuggestions} variant="outline" size="sm">
                Refresh
              </Button>
            </div>

            {suggestions.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No suggestions available
                </h3>
                <p className="text-muted-foreground">
                  We couldn't find any new people to suggest at the moment.
                </p>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <AnimatePresence>
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                      className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-all duration-300 transform-gpu"
                    >
                    <div className="flex items-start space-x-3">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {suggestion.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-foreground text-sm">
                            {suggestion.fullName}
                          </h3>
                          <Badge 
                            variant={suggestion.role === 'recruiter' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {suggestion.role === 'recruiter' ? 'Recruiter' : 'Job Seeker'}
                          </Badge>
                        </div>
                        
                        {suggestion.headline && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {suggestion.headline}
                          </p>
                        )}

                        <div className="flex items-center space-x-1 text-xs text-muted-foreground mb-2">
                          {suggestion.companyName && (
                            <>
                              <Building className="h-3 w-3" />
                              <span>{suggestion.companyName}</span>
                              <span>•</span>
                            </>
                          )}
                          {suggestion.location && (
                            <>
                              <MapPin className="h-3 w-3" />
                              <span>{suggestion.location}</span>
                            </>
                          )}
                        </div>

                        {suggestion.industry && (
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground mb-2">
                            <Briefcase className="h-3 w-3" />
                            <span>{suggestion.industry}</span>
                          </div>
                        )}

                        {suggestion.skills && suggestion.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {suggestion.skills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {suggestion.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{suggestion.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}

                        {suggestion.mutualConnections > 0 && (
                          <p className="text-xs text-blue-600">
                            {suggestion.mutualConnections} mutual connection{suggestion.mutualConnections > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Button
                        size="sm"
                        onClick={() => handleConnect(suggestion.id)}
                        className="flex-1"
                      >
                        <UserPlus className="h-4 w-4 mr-1" />
                        Connect
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMessage(suggestion.id)}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

