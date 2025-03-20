
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { Bell, AlertTriangle, Info, CheckCircle2 } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  const getIcon = (variant?: "default" | "destructive") => {
    if (variant === "destructive") {
      return <AlertTriangle className="h-5 w-5 text-white" />
    } else {
      return <Info className="h-5 w-5 text-white" />
    }
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast 
            key={id} 
            {...props}
            variant={variant}
            className={variant === "destructive" ? "border-military-red bg-military-red/90 text-white" : ""}
          >
            <div className="grid grid-cols-[auto_1fr] gap-2">
              {getIcon(variant)}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
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
