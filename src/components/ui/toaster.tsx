
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { Bell, AlertTriangle, Info, CheckCircle2, AtSign } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  const getIcon = (variant?: "default" | "destructive" | "mention") => {
    if (variant === "destructive") {
      return <AlertTriangle className="h-5 w-5 text-white" />
    } else if (variant === "mention") {
      return <AtSign className="h-5 w-5 text-white" />
    } else {
      return <Bell className="h-5 w-5 text-white" />
    }
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        const toastClass = 
          variant === "destructive" 
            ? "border-military-red bg-military-red/90 text-white" 
            : variant === "mention"
              ? "border-military-olive bg-military-olive/90 text-white"
              : "border-military-navy bg-military-navy/90 text-white";
              
        return (
          <Toast 
            key={id} 
            {...props}
            // TypeScript fix: cast variant to the exact types expected by the component
            variant={variant === "mention" ? "default" : variant as "default" | "destructive"}
            className={toastClass}
          >
            <div className="grid grid-cols-[auto_1fr] gap-2">
              {getIcon(variant as "default" | "destructive" | "mention")}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription dangerouslySetInnerHTML={{ __html: description.toString() }} />
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
