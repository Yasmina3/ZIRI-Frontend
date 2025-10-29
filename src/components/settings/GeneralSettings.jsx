import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function GeneralSettings({ settings, onSave, isSaving }) {
  const [formData, setFormData] = useState({
    applications_per_week: settings?.applications_per_week || 10,
    search_radius_km: settings?.search_radius_km || 50,
    min_fit_score: settings?.min_fit_score || 60
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...settings, ...formData, setup_completed: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="applications_per_week">Applications Per Week</Label>
            <Input
              id="applications_per_week"
              type="number"
              min="1"
              max="50"
              value={formData.applications_per_week}
              onChange={(e) => setFormData({...formData, applications_per_week: parseInt(e.target.value)})}
            />
            <p className="text-sm text-gray-500 mt-1">
              Target number of job applications to send each week
            </p>
          </div>

          <div>
            <Label htmlFor="search_radius_km">Search Radius (km)</Label>
            <Input
              id="search_radius_km"
              type="number"
              min="1"
              max="500"
              value={formData.search_radius_km}
              onChange={(e) => setFormData({...formData, search_radius_km: parseInt(e.target.value)})}
            />
            <p className="text-sm text-gray-500 mt-1">
              Maximum distance from your location for job search
            </p>
          </div>

          <div>
            <Label htmlFor="min_fit_score">Minimum Fit Score (%)</Label>
            <Input
              id="min_fit_score"
              type="number"
              min="0"
              max="100"
              value={formData.min_fit_score}
              onChange={(e) => setFormData({...formData, min_fit_score: parseInt(e.target.value)})}
            />
            <p className="text-sm text-gray-500 mt-1">
              Only apply to jobs with fit score above this threshold
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              className="bg-orange-500 hover:bg-orange-600"
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}