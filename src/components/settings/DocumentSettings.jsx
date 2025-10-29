import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { Save, Upload, FileText, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function DocumentSettings({ settings, onSave, isSaving }) {
  const [formData, setFormData] = useState({
    cover_letter_prompt_1: settings?.cover_letter_prompt_1 || '',
    cover_letter_prompt_2: settings?.cover_letter_prompt_2 || ''
  });
  const [resumeUploading, setResumeUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResumeUploading(true);
    setUploadSuccess(false);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      await onSave({ ...settings, resume_file_url: file_url, setup_completed: true });
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error("Upload failed:", error);
    }
    setResumeUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...settings, ...formData, setup_completed: true });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Resume Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Upload your resume (PDF or Word). The first page should contain placeholders 
              that will be customized for each application.
            </p>
            
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload">
                <Button
                  type="button"
                  variant="outline"
                  disabled={resumeUploading}
                  onClick={() => document.getElementById('resume-upload').click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {resumeUploading ? 'Uploading...' : 'Upload Resume'}
                </Button>
              </label>
              
              {settings?.resume_file_url && (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Resume uploaded
                </span>
              )}
            </div>

            {uploadSuccess && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  Resume uploaded successfully!
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Cover Letter Templates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="prompt1">Template 1 - Professional Tone</Label>
            <Textarea
              id="prompt1"
              value={formData.cover_letter_prompt_1}
              onChange={(e) => setFormData({...formData, cover_letter_prompt_1: e.target.value})}
              className="h-40 mt-2"
              placeholder="Write a professional cover letter prompt. Example: 'Generate a formal, professional cover letter highlighting technical skills and experience. Use industry-standard language and focus on achievements...'"
            />
            <p className="text-sm text-gray-500 mt-1">
              This prompt will guide the AI to generate the first cover letter version
            </p>
          </div>

          <div>
            <Label htmlFor="prompt2">Template 2 - Personal Approach</Label>
            <Textarea
              id="prompt2"
              value={formData.cover_letter_prompt_2}
              onChange={(e) => setFormData({...formData, cover_letter_prompt_2: e.target.value})}
              className="h-40 mt-2"
              placeholder="Write a more personal cover letter prompt. Example: 'Generate a warm, enthusiastic cover letter that shows personality. Focus on passion for the role and cultural fit...'"
            />
            <p className="text-sm text-gray-500 mt-1">
              This prompt will guide the AI to generate the second cover letter version
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              className="bg-orange-500 hover:bg-orange-600"
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Templates'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}