"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestPage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Test Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Session Status:</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Status: {status}
              </p>
              {session?.user && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    User: {session.user.name || session.user.email}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Role: {session.user.role}
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Quick Navigation:</h3>
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm">
                  <a href="/">Home</a>
                </Button>
                <Button asChild size="sm">
                  <a href="/dashboard">Dashboard</a>
                </Button>
                <Button asChild size="sm">
                  <a href="/login">Login</a>
                </Button>
                <Button asChild size="sm">
                  <a href="/signup">Signup</a>
                </Button>
                <Button asChild size="sm">
                  <a href="/packages">Packages</a>
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Environment Check:</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                NEXTAUTH_URL: {process.env.NEXTAUTH_URL || 'Not set'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                NEXTAUTH_SECRET: {process.env.NEXTAUTH_SECRET ? 'Set' : 'Not set'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 