import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import { format } from "date-fns";

import ApplicationCard from "../components/applications/ApplicationCard";
import ApplicationDetails from "../components/applications/ApplicationDetails";
import WeeklyStats from "../components/applications/WeeklyStats";

export default function Applications() {
  const [selectedApp, setSelectedApp] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  
  const queryClient = useQueryClient();

  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: () => base44.entities.Application.list("-created_date"),
    initialData: [],
  });

  const updateAppMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Application.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });

  const filteredApps = applications.filter(app => {
    if (statusFilter === "all") return true;
    return app.status === statusFilter;
  });

  const handleMarkResponse = (app, received) => {
    updateAppMutation.mutate({
      id: app.id,
      data: {
        response_received: received,
        response_date: received ? new Date().toISOString().split('T')[0] : null,
        status: received ? 'response_received' : app.status
      }
    });
  };

  const exportToCSV = () => {
    const csvData = applications.map(app => ({
      Company: app.company,
      Position: app.job_title,
      'Sent Date': app.sent_date || '-',
      Status: app.status,
      'Response Received': app.response_received ? 'Yes' : 'No',
      'Cover Letter Score': app.cover_letter_score || '-'
    }));

    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => JSON.stringify(row[header])).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `applications_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
            <p className="text-gray-600 mt-1">Track and manage your job applications</p>
          </div>
          <Button
            variant="outline"
            onClick={exportToCSV}
            disabled={applications.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        <WeeklyStats applications={applications} />

        <div className="mb-6">
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList className="bg-white border border-gray-200">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="response_received">Responses</TabsTrigger>
              <TabsTrigger value="manual_required">Manual</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              </div>
            ) : filteredApps.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                <p className="text-gray-500">No applications found</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredApps.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    onSelect={setSelectedApp}
                    onMarkResponse={handleMarkResponse}
                    isSelected={selectedApp?.id === app.id}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            {selectedApp ? (
              <ApplicationDetails
                application={selectedApp}
                onClose={() => setSelectedApp(null)}
                onMarkResponse={handleMarkResponse}
              />
            ) : (
              <div className="bg-white rounded-xl p-8 text-center border border-gray-200 sticky top-6">
                <p className="text-gray-500">Select an application to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}