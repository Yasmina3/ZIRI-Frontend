import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Save, Plus, X, Search } from "lucide-react";

export default function SearchSettings({ settings, onSave, isSaving }) {
  const [keywords, setKeywords] = useState(settings?.search_keywords || []);
  const [platforms, setPlatforms] = useState(settings?.preferred_platforms || []);
  const [newKeyword, setNewKeyword] = useState('');
  const [newPlatform, setNewPlatform] = useState('');

  const addKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const addPlatform = () => {
    if (newPlatform && !platforms.includes(newPlatform)) {
      setPlatforms([...platforms, newPlatform]);
      setNewPlatform('');
    }
  };

  const removePlatform = (platform) => {
    setPlatforms(platforms.filter(p => p !== platform));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ 
      ...settings, 
      search_keywords: keywords,
      preferred_platforms: platforms,
      setup_completed: true
    });
  };

  const commonPlatforms = ["LinkedIn", "Indeed", "StepStone", "Xing", "Monster"];

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Job Keywords</Label>
            <p className="text-sm text-gray-500 mb-3">
              Add keywords that describe the types of jobs you're looking for
            </p>
            <div className="flex gap-2 mb-3">
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="e.g., software engineer, data analyst"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
              />
              <Button type="button" onClick={addKeyword} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {keyword}
                  <button
                    type="button"
                    onClick={() => removeKeyword(keyword)}
                    className="ml-2 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Preferred Platforms</Label>
            <p className="text-sm text-gray-500 mb-3">
              Select job platforms you want to search on
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {commonPlatforms.map((platform) => (
                <Button
                  key={platform}
                  type="button"
                  variant={platforms.includes(platform) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (platforms.includes(platform)) {
                      removePlatform(platform);
                    } else {
                      setPlatforms([...platforms, platform]);
                    }
                  }}
                  className={platforms.includes(platform) ? "bg-orange-500 hover:bg-orange-600" : ""}
                >
                  {platform}
                </Button>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <Input
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value)}
                placeholder="Add custom platform"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPlatform())}
              />
              <Button type="button" onClick={addPlatform} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {platforms.filter(p => !commonPlatforms.includes(p)).map((platform, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {platform}
                  <button
                    type="button"
                    onClick={() => removePlatform(platform)}
                    className="ml-2 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              className="bg-orange-500 hover:bg-orange-600"
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Preferences'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}