import { useState, useRef } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Video, 
  FileText, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Text, 
  Upload, 
  File, 
  Plus, 
  Check, 
  ArrowLeft,
  Heading,
  ListOrdered,
  Table as TableIcon,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define content block types
type ContentBlockType = 
  | "text" 
  | "heading" 
  | "video" 
  | "image" 
  | "file" 
  | "link" 
  | "list" 
  | "table";

interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content: Record<string, any>;
}

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  moduleId: z.string(),
  duration: z.string(),
});

const LessonCreator = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [activeTab, setActiveTab] = useState<string>("details");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      moduleId: "module-1", // Default module
      duration: "30",
    },
  });

  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  const addContentBlock = (type: ContentBlockType) => {
    const newBlock: ContentBlock = {
      id: generateId(),
      type,
      content: {},
    };

    switch (type) {
      case "text":
        newBlock.content = { text: "" };
        break;
      case "heading":
        newBlock.content = { text: "", level: "h2" };
        break;
      case "video":
        newBlock.content = { url: "", title: "" };
        break;
      case "image":
        newBlock.content = { url: "", alt: "", caption: "" };
        break;
      case "file":
        newBlock.content = { url: "", name: "", size: "", type: "" };
        break;
      case "link":
        newBlock.content = { url: "", title: "" };
        break;
      case "list":
        newBlock.content = { items: [""] };
        break;
      case "table":
        newBlock.content = { 
          headers: ["Header 1", "Header 2"], 
          rows: [["Cell 1", "Cell 2"]] 
        };
        break;
    }

    setContentBlocks(prevBlocks => [...prevBlocks, newBlock]);
  };

  const updateContentBlock = (id: string, content: Record<string, any>) => {
    setContentBlocks(
      contentBlocks.map((block) =>
        block.id === id ? { ...block, content } : block
      )
    );
  };

  const removeContentBlock = (id: string) => {
    setContentBlocks(contentBlocks.filter((block) => block.id !== id));
  };

  const moveBlockUp = (index: number) => {
    if (index === 0) return;
    const newBlocks = [...contentBlocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[index - 1];
    newBlocks[index - 1] = temp;
    setContentBlocks(newBlocks);
  };

  const moveBlockDown = (index: number) => {
    if (index === contentBlocks.length - 1) return;
    const newBlocks = [...contentBlocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[index + 1];
    newBlocks[index + 1] = temp;
    setContentBlocks(newBlocks);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          const newBlock: ContentBlock = {
            id: generateId(),
            type: "image",
            content: {
              url: event.target.result,
              alt: file.name,
              caption: ""
            }
          };
          setContentBlocks(prevBlocks => [...prevBlocks, newBlock]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const newBlock: ContentBlock = {
        id: generateId(),
        type: "file",
        content: {
          url: "#", // In a real app, this would be the uploaded file URL
          name: file.name,
          size: `${Math.round(file.size / 1024)} KB`,
          type: file.type
        }
      };
      setContentBlocks(prevBlocks => [...prevBlocks, newBlock]);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real application, this would save to a database
    console.log("Form values:", values);
    console.log("Content blocks:", contentBlocks);
    
    toast({
      title: "Lesson Created",
      description: `"${values.title}" has been saved`,
    });
    
    // Navigate back to training center
    setTimeout(() => {
      navigate("/training");
    }, 2000);
  };

  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "text":
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Text className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Text Block</span>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => moveBlockUp(index)}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => moveBlockDown(index)}
                  disabled={index === contentBlocks.length - 1}
                >
                  ↓
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeContentBlock(block.id)}
                >
                  ×
                </Button>
              </div>
            </div>
            <Textarea
              value={block.content.text || ""}
              onChange={(e) =>
                updateContentBlock(block.id, { ...block.content, text: e.target.value })
              }
              placeholder="Enter text content here..."
              className="min-h-[120px]"
            />
          </div>
        );
        
      case "heading":
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Heading className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Heading</span>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => moveBlockUp(index)}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => moveBlockDown(index)}
                  disabled={index === contentBlocks.length - 1}
                >
                  ↓
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeContentBlock(block.id)}
                >
                  ×
                </Button>
              </div>
            </div>
            <div className="flex gap-2 mb-2">
              <Select
                value={block.content.level || "h2"}
                onValueChange={(value) =>
                  updateContentBlock(block.id, { ...block.content, level: value })
                }
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">Heading 1</SelectItem>
                  <SelectItem value="h2">Heading 2</SelectItem>
                  <SelectItem value="h3">Heading 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              value={block.content.text || ""}
              onChange={(e) =>
                updateContentBlock(block.id, { ...block.content, text: e.target.value })
              }
              placeholder="Enter heading text..."
              className="font-semibold"
            />
          </div>
        );
        
      case "video":
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Video className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Video</span>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => moveBlockUp(index)}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => moveBlockDown(index)}
                  disabled={index === contentBlocks.length - 1}
                >
                  ↓
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeContentBlock(block.id)}
                >
                  ×
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Input
                value={block.content.title || ""}
                onChange={(e) =>
                  updateContentBlock(block.id, { ...block.content, title: e.target.value })
                }
                placeholder="Video title"
              />
              <Input
                value={block.content.url || ""}
                onChange={(e) =>
                  updateContentBlock(block.id, { ...block.content, url: e.target.value })
                }
                placeholder="Video URL (YouTube, Vimeo, etc.)"
              />
              {block.content.url && (
                <div className="aspect-video bg-black/5 rounded-md flex items-center justify-center">
                  <Video className="h-10 w-10 text-military-navy/40" />
                  <span className="ml-2 text-military-navy/60">Video Preview</span>
                </div>
              )}
            </div>
          </div>
        );
        
      case "image":
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <ImageIcon className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Image</span>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => moveBlockUp(index)}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => moveBlockDown(index)}
                  disabled={index === contentBlocks.length - 1}
                >
                  ↓
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeContentBlock(block.id)}
                >
                  ×
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Input
                value={block.content.alt || ""}
                onChange={(e) =>
                  updateContentBlock(block.id, { ...block.content, alt: e.target.value })
                }
                placeholder="Alt text (describe the image)"
              />
              <Input
                value={block.content.caption || ""}
                onChange={(e) =>
                  updateContentBlock(block.id, { ...block.content, caption: e.target.value })
                }
                placeholder="Caption (optional)"
              />
              {block.content.url ? (
                <div className="relative">
                  <img 
                    src={block.content.url} 
                    alt={block.content.alt || "Uploaded image"} 
                    className="max-h-60 rounded-md object-contain w-full bg-black/5"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    Replace
                  </Button>
                </div>
              ) : (
                <div 
                  className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-black/5 transition-colors"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <ImageIcon className="h-8 w-8 mx-auto text-military-navy/50" />
                  <p className="text-sm text-military-navy/70">Click to upload an image</p>
                </div>
              )}
            </div>
          </div>
        );
        
      case "file":
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <File className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">File Attachment</span>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => moveBlockUp(index)}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => moveBlockDown(index)}
                  disabled={index === contentBlocks.length - 1}
                >
                  ↓
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeContentBlock(block.id)}
                >
                  ×
                </Button>
              </div>
            </div>
            {block.content.name ? (
              <div className="border rounded-md p-3 bg-military-beige/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-military-olive mr-2" />
                    <div>
                      <p className="font-medium text-sm">{block.content.name}</p>
                      <p className="text-xs text-muted-foreground">{block.content.size}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Replace
                  </Button>
                </div>
              </div>
            ) : (
              <div 
                className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-black/5 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 mx-auto text-military-navy/50 mb-2" />
                <p className="text-sm text-military-navy/70">Click to upload a file</p>
              </div>
            )}
          </div>
        );
        
      case "link":
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Link</span>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => moveBlockUp(index)}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => moveBlockDown(index)}
                  disabled={index === contentBlocks.length - 1}
                >
                  ↓
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeContentBlock(block.id)}
                >
                  ×
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Input
                value={block.content.title || ""}
                onChange={(e) =>
                  updateContentBlock(block.id, { ...block.content, title: e.target.value })
                }
                placeholder="Link text"
              />
              <Input
                value={block.content.url || ""}
                onChange={(e) =>
                  updateContentBlock(block.id, { ...block.content, url: e.target.value })
                }
                placeholder="URL (https://...)"
              />
            </div>
          </div>
        );
        
      case "list":
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <ListOrdered className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">List</span>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => moveBlockUp(index)}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => moveBlockDown(index)}
                  disabled={index === contentBlocks.length - 1}
                >
                  ↓
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeContentBlock(block.id)}
                >
                  ×
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              {(block.content.items || []).map((item: string, i: number) => (
                <div key={i} className="flex gap-2">
                  <div className="w-6 text-center text-sm">{i + 1}.</div>
                  <Input
                    value={item}
                    onChange={(e) => {
                      const newItems = [...block.content.items];
                      newItems[i] = e.target.value;
                      updateContentBlock(block.id, { ...block.content, items: newItems });
                    }}
                    placeholder={`Item ${i + 1}`}
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => {
                      const newItems = block.content.items.filter((_: any, idx: number) => idx !== i);
                      updateContentBlock(block.id, { ...block.content, items: newItems });
                    }}
                  >
                    ×
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => {
                  const newItems = [...(block.content.items || []), ""];
                  updateContentBlock(block.id, { ...block.content, items: newItems });
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>
        );
      
      case "table":
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <TableIcon className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Table</span>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => moveBlockUp(index)}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => moveBlockDown(index)}
                  disabled={index === contentBlocks.length - 1}
                >
                  ↓
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeContentBlock(block.id)}
                >
                  ×
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto border rounded-md">
              <table className="w-full">
                <thead className="bg-military-beige/20">
                  <tr>
                    {(block.content.headers || []).map((header: string, i: number) => (
                      <th key={i} className="border-b p-2">
                        <Input
                          value={header}
                          onChange={(e) => {
                            const newHeaders = [...block.content.headers];
                            newHeaders[i] = e.target.value;
                            updateContentBlock(block.id, { ...block.content, headers: newHeaders });
                          }}
                          placeholder={`Header ${i + 1}`}
                          className="text-sm"
                        />
                      </th>
                    ))}
                    <th className="w-10 p-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          const newHeaders = [...block.content.headers, `Header ${block.content.headers.length + 1}`];
                          const newRows = block.content.rows.map((row: string[]) => [...row, ""]);
                          updateContentBlock(block.id, { 
                            ...block.content, 
                            headers: newHeaders,
                            rows: newRows
                          });
                        }}
                      >
                        +
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(block.content.rows || []).map((row: string[], rowIndex: number) => (
                    <tr key={rowIndex}>
                      {row.map((cell: string, cellIndex: number) => (
                        <td key={cellIndex} className="border-t p-2">
                          <Input
                            value={cell}
                            onChange={(e) => {
                              const newRows = [...block.content.rows];
                              newRows[rowIndex][cellIndex] = e.target.value;
                              updateContentBlock(block.id, { ...block.content, rows: newRows });
                            }}
                            placeholder={`Cell ${rowIndex + 1},${cellIndex + 1}`}
                            className="text-sm"
                          />
                        </td>
                      ))}
                      <td className="border-t w-10 p-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            const newRows = block.content.rows.filter((_: any, idx: number) => idx !== rowIndex);
                            updateContentBlock(block.id, { ...block.content, rows: newRows });
                          }}
                        >
                          ×
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => {
                const newRow = Array(block.content.headers.length).fill("");
                const newRows = [...block.content.rows, newRow];
                updateContentBlock(block.id, { ...block.content, rows: newRows });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Row
            </Button>
          </div>
        );
        
      default:
        return null;
    }
  };

  const renderPreview = () => {
    return (
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold mb-2">{form.getValues().title || "Lesson Title"}</h1>
          <p className="text-muted-foreground">
            {form.getValues().description || "Lesson description will appear here."}
          </p>
        </div>
        
        {contentBlocks.map((block) => {
          switch (block.type) {
            case "text":
              return (
                <div key={block.id} className="prose max-w-none">
                  <p>{block.content.text || "Text content will appear here."}</p>
                </div>
              );
            case "heading":
              const HeadingTag = (block.content.level || "h2") as keyof JSX.IntrinsicElements;
              return (
                <div key={block.id}>
                  <HeadingTag className="font-bold">
                    {block.content.text || "Heading text will appear here."}
                  </HeadingTag>
                </div>
              );
            case "video":
              return (
                <div key={block.id} className="space-y-2">
                  <div className="aspect-video bg-black/5 rounded-md flex items-center justify-center">
                    <Video className="h-10 w-10 text-military-navy/40" />
                    <span className="ml-2 text-military-navy/60">Video: {block.content.title || "Untitled"}</span>
                  </div>
                  {block.content.title && (
                    <p className="text-sm font-medium">{block.content.title}</p>
                  )}
                </div>
              );
            case "image":
              return (
                <div key={block.id} className="space-y-2">
                  {block.content.url ? (
                    <>
                      <img 
                        src={block.content.url} 
                        alt={block.content.alt || ""} 
                        className="max-h-60 rounded-md object-contain w-full"
                      />
                      {block.content.caption && (
                        <p className="text-sm text-center text-muted-foreground">
                          {block.content.caption}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="aspect-video bg-black/5 rounded-md flex items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-military-navy/40" />
                      <span className="ml-2 text-military-navy/60">Image placeholder</span>
                    </div>
                  )}
                </div>
              );
            case "file":
              return (
                <div key={block.id} className="border rounded-md p-3 bg-military-beige/10">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-military-olive mr-2" />
                    <div>
                      <p className="font-medium text-sm">{block.content.name || "File attachment"}</p>
                      {block.content.size && (
                        <p className="text-xs text-muted-foreground">{block.content.size}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            case "link":
              return (
                <div key={block.id} className="p-2 border rounded-md bg-military-beige/10">
                  <a 
                    href={block.content.url || "#"} 
                    className="flex items-center text-military-olive hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkIcon className="h-4 w-4 mr-2" />
                    {block.content.title || block.content.url || "External Link"}
                  </a>
                </div>
              );
            case "list":
              return (
                <div key={block.id} className="pl-6">
                  <ol className="list-decimal space-y-1">
                    {(block.content.items || []).map((item: string, i: number) => (
                      <li key={i}>{item || `Item ${i+1}`}</li>
                    ))}
                  </ol>
                </div>
              );
            case "table":
              return (
                <div key={block.id} className="overflow-x-auto border rounded-md">
                  <table className="w-full">
                    <thead className="bg-military-beige/20">
                      <tr>
                        {(block.content.headers || []).map((header: string, i: number) => (
                          <th key={i} className="border-b p-2 text-left">
                            {header || `Header ${i+1}`}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(block.content.rows || []).map((row: string[], rowIndex: number) => (
                        <tr key={rowIndex}>
                          {row.map((cell: string, cellIndex: number) => (
                            <td key={cellIndex} className="border-t p-2">
                              {cell || "Cell content"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            default:
              return null;
          }
        })}
        
        {contentBlocks.length === 0 && (
          <div className="text-center py-8 bg-military-beige/10 rounded-md">
            <p className="text-muted-foreground">Add content blocks to see preview</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-military-beige/20">
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <div className="bg-military-navy p-4 text-white">
            <div className="max-w-5xl mx-auto flex items-center gap-3">
              <Button 
                variant="ghost" 
                className="text-white hover:text-white/80" 
                size="sm"
                onClick={() => navigate("/training")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Training Center
              </Button>
              <h1 className="text-xl font-bold">Create New Lesson</h1>
            </div>
          </div>
          
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="max-w-5xl mx-auto">
              <Tabs 
                defaultValue="details" 
                className="space-y-4"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="details">Lesson Details</TabsTrigger>
                  <TabsTrigger value="content">Lesson Content</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <Form {...form}>
                        <form className="space-y-6">
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Lesson Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter lesson title" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Enter a brief description of this lesson" 
                                    className="min-h-[100px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="moduleId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Module</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a module" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="module-1">Module 1: Business Foundations</SelectItem>
                                      <SelectItem value="module-2">Module 2: Market Research</SelectItem>
                                      <SelectItem value="module-3">Module 3: Business Model</SelectItem>
                                      <SelectItem value="module-4">Module 4: Financial Planning</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="duration"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Duration (minutes)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="number" 
                                      placeholder="e.g. 30" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="pt-4">
                            <Button
                              type="button"
                              onClick={() => setActiveTab("content")}
                              className="bg-military-olive hover:bg-military-olive/90"
                            >
                              Continue to Content
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="content" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div className="flex flex-wrap gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => addContentBlock("text")}
                          >
                            <Text className="h-4 w-4 mr-2" />
                            Text
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => addContentBlock("heading")}
                          >
                            <Heading className="h-4 w-4 mr-2" />
                            Heading
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => addContentBlock("video")}
                          >
                            <Video className="h-4 w-4 mr-2" />
                            Video
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => imageInputRef.current?.click()}
                          >
                            <ImageIcon className="h-4 w-4 mr-2" />
                            Image
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <File className="h-4 w-4 mr-2" />
                            File
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => addContentBlock("link")}
                          >
                            <LinkIcon className="h-4 w-4 mr-2" />
                            Link
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => addContentBlock("list")}
                          >
                            <ListOrdered className="h-4 w-4 mr-2" />
                            List
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => addContentBlock("table")}
                          >
                            <TableIcon className="h-4 w-4 mr-2" />
                            Table
                          </Button>
                        </div>
                        
                        <input
                          type="file"
                          ref={imageInputRef}
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                        
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={handleFileUpload}
                        />
                        
                        <div className="space-y-4">
                          {contentBlocks.length > 0 ? (
                            contentBlocks.map((block, index) => (
                              <Card key={block.id}>
                                <CardContent className="pt-6">
                                  {renderContentBlock(block, index)}
                                </CardContent>
                              </Card>
                            ))
                          ) : (
                            <div className="text-center py-8 bg-military-beige/10 rounded-md">
                              <p className="text-muted-foreground mb-2">No content blocks added yet</p>
                              <p className="text-sm text-muted-foreground">
                                Use the buttons above to add content to your lesson
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex justify-between pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setActiveTab("details")}
                          >
                            Back to Details
                          </Button>
                          <Button
                            onClick={() => setActiveTab("preview")}
                            className="bg-military-olive hover:bg-military-olive/90"
                          >
                            Preview Lesson
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="preview" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      {renderPreview()}
                      
                      <div className="flex justify-between pt-8 border-t mt-8">
                        <Button
                          variant="outline"
                          onClick={() => setActiveTab("content")}
                        >
                          Back to Content
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              toast({
                                title: "Lesson Saved as Draft",
                                description: "You can continue editing it later",
                              });
                            }}
                          >
                            Save Draft
                          </Button>
                          <Button
                            onClick={() => {
                              const isValid = form.trigger();
                              isValid.then((valid) => {
                                if (valid) {
                                  const values = form.getValues();
                                  onSubmit(values);
                                } else {
                                  setActiveTab("details");
                                  toast({
                                    title: "Required Fields Missing",
                                    description: "Please complete all required fields",
                                    variant: "destructive"
                                  });
                                }
                              });
                            }}
                            className="bg-military-olive hover:bg-military-olive/90"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Publish Lesson
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LessonCreator;
