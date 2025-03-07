
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Briefcase, FileText, Medal, PlayCircle } from "lucide-react";

const IntelligenceRepository = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-military-navy">Intelligence Repository</h2>
        <div className="inline-flex items-center gap-2">
          <span className="text-sm font-medium text-military-navy/70">RESOURCES:</span>
          <span className="font-bold text-military-olive">75 Available</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="rounded-full w-10 h-10 bg-military-olive/20 flex items-center justify-center mb-3">
              <Briefcase className="h-5 w-5 text-military-olive" />
            </div>
            <CardTitle>Sector-Specific Intelligence</CardTitle>
            <CardDescription>
              Business intelligence reports customized to your industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-military-navy/70">
              Access detailed case studies and market analyses for your specific business sector.
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-military-navy/70">12 resources available</span>
              <span className="text-military-olive text-sm font-medium">View All</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="rounded-full w-10 h-10 bg-military-olive/20 flex items-center justify-center mb-3">
              <Medal className="h-5 w-5 text-military-olive" />
            </div>
            <CardTitle>Veteran-Specific Resources</CardTitle>
            <CardDescription>
              Grant opportunities and support programs for veterans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-military-navy/70">
              Discover funding opportunities, grants, and support programs exclusively for veteran entrepreneurs.
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-military-navy/70">23 resources available</span>
              <span className="text-military-olive text-sm font-medium">View All</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="rounded-full w-10 h-10 bg-military-olive/20 flex items-center justify-center mb-3">
              <PlayCircle className="h-5 w-5 text-military-olive" />
            </div>
            <CardTitle>Tactical Briefings & Training</CardTitle>
            <CardDescription>
              Video training sessions and recorded briefings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-military-navy/70">
              Access recorded training sessions, masterclasses, and tactical briefings from industry experts.
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-military-navy/70">18 resources available</span>
              <span className="text-military-olive text-sm font-medium">View All</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="rounded-full w-10 h-10 bg-military-olive/20 flex items-center justify-center mb-3">
              <FileText className="h-5 w-5 text-military-olive" />
            </div>
            <CardTitle>Standard Operating Procedures</CardTitle>
            <CardDescription>
              Business templates and operational frameworks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-military-navy/70">
              Download ready-to-use templates for business processes, policies, and operational frameworks.
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-military-navy/70">15 resources available</span>
              <span className="text-military-olive text-sm font-medium">View All</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="rounded-full w-10 h-10 bg-military-olive/20 flex items-center justify-center mb-3">
              <BookOpen className="h-5 w-5 text-military-olive" />
            </div>
            <CardTitle>Knowledge Base & Field Manual</CardTitle>
            <CardDescription>
              Comprehensive guides and FAQ documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-military-navy/70">
              Access searchable knowledge base articles, how-to guides, and frequently asked questions.
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-military-navy/70">27 resources available</span>
              <span className="text-military-olive text-sm font-medium">View All</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recently Added Intelligence</CardTitle>
          <CardDescription>
            Latest resources and materials added to the repository
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start justify-between rounded-md border border-military-tan p-3">
              <div className="flex items-start gap-3">
                <PlayCircle className="mt-1 h-5 w-5 flex-shrink-0 text-military-olive" />
                <div>
                  <h4 className="font-medium text-military-navy">Digital Marketing Tactical Operation</h4>
                  <p className="text-sm text-military-navy/70">Learn how to deploy effective digital marketing campaigns on a limited budget.</p>
                </div>
              </div>
              <span className="text-xs text-military-navy/70">3 days ago</span>
            </div>
            
            <div className="flex items-start justify-between rounded-md border border-military-tan p-3">
              <div className="flex items-start gap-3">
                <FileText className="mt-1 h-5 w-5 flex-shrink-0 text-military-olive" />
                <div>
                  <h4 className="font-medium text-military-navy">Business Resilience Field Guide</h4>
                  <p className="text-sm text-military-navy/70">Comprehensive guide to building a crisis-resistant business operation.</p>
                </div>
              </div>
              <span className="text-xs text-military-navy/70">1 week ago</span>
            </div>
            
            <div className="flex items-start justify-between rounded-md border border-military-tan p-3">
              <div className="flex items-start gap-3">
                <Medal className="mt-1 h-5 w-5 flex-shrink-0 text-military-olive" />
                <div>
                  <h4 className="font-medium text-military-navy">2024 Veteran Business Grant Directory</h4>
                  <p className="text-sm text-military-navy/70">Updated list of grants, loans, and funding opportunities for veteran entrepreneurs.</p>
                </div>
              </div>
              <span className="text-xs text-military-navy/70">2 weeks ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntelligenceRepository;
