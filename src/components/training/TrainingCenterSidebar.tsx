
import { useState } from "react";
import { Briefcase, GraduationCap, Globe, Target, ArrowLeft } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

type TrainingCenterSidebarProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
  activeModule: string;
  setActiveModule: (module: string) => void;
  activeClass: string;
  setActiveClass: (classId: string) => void;
};

const TrainingCenterSidebar = ({
  activeSection,
  setActiveSection,
  activeModule,
  setActiveModule,
  activeClass,
  setActiveClass,
}: TrainingCenterSidebarProps) => {
  const sections = [
    {
      id: "business-establishment",
      title: "Business Establishment",
      icon: Briefcase,
      modules: [
        {
          id: "module-1",
          title: "Module 1: Business Foundations",
          classes: [
            { id: "class-1", title: "Class 1: Business Structures & Legal Entities" },
            { id: "class-2", title: "Class 2: Business Planning Fundamentals" },
            { id: "class-3", title: "Class 3: Financial Basics" },
          ],
        },
        {
          id: "module-2",
          title: "Module 2: Business Registration",
          classes: [
            { id: "class-1", title: "Class 1: Registration Process" },
            { id: "class-2", title: "Class 2: Licenses & Permits" },
            { id: "class-3", title: "Class 3: Tax Considerations" },
          ],
        },
        {
          id: "module-3",
          title: "Module 3: Business Operations",
          classes: [
            { id: "class-1", title: "Class 1: Business Systems" },
            { id: "class-2", title: "Class 2: Team Building" },
            { id: "class-3", title: "Class 3: Growth Strategy" },
          ],
        },
      ],
    },
    {
      id: "online-business-types",
      title: "Online Business Types",
      icon: Globe,
      modules: [
        {
          id: "module-1",
          title: "Module 1: E-commerce Businesses",
          classes: [
            { id: "class-1", title: "Class 1: Online Retail Stores" },
            { id: "class-2", title: "Class 2: Dropshipping Models" },
            { id: "class-3", title: "Class 3: Print-on-Demand" },
          ],
        },
        {
          id: "module-2",
          title: "Module 2: Digital Products",
          classes: [
            { id: "class-1", title: "Class 1: Courses & Education" },
            { id: "class-2", title: "Class 2: E-books & Information Products" },
            { id: "class-3", title: "Class 3: Software & Apps" },
          ],
        },
        {
          id: "module-3",
          title: "Module 3: Service-Based Businesses",
          classes: [
            { id: "class-1", title: "Class 1: Consulting & Coaching" },
            { id: "class-2", title: "Class 2: Freelancing & Agency Models" },
            { id: "class-3", title: "Class 3: Subscription-Based Services" },
          ],
        },
      ],
    },
    {
      id: "marketing",
      title: "Marketing",
      icon: Target,
      modules: [
        {
          id: "module-1",
          title: "Module 1: Marketing Fundamentals",
          classes: [
            { id: "class-1", title: "Class 1: Market Research & Strategy" },
            { id: "class-2", title: "Class 2: Brand Development" },
            { id: "class-3", title: "Class 3: Customer Journey Mapping" },
          ],
        },
        {
          id: "module-2",
          title: "Module 2: Digital Marketing Channels",
          classes: [
            { id: "class-1", title: "Class 1: Content Marketing" },
            { id: "class-2", title: "Class 2: Email Marketing" },
            { id: "class-3", title: "Class 3: Social Media Marketing" },
          ],
        },
        {
          id: "module-3",
          title: "Module 3: Paid Advertising",
          classes: [
            { id: "class-1", title: "Class 1: Pay-Per-Click Fundamentals" },
            { id: "class-2", title: "Class 2: Social Media Advertising" },
            { id: "class-3", title: "Class 3: Retargeting Strategies" },
          ],
        },
      ],
    },
  ];

  const handleModuleSelection = (section: string, moduleId: string, classId: string) => {
    setActiveSection(section);
    setActiveModule(moduleId);
    setActiveClass(classId);
  };

  return (
    <Sidebar className="border-r border-military-olive/20 bg-white text-black">
      <SidebarContent>
        <div className="px-6 py-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-military-olive" />
            <h2 className="text-xl font-bold tracking-tight">TRAINING CENTER</h2>
          </div>
          <p className="mt-1 text-xs text-gray-600">
            Business Training Platform
          </p>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700">NAVIGATION</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard" className="flex items-center gap-2 text-black hover:bg-gray-100">
                    <ArrowLeft className="h-5 w-5 text-gray-700" />
                    <span>Back to Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {sections.map((section) => (
          <SidebarGroup key={section.id} className="mt-2">
            <SidebarGroupLabel className="text-gray-700 uppercase">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <Accordion type="single" collapsible className="w-full">
                {section.modules.map((module) => (
                  <AccordionItem key={module.id} value={module.id}>
                    <AccordionTrigger 
                      className={`py-2 text-sm hover:no-underline ${
                        activeModule === module.id && activeSection === section.id
                          ? "text-military-olive font-medium"
                          : ""
                      }`}
                    >
                      {module.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 pl-2">
                        {module.classes.map((classItem) => (
                          <li key={classItem.id}>
                            <button
                              onClick={() => handleModuleSelection(section.id, module.id, classItem.id)}
                              className={`w-full text-left text-sm py-1.5 px-3 rounded-md transition-colors ${
                                activeClass === classItem.id && 
                                activeModule === module.id && 
                                activeSection === section.id
                                  ? "bg-military-olive/10 text-military-olive font-medium"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              {classItem.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default TrainingCenterSidebar;
