import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Building2, Calendar, Mail, FileText, CheckCircle } from "lucide-react";
import { format } from "date-fns";

export default function ApplicationDetails({ application, onClose, onMarkResponse }) {
  return (
    <Card className="border-gray-200 sticky top-6">
      <CardHeader className="border-b border-gray-200">
        <div className="flex justify-between items-start">
          <CardTitle>Application Details</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{application.job_title}</h3>
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 className="w-4 h-4" />
            <span className="font-medium">{application.company}</span>
          </div>
        </div>

        <div className="space-y-3">
          {application.sent_date && (
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm">
                Sent: {format(new Date(application.sent_date), 'MMMM d, yyyy')}
              </span>
            </div>
          )}
          {application.cover_letter_score && (
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                AIDA Score: {application.cover_letter_score}/100
              </Badge>
            </div>
          )}
          <div>
            <Badge variant="secondary" className="text-sm">
              Status: {application.status.replace(/_/g, ' ')}
            </Badge>
          </div>
        </div>

        {application.cover_letter_content && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Cover Letter</h4>
            <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {application.cover_letter_content}
              </p>
            </div>
          </div>
        )}

        {application.customized_resume_notes && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Resume Notes</h4>
            <p className="text-sm text-gray-600">{application.customized_resume_notes}</p>
          </div>
        )}

        {application.response_received ? (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-purple-700 mb-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Response Received</span>
            </div>
            {application.response_date && (
              <p className="text-sm text-purple-600">
                {format(new Date(application.response_date), 'MMMM d, yyyy')}
              </p>
            )}
          </div>
        ) : application.status === 'sent' && (
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => onMarkResponse(application, true)}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark Response Received
          </Button>
        )}
      </CardContent>
    </Card>
  );
}