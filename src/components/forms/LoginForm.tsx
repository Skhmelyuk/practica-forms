import { useState } from "react"
import { LogIn, Mail, Lock, HelpCircle } from "lucide-react"
import { ValidationModal, validationRulesMap } from "../ValidationInfo"

export function LoginForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Спроба входу! (Тут має бути інтегрований RHF)")
  }

  return (
    <div className="w-full rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <LogIn className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Вхід у систему</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Форма №2: Авторизація користувача</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-lg transition-colors cursor-pointer"
          title="Показати правила валідації"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Поле: Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="login-email" className="text-sm font-semibold flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" /> Електронна пошта
          </label>
          <input
            id="login-email"
            name="email"
            type="text"
            placeholder="user@example.com"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:bg-slate-950"
            // TODO: Підключити register("email")
          />
          {/* TODO: Відобразити помилку errors.email.message */}
        </div>

        {/* Поле: Пароль */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="login-password" className="text-sm font-semibold flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" /> Пароль
            </label>
            <a href="#forgot" className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline">
              Забули пароль?
            </a>
          </div>
          <input
            id="login-password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:bg-slate-950"
            // TODO: Підключити register("password")
          />
          {/* TODO: Відобразити помилку errors.password.message */}
        </div>

        {/* Чекбокс: Запам'ятати мене */}
        <div className="flex items-center gap-2 py-1">
          <input
            id="login-remember"
            name="rememberMe"
            type="checkbox"
            className="rounded border-input text-emerald-600 focus:ring-emerald-500 h-4 w-4"
            // TODO: Підключити register("rememberMe")
          />
          <label htmlFor="login-remember" className="text-xs text-muted-foreground cursor-pointer">
            Запам'ятати мене на цьому пристрої
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition-all shadow-sm hover:shadow-emerald-500/10"
        >
          Увійти
        </button>
      </form>

      <ValidationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formTitle="Вхід у систему"
        rules={validationRulesMap.login}
      />
    </div>
  )
}
export default LoginForm
