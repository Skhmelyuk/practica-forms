import { useState } from "react"
import { Sun, Moon, MessageSquare, LogIn, UserPlus, UserCog, Calendar, ShoppingBag, Star, Briefcase, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

// Імпортуємо 9 різних форм
import { ContactForm } from "@/components/forms/ContactForm"
import { LoginForm } from "@/components/forms/LoginForm"
import { RegisterForm } from "@/components/forms/RegisterForm"
import { ProfileForm } from "@/components/forms/ProfileForm"
import { EventForm } from "@/components/forms/EventForm"
import { CheckoutForm } from "@/components/forms/CheckoutForm"
import { ReviewForm } from "@/components/forms/ReviewForm"
import { JobForm } from "@/components/forms/JobForm"
import { PaymentForm } from "@/components/forms/PaymentForm"

type FormKey = "contact" | "login" | "register" | "profile" | "event" | "checkout" | "review" | "job" | "payment"

interface ITab {
  key: FormKey
  label: string
  icon: React.ReactNode
}

export function App() {
  const { theme, setTheme } = useTheme()
  const [activeForm, setActiveForm] = useState<FormKey>("contact")

  const tabs: ITab[] = [
    { key: "contact", label: "1. Зворотний зв'язок", icon: <MessageSquare className="h-4 w-4" /> },
    { key: "login", label: "2. Вхід", icon: <LogIn className="h-4 w-4" /> },
    { key: "register", label: "3. Реєстрація", icon: <UserPlus className="h-4 w-4" /> },
    { key: "profile", label: "4. Профіль", icon: <UserCog className="h-4 w-4" /> },
    { key: "event", label: "5. Створення події", icon: <Calendar className="h-4 w-4" /> },
    { key: "checkout", label: "6. Замовлення", icon: <ShoppingBag className="h-4 w-4" /> },
    { key: "review", label: "7. Відгук товару", icon: <Star className="h-4 w-4" /> },
    { key: "job", label: "8. Вакансія", icon: <Briefcase className="h-4 w-4" /> },
    { key: "payment", label: "9. Оплата карткою", icon: <CreditCard className="h-4 w-4" /> },
  ]

  const renderActiveForm = () => {
    switch (activeForm) {
      case "contact":
        return <ContactForm />
      case "login":
        return <LoginForm />
      case "register":
        return <RegisterForm />
      case "profile":
        return <ProfileForm />
      case "event":
        return <EventForm />
      case "checkout":
        return <CheckoutForm />
      case "review":
        return <ReviewForm />
      case "job":
        return <JobForm />
      case "payment":
        return <PaymentForm />
      default:
        return <ContactForm />
    }
  }

  return (
    <div className="min-h-svh bg-background text-foreground transition-colors duration-300">
      
      {/* Шапка панелі */}
      <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-50 p-4 md:px-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Практика: Валідація Форм у React</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Виберіть форму зі списку нижче та підключіть RHF + Zod</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-[11px] text-muted-foreground font-mono bg-muted px-2 py-1 rounded border">
            Натисніть <kbd className="font-bold">D</kbd> для перемикання теми
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full h-9 w-9 shadow-sm cursor-pointer"
          >
            {theme === "dark" ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-indigo-600" />}
          </Button>
        </div>
      </header>

      {/* Головний контейнер */}
      <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Бокове меню вкладок */}
        <aside className="lg:col-span-1 space-y-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
            Список форм для практики
          </div>
          <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const isActive = activeForm === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveForm(tab.key)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 lg:shrink w-full text-left ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Зона рендерингу обраної форми */}
        <main className="lg:col-span-3 flex justify-center items-start">
          <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
            {renderActiveForm()}
          </div>
        </main>

      </div>
    </div>
  )
}

export default App
