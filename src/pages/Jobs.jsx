import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import JobForm from "../components/jobs/JobForm";
import JobFilters from "../components/jobs/JobFilters";
import JobCard from "../components/jobs/JobCard";
import JobDetails from "../components/jobs/JobDetails";

export default function Jobs() {
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({ status: "all", platform: "all" });
  
  const queryClient = useQueryClient();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => base44.entities.Job.list("-created_date"),
    initialData: [],
  });

  const createJobMutation = useMutation({
    mutationFn: (jobData) => base44.entities.Job.create(jobData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      setShowForm(false);
      setEditingJob(null);
    },
  });

  const updateJobMutation = useMutation({
    mutationFn: ({ id, jobData }) => base44.entities.Job.update(id, jobData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      setShowForm(false);
      setEditingJob(null);
      if (selectedJob) {
        const updated = jobs.find(j => j.id === selectedJob.id);
        setSelectedJob(updated);
      }
    },
  });

  const deleteJobMutation = useMutation({
    mutationFn: (id) => base44.entities.Job.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      setSelectedJob(null);
    },
  });

  const handleSubmit = async (jobData) => {
    if (editingJob) {
      updateJobMutation.mutate({ id: editingJob.id, jobData });
    } else {
      createJobMutation.mutate(jobData);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const statusMatch = filters.status === "all" || job.status === filters.status;
    const platformMatch = filters.platform === "all" || job.platform === filters.platform;
    return statusMatch && platformMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Opportunities</h1>
            <p className="text-gray-600 mt-1">Manage and track job postings</p>
          </div>
          <Button 
            onClick={() => {
              setEditingJob(null);
              setShowForm(true);
            }}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Job
          </Button>
        </div>

        <AnimatePresence>
          {showForm && (
            <JobForm
              job={editingJob}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingJob(null);
              }}
            />
          )}
        </AnimatePresence>

        <JobFilters onFilterChange={setFilters} />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                <p className="text-gray-500">No jobs found. Add your first job opportunity!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                <AnimatePresence>
                  {filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onSelect={setSelectedJob}
                      onEdit={(job) => {
                        setEditingJob(job);
                        setShowForm(true);
                      }}
                      isSelected={selectedJob?.id === job.id}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            {selectedJob ? (
              <JobDetails
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
                onEdit={(job) => {
                  setEditingJob(job);
                  setShowForm(true);
                }}
                onDelete={(id) => deleteJobMutation.mutate(id)}
              />
            ) : (
              <div className="bg-white rounded-xl p-8 text-center border border-gray-200 sticky top-6">
                <p className="text-gray-500">Select a job to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}