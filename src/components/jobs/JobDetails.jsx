import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  X, 
  Edit, 
  Trash2, 
  Sparkles, 
  Mail,
  Loader2,
  ExternalLink,
  MapPin,
  DollarSign,
  Briefcase
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function JobDetails({ job, onClose, onEdit, onDelete }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState(null);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const generateCoverLetter = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const settingsList = await base44.entities.Settings.list();
      const settings = settingsList[0];
      
      if (!settings?.cover_letter_prompt_1 || !settings?.cover_letter_prompt_2) {
        setError("Please configure cover letter templates in Settings first");
        setIsGenerating(false);
        return;
      }

      // Generate two versions
      const [letter1, letter2] = await Promise.all([
        base44.integrations.Core.InvokeLLM({
          prompt: `${settings.cover_letter_prompt_1}\n\nJob Description:\n${job.description}\n\nJob Title: ${job.title}\nCompany: ${job.company}`,
          response_json_schema: {
            type: "object",
            properties: {
              letter: { type: "string" },
              aida_score: { type: "number" }
            }
          }
        }),
        base44.integrations.Core.InvokeLLM({
          prompt: `${settings.cover_letter_prompt_2}\n\nJob Description:\n${job.description}\n\nJob Title: ${job.title}\nCompany: ${job.company}`,
          response_json_schema: {
            type: "object",
            properties: {
              letter: { type: "string" },
              aida_score: { type: "number" }
            }
          }
        })
      ]);

      const bestLetter = letter1.aida_score >= letter2.aida_score ? letter1 : letter2;
      setGeneratedLetter(bestLetter);

      // Create application
      await base44.entities.Application.create({
        job_id: job.id,
        job_title: job.title,
        company: job.company,
        cover_letter_content: bestLetter.letter,
        cover_letter_score: bestLetter.aida_score,
        status: job.email ? 'ready' : 'manual_required'
      });

      // Update job status
      await base44.entities.Job.update(job.id, {
        status: 'processed'
      });

      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      
    } catch (err) {
      setError("Failed to generate cover letter. Please try again.");
      console.error(err);
    }
    
    setIsGenerating(false);
  };

  const sendApplication = async () => {
    if (!job.email) {
      setError("No email address available for this job");
      return;
    }

    setIsGenerating(true);
    try {
      await base44.integrations.Core.SendEmail({
        to: job.email,
        subject: `Application for ${job.title} - ${job.company}`,
        body: generatedLetter?.letter || "Please find my application attached."
      });

      // Update application status
      const apps = await base44.entities.Application.filter({ job_id: job.id });
      if (apps.length > 0) {
        await base44.entities.Application.update(apps[0].id, {
          status: 'sent',
          sent_date: new Date().toISOString().split('T')[0]
        });
      }

      await base44.entities.Job.update(job.id, {
        status: 'sent'
      });

      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      
    } catch (err) {
      setError("Failed to send application. Please try manually.");
    }
    setIsGenerating(false);
  };

  return (
    <Card className="border-gray-200 sticky top-6">
      <CardHeader className="border-b border-gray-200">
        <div className="flex justify-between items-start">
          <CardTitle>Job Details</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
          <p className="text-lg text-gray-600 font-medium">{job.company}</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          {job.location && (
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{job.location}</span>
            </div>
          )}
          {job.salary_range && (
            <div className="flex items-center gap-2 text-gray-700">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span>{job.salary_range}</span>
            </div>
          )}
          {job.job_type && (
            <div className="flex items-center gap-2 text-gray-700">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span>{job.job_type}</span>
            </div>
          )}
        </div>

        {job.description && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {job.description.substring(0, 300)}
              {job.description.length > 300 && '...'}
            </p>
          </div>
        )}

        {job.fit_score && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">AI Analysis</h4>
            <div className="space-y-2">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Fit Score: {job.fit_score}%
              </Badge>
              {job.interview_likelihood && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  Interview Likelihood: {job.interview_likelihood}%
                </Badge>
              )}
            </div>
          </div>
        )}

        {generatedLetter && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">Cover Letter Generated!</h4>
            <p className="text-sm text-green-700">
              AIDA Score: {generatedLetter.aida_score}/100
            </p>
          </div>
        )}

        <div className="space-y-3">
          {job.status === 'pending' && (
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600"
              onClick={generateCoverLetter}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Cover Letter
                </>
              )}
            </Button>
          )}

          {job.status === 'processed' && job.email && (
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={sendApplication}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Application
                </>
              )}
            </Button>
          )}

          {job.url && (
            <a href={job.url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Posting
              </Button>
            </a>
          )}

          <Button
            variant="outline"
            className="w-full"
            onClick={() => onEdit(job)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Job
          </Button>

          <Button
            variant="outline"
            className="w-full text-red-600 hover:text-red-700"
            onClick={() => {
              if (confirm('Are you sure you want to delete this job?')) {
                onDelete(job.id);
              }
            }}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Job
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}