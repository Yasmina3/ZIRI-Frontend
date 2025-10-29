import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Briefcase, 
  Send, 
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  Settings as SettingsIcon
} from "lucide-react";

import StatsOverview from "../components/dashboard/StatsOverview";
import WeeklyProgress from "../components/dashboard/WeeklyProgress";
import RecentJobs from "../components/dashboard/RecentJobs";
import ActionItems from "../components/dashboard/ActionItems";
import SetupPrompt from "../components/dashboard/SetupPrompt";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };
    loadUser();
  }, []);

  const { data: settings, isLoading: settingsLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const allSettings = await base44.entities.Settings.list();
      return allSettings.length > 0 ? allSettings[0] : null;
    },
    initialData: null,
  });

  const { data: jobs, isLoading: jobsLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => base44.entities.Job.list("-created_date", 10),
    initialData: [],
  });

  const { data: applications, isLoading: appsLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: () => base44.entities.Application.list("-created_date"),
    initialData: [],
  });

  const isSetupComplete = settings?.setup_completed;

  if (settingsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!isSetupComplete) {
    return <SetupPrompt />;
  }

  const pendingJobs = jobs.filter(j => j.status === 'pending' || j.status === 'manual_required');
  const thisWeekApps = applications.filter(app => {
    const appDate = new Date(app.sent_date || app.created_date);
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    return appDate >= weekStart;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back{user?.full_name ? `, ${user.full_name}` : ''}!
          </h1>
          <p className="text-gray-600">
            Here's your job application overview
          </p>
        </div>

        {/* Stats Overview */}
        <StatsOverview 
          totalJobs={jobs.length}
          applicationsThisWeek={thisWeekApps.length}
          targetPerWeek={settings?.applications_per_week || 10}
          pendingActions={pendingJobs.length}
          responseRate={applications.length > 0 
            ? Math.round((applications.filter(a => a.response_received).length / applications.length) * 100)
            : 0
          }
        />

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            <WeeklyProgress 
              applications={applications}
              targetPerWeek={settings?.applications_per_week || 10}
            />
            
            <RecentJobs jobs={jobs.slice(0, 5)} isLoading={jobsLoading} />
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            <ActionItems 
              pendingJobs={pendingJobs}
              isLoading={jobsLoading}
            />

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to={createPageUrl("Jobs")} className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Add New Job
                  </Button>
                </Link>
                <Link to={createPageUrl("Applications")} className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Send className="w-4 h-4 mr-2" />
                    View All Applications
                  </Button>
                </Link>
                <Link to={createPageUrl("Settings")} className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <SettingsIcon className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}