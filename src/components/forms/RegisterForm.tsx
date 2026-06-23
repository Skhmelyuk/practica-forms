import { useState } from "react"
import { UserPlus, Mail, Lock, User, ArrowRight, HelpCircle } from "lucide-react"
import { ValidationModal, validationRulesMap } from "../ValidationInfo"

export function RegisterForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Спроба реєстрації! (Тут має бути інтегрований RHF)")
  }

  return (
    <div className="w-full rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl">
            <UserPlus className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Реєстрація акаунту</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Форма №3: Створення нового користувача</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-colors cursor-pointer"
          title="Показати правила валідації"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Поле: Повне ім'я */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="reg-fullname" className="text-sm font-semibold flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" /> Повне ім'я
          </label>
          <input
            id="reg-fullname"
            name="fullName"
            type="text"
            placeholder="Іван Франко"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-950"
            // TODO: Підключити register("fullName")
          />
          {/* TODO: Відобразити помилку errors.fullName.message */}
        </div>

        {/* Поле: Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="reg-email" className="text-sm font-semibold flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" /> Електронна пошта
          </label>
          <input
            id="reg-email"
            name="email"
            type="text"
            placeholder="example@domain.com"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-950"
            // TODO: Підключити register("email")
          />
          {/* TODO: Відобразити помилку errors.email.message */}
        </div>

        {/* Поле: Пароль */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="reg-password" className="text-sm font-semibold flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" /> Пароль
          </label>
          <input
            id="reg-password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-950"
            // TODO: Підключити register("password")
          />
          {/* TODO: Відобразити помилку errors.password.message */}
        </div>

        {/* Поле: Підтвердження пароля */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="reg-confirmpass" className="text-sm font-semibold flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" /> Підтвердження пароля
          </label>
          <input
            id="reg-confirmpass"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-950"
            // TODO: Підключити register("confirmPassword")
          />
          {/* TODO: Відобразити помилку errors.confirmPassword.message */}
        </div>

        {/* Чекбокс: Згода з умовами */}
        <div className="flex items-start gap-2.5 py-1">
          <input
            id="reg-terms"
            name="acceptTerms"
            type="checkbox"
            className="rounded border-input text-blue-600 focus:ring-blue-500 h-4 w-4 mt-0.5"
            // TODO: Підключити register("acceptTerms")
          />
          <label htmlFor="reg-terms" className="text-xs text-muted-foreground cursor-pointer leading-tight">
            Я погоджуюсь із Умовами використання та Політикою конфіденційності
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all shadow-sm hover:shadow-blue-500/10 flex items-center justify-center gap-2"
        >
          Зареєструватися <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <ValidationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formTitle="Реєстрація акаунту"
        rules={validationRulesMap.register}
      />
    </div>
  )
}
export default RegisterForm
