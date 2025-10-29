import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ActionItems({ pendingJobs, isLoading }) {
  return (
    <Card className="border-gray-200 border-l-4 border-l-orange-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-600">
          <AlertCircle className="w-5 h-5" />
          Action Items
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-gray-500 text-center py-4">Loading...</p>
        ) : pendingJobs.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No pending actions</p>
        ) : (
          <div className="space-y-3">
            {pendingJobs.map((job) => (
              <div key={job.id} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{job.company}</h4>
                    <p className="text-xs text-gray-600">{job.title}</p>
                  </div>
                  <Badge variant="outline" className="text-xs bg-white">
                    {job.status === 'manual_required' ? 'Manual' : 'Pending'}
                  </Badge>
                </div>
                {job.url && (
                  <a 
                    href={job.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-orange-600 hover:text-orange-700 flex items-center gap-1"
                  >
                    View Posting <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}