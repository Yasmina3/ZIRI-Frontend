import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  processed: "bg-blue-100 text-blue-800 border-blue-200",
  sent: "bg-green-100 text-green-800 border-green-200",
  manual_required: "bg-orange-100 text-orange-800 border-orange-200",
  archived: "bg-gray-100 text-gray-800 border-gray-200"
};

export default function RecentJobs({ jobs, isLoading }) {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-orange-600" />
            Recent Jobs
          </CardTitle>
          <Link to={createPageUrl("Jobs")} className="text-sm text-orange-600 hover:text-orange-700">
            View All →
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="border-b border-gray-100 pb-4">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No jobs yet. Add your first opportunity!</p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{job.title}</h4>
                    <p className="text-sm text-gray-600">{job.company}</p>
                  </div>
                  {job.url && (
                    <a 
                      href={job.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:text-orange-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {job.location && (
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </div>
                  )}
                  <Badge variant="secondary" className={`${statusColors[job.status]} border text-xs`}>
                    {job.status.replace(/_/g, ' ')}
                  </Badge>
                  {job.fit_score && (
                    <Badge variant="outline" className="text-xs">
                      Fit: {job.fit_score}%
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}