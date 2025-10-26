"use client";

import { useSession } from "next-auth/react";

export default function DebugSessionPage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Session Debug</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Status:</h2>
          <p className="text-green-400">{status}</p>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">Session Data:</h2>
          <pre className="bg-slate-800 p-4 rounded overflow-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">User Role:</h2>
          <p className="text-blue-400">{(session?.user as any)?.role || "No role"}</p>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">User ID:</h2>
          <p className="text-blue-400">{(session?.user as any)?.id || "No ID"}</p>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">User Email:</h2>
          <p className="text-blue-400">{session?.user?.email || "No email"}</p>
        </div>
      </div>
    </div>
  );
} 