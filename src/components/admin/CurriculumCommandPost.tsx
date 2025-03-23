
import React, { useState } from "react";
import { Book, Calendar, FileText, FolderPlus, BarChart2, ClipboardList, FileQuestion, Pencil, FilePlus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CurriculumCommandPost = () => {
  const { toast } = useToast();
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
  const [isNewLessonDialogOpen, setIsNewLessonDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<{type: 'lesson' | 'quiz' | 'assignment', item: any} | null>(null);
  const [newLessonData, setNewLessonData] = useState({
    title: '',
    description: '',
    duration: '',
    status: 'Draft'
  });

  const handleManageModule = (moduleIndex: number) => {
    setSelectedModule(moduleIndex);
    setIsModuleDialogOpen(true);
    
    toast({
      title: `Module ${moduleIndex + 1} Selected`,
      description: `Now managing ${getModuleName(moduleIndex)}`,
    });
  };

  const handleNewModule = () => {
    toast({
      title: "Create New Module",
      description: "Module creation interface will be available soon.",
    });
  };

  const handleNewLesson = () => {
    setNewLessonData({
      title: '',
      description: '',
      duration: '',
      status: 'Draft'
    });
    setIsNewLessonDialogOpen(true);
  };

  const handleEditItem = (type: 'lesson' | 'quiz' | 'assignment', item: any) => {
    setEditItem({ type, item });
    setIsEditDialogOpen(true);
  };

  const handleSaveNewLesson = () => {
    // In a real app, this would save to a database
    toast({
      title: "Lesson Created",
      description: `"${newLessonData.title}" has been added to ${getModuleName(selectedModule || 0)}`,
    });
    setIsNewLessonDialogOpen(false);
  };

  const handleSaveEdit = () => {
    if (!editItem) return;
    
    toast({
      title: `${editItem.type.charAt(0).toUpperCase() + editItem.type.slice(1)} Updated`,
      description: `"${editItem.item.title}" has been updated`,
    });
    setIsEditDialogOpen(false);
    setEditItem(null);
  };

  const getModuleName = (index: number) => {
    const moduleNames = [
      'Military to Business Mindset',
      'Mission Analysis & Opportunity Identification',
      'Market Research Operations',
      'Business Model Development',
      'Financial Planning & Strategy',
      'Marketing & Customer Acquisition',
      'Operational Planning',
      'Launch Preparation & Execution'
    ];
    
    return moduleNames[index] || `Module ${index + 1}`;
  };

  // Sample data for the module content
  const getModuleLessons = (moduleIndex: number) => {
    const lessonCounts = [5, 6, 4, 7, 5, 6, 4, 5];
    const count = lessonCounts[moduleIndex] || 4;
    
    return Array.from({ length: count }).map((_, i) => ({
      id: `lesson-${moduleIndex}-${i}`,
      title: `Lesson ${i + 1}: ${i === 0 ? 'Introduction to ' : ''}${getModuleName(moduleIndex).split(' & ')[i % 2 || 0]}`,
      status: i < 2 ? 'Published' : i === 2 ? 'Draft' : 'Planned',
      duration: `${15 + i * 5} min`,
      createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
    }));
  };

  const getModuleQuizzes = (moduleIndex: number) => {
    const quizCount = Math.max(2, moduleIndex % 3 + 1);
    
    return Array.from({ length: quizCount }).map((_, i) => ({
      id: `quiz-${moduleIndex}-${i}`,
      title: `${getModuleName(moduleIndex)} Assessment ${i + 1}`,
      status: i === 0 ? 'Published' : 'Draft',
      questions: 5 + i * 3,
      passingScore: '70%',
      timeLimit: `${10 + i * 5} min`,
    }));
  };

  const getModuleAssignments = (moduleIndex: number) => {
    const assignmentCount = Math.max(2, (moduleIndex % 4) + 2);
    
    return Array.from({ length: assignmentCount }).map((_, i) => ({
      id: `assignment-${moduleIndex}-${i}`,
      title: `Assignment ${i + 1}: ${i === 0 ? 'Apply ' : 'Develop '}${getModuleName(moduleIndex).split(' & ')[0]}`,
      status: i === 0 ? 'Published' : i === 1 ? 'Draft' : 'Planned',
      dueDate: new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      points: (i + 1) * 10,
      type: i % 2 === 0 ? 'Individual' : 'Group',
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          Curriculum Command Post
        </h2>
        <div className="flex items-center gap-2">
          <Button 
            className="bg-military-olive hover:bg-military-olive/90"
            onClick={handleNewModule}
          >
            <FolderPlus className="mr-2 h-4 w-4" />
            New Module
          </Button>
        </div>
      </div>

      <Tabs defaultValue="modules">
        <TabsList className="mb-4">
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="modules">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className={selectedModule === index ? "ring-2 ring-military-olive" : ""}>
                <CardHeader className={`${index < 3 ? 'bg-military-navy/10' : ''}`}>
                  <div className="flex items-center justify-between">
                    <CardTitle>Module {index + 1}</CardTitle>
                    <div className="rounded-full px-2 py-1 text-xs bg-military-navy text-military-sand">
                      {index < 3 ? 'Deployed' : index === 3 ? 'Active' : 'Upcoming'}
                    </div>
                  </div>
                  <CardDescription>
                    {index === 0 && 'Military to Business Mindset'}
                    {index === 1 && 'Mission Analysis & Opportunity Identification'}
                    {index === 2 && 'Market Research Operations'}
                    {index === 3 && 'Business Model Development'}
                    {index === 4 && 'Financial Planning & Strategy'}
                    {index === 5 && 'Marketing & Customer Acquisition'}
                    {index === 6 && 'Operational Planning'}
                    {index === 7 && 'Launch Preparation & Execution'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-military-olive" />
                      <span className="text-sm">
                        {index < 3 ? 'Completed' : index === 3 ? 'Week 2 of 3' : `Starts ${3 + index} weeks from now`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-military-olive" />
                      <span className="text-sm">{4 + index} lessons</span>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200 mb-3">
                    <div 
                      className="h-full rounded-full bg-military-olive" 
                      style={{ width: `${index < 3 ? 100 : index === 3 ? 65 : 0}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {index < 3 ? 'Completion rate: 98%' : index === 3 ? 'In progress' : 'Not started'}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleManageModule(index)}
                    >
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assignments">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Management</CardTitle>
              <CardDescription>Create, edit, and track assignments</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedModule !== null ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Managing Assignments for Module {selectedModule + 1}: {getModuleName(selectedModule)}
                  </h3>
                  <div className="border rounded-lg p-4 bg-military-beige/10">
                    <p className="text-sm text-muted-foreground">
                      Assignment management interface for this module will be available soon.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Select a module above to manage its assignments.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Resource Library</CardTitle>
              <CardDescription>Manage educational resources and materials</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedModule !== null ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Managing Resources for Module {selectedModule + 1}: {getModuleName(selectedModule)}
                  </h3>
                  <div className="border rounded-lg p-4 bg-military-beige/10">
                    <p className="text-sm text-muted-foreground">
                      Resource management interface for this module will be available soon.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Select a module above to manage its resources.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Curriculum Performance Analytics</CardTitle>
                <CardDescription>Insights into curriculum effectiveness</CardDescription>
              </div>
              <BarChart2 className="h-5 w-5 text-military-olive" />
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h4 className="mb-2 text-sm font-semibold">Module Completion Rates</h4>
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-28 text-sm">Module {index + 1}</div>
                        <div className="flex-1 h-8 bg-slate-100 rounded-md">
                          <div 
                            className="h-full rounded-md bg-military-olive flex items-center justify-end px-2"
                            style={{ width: `${98 - index * 5}%` }}
                          >
                            <span className="text-xs font-medium text-white">{98 - index * 5}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-semibold">Average Time Spent Per Module</h4>
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-28 text-sm">Module {index + 1}</div>
                        <div className="flex-1 h-8 bg-slate-100 rounded-md">
                          <div 
                            className="h-full rounded-md bg-military-navy flex items-center justify-end px-2"
                            style={{ width: `${70 + index * 10}%` }}
                          >
                            <span className="text-xs font-medium text-white">{14 + index * 2} hours</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Module Management Dialog */}
      <Dialog open={isModuleDialogOpen} onOpenChange={setIsModuleDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedModule !== null && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                  Module {selectedModule + 1}: {getModuleName(selectedModule)}
                </DialogTitle>
              </DialogHeader>
              
              <Tabs defaultValue="lessons" className="mt-4">
                <TabsList className="mb-4 grid grid-cols-3 gap-2">
                  <TabsTrigger value="lessons" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Lessons
                  </TabsTrigger>
                  <TabsTrigger value="quizzes" className="flex items-center">
                    <FileQuestion className="mr-2 h-4 w-4" />
                    Quizzes
                  </TabsTrigger>
                  <TabsTrigger value="assignments" className="flex items-center">
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Assignments
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="lessons" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Module Lessons</h3>
                    <Button 
                      size="sm" 
                      className="bg-military-olive hover:bg-military-olive/90"
                      onClick={handleNewLesson}
                    >
                      <FilePlus className="mr-2 h-4 w-4" /> 
                      New Lesson
                    </Button>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getModuleLessons(selectedModule).map((lesson) => (
                        <TableRow key={lesson.id}>
                          <TableCell className="font-medium">{lesson.title}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              lesson.status === 'Published' ? 'bg-green-100 text-green-800' :
                              lesson.status === 'Draft' ? 'bg-amber-100 text-amber-800' :
                              'bg-slate-100 text-slate-800'
                            }`}>
                              {lesson.status}
                            </span>
                          </TableCell>
                          <TableCell>{lesson.duration}</TableCell>
                          <TableCell>{lesson.createdAt}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditItem('lesson', lesson)}
                            >
                              <Pencil className="mr-1 h-3.5 w-3.5" />
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="quizzes" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Module Quizzes</h3>
                    <Button size="sm" className="bg-military-olive hover:bg-military-olive/90">
                      <FileQuestion className="mr-2 h-4 w-4" /> 
                      New Quiz
                    </Button>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Questions</TableHead>
                        <TableHead>Passing Score</TableHead>
                        <TableHead>Time Limit</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getModuleQuizzes(selectedModule).map((quiz) => (
                        <TableRow key={quiz.id}>
                          <TableCell className="font-medium">{quiz.title}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              quiz.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {quiz.status}
                            </span>
                          </TableCell>
                          <TableCell>{quiz.questions}</TableCell>
                          <TableCell>{quiz.passingScore}</TableCell>
                          <TableCell>{quiz.timeLimit}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditItem('quiz', quiz)}
                            >
                              <Pencil className="mr-1 h-3.5 w-3.5" />
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="assignments" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Module Assignments</h3>
                    <Button size="sm" className="bg-military-olive hover:bg-military-olive/90">
                      <ClipboardList className="mr-2 h-4 w-4" /> 
                      New Assignment
                    </Button>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getModuleAssignments(selectedModule).map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell className="font-medium">{assignment.title}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              assignment.status === 'Published' ? 'bg-green-100 text-green-800' :
                              assignment.status === 'Draft' ? 'bg-amber-100 text-amber-800' :
                              'bg-slate-100 text-slate-800'
                            }`}>
                              {assignment.status}
                            </span>
                          </TableCell>
                          <TableCell>{assignment.dueDate}</TableCell>
                          <TableCell>{assignment.points}</TableCell>
                          <TableCell>{assignment.type}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditItem('assignment', assignment)}
                            >
                              <Pencil className="mr-1 h-3.5 w-3.5" />
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* New Lesson Dialog */}
      <Dialog open={isNewLessonDialogOpen} onOpenChange={setIsNewLessonDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Lesson</DialogTitle>
            <DialogDescription>
              Add a new lesson to {selectedModule !== null ? getModuleName(selectedModule) : 'the module'}.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="lesson-title">Lesson Title</Label>
              <Input 
                id="lesson-title" 
                placeholder="Enter lesson title" 
                value={newLessonData.title}
                onChange={(e) => setNewLessonData({...newLessonData, title: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="lesson-description">Description</Label>
              <Textarea 
                id="lesson-description" 
                placeholder="Enter lesson description"
                rows={3}
                value={newLessonData.description}
                onChange={(e) => setNewLessonData({...newLessonData, description: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="lesson-duration">Duration (minutes)</Label>
                <Input 
                  id="lesson-duration" 
                  placeholder="e.g. 30" 
                  value={newLessonData.duration}
                  onChange={(e) => setNewLessonData({...newLessonData, duration: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="lesson-status">Status</Label>
                <Select 
                  value={newLessonData.status}
                  onValueChange={(value) => setNewLessonData({...newLessonData, status: value})}
                >
                  <SelectTrigger id="lesson-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Planned">Planned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewLessonDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveNewLesson}>Create Lesson</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit {editItem?.type.charAt(0).toUpperCase()}{editItem?.type.slice(1)}
            </DialogTitle>
            <DialogDescription>
              Update the details for "{editItem?.item?.title}".
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="item-title">Title</Label>
              <Input 
                id="item-title" 
                placeholder="Enter title" 
                defaultValue={editItem?.item?.title || ''}
              />
            </div>
            
            {editItem?.type === 'lesson' && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="item-duration">Duration</Label>
                  <Input 
                    id="item-duration" 
                    placeholder="Enter duration" 
                    defaultValue={editItem?.item?.duration || ''}
                  />
                </div>
              </>
            )}
            
            {editItem?.type === 'quiz' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="item-questions">Questions</Label>
                    <Input 
                      id="item-questions" 
                      placeholder="Number of questions" 
                      defaultValue={editItem?.item?.questions || ''}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="item-time-limit">Time Limit</Label>
                    <Input 
                      id="item-time-limit" 
                      placeholder="Time limit" 
                      defaultValue={editItem?.item?.timeLimit || ''}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="item-passing-score">Passing Score</Label>
                  <Input 
                    id="item-passing-score" 
                    placeholder="Passing score" 
                    defaultValue={editItem?.item?.passingScore || ''}
                  />
                </div>
              </>
            )}
            
            {editItem?.type === 'assignment' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="item-due-date">Due Date</Label>
                    <Input 
                      id="item-due-date" 
                      placeholder="Due date" 
                      defaultValue={editItem?.item?.dueDate || ''}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="item-points">Points</Label>
                    <Input 
                      id="item-points" 
                      placeholder="Points" 
                      defaultValue={editItem?.item?.points || ''}
                    />
                  </div>
                </div>
              </>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="item-status">Status</Label>
              <Select defaultValue={editItem?.item?.status || 'Draft'}>
                <SelectTrigger id="item-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Planned">Planned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CurriculumCommandPost;
