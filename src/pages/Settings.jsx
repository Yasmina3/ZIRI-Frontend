import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Upload, FileText } from "lucide-react";

import GeneralSettings from "../components/settings/GeneralSettings";
import DocumentSettings from "../components/settings/DocumentSettings";
import SearchSettings from "../components/settings/SearchSettings";

export default function Settings() {
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);

  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const allSettings = await base44.entities.Settings.list();
      if (allSettings.length > 0) {
        return allSettings[0];
      }
      const newSettings = await base44.entities.Settings.create({
        applications_per_week: 10,
        search_radius_km: 50,
        min_fit_score: 60,
        setup_completed: false
      });
      return newSettings;
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: (data) => base44.entities.Settings.update(settings.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      setIsSaving(false);
    },
  });

  const handleSave = async (data) => {
    setIsSaving(true);
    updateSettingsMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Configure your Zivi Agent preferences</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="search">Search Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <GeneralSettings 
              settings={settings}
              onSave={handleSave}
              isSaving={isSaving}
            />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentSettings 
              settings={settings}
              onSave={handleSave}
              isSaving={isSaving}
            />
          </TabsContent>

          <TabsContent value="search">
            <SearchSettings 
              settings={settings}
              onSave={handleSave}
              isSaving={isSaving}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}