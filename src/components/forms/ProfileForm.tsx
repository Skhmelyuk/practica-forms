import { useState } from "react"
import { UserCog, AtSign, Globe, Sparkles, HelpCircle } from "lucide-react"
import { ValidationModal, validationRulesMap } from "../ValidationInfo"

export function ProfileForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Профіль оновлено! (Тут має бути інтегрований RHF)")
  }

  return (
    <div className="w-full rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl">
            <UserCog className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Налаштування профілю</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Форма №4: Особиста інформація</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="p-2 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 rounded-lg transition-colors cursor-pointer"
          title="Показати правила валідації"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Поле: Нікнейм */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="prof-username" className="text-sm font-semibold flex items-center gap-2">
            <AtSign className="h-4 w-4 text-muted-foreground" /> Нікнейм
          </label>
          <input
            id="prof-username"
            name="username"
            type="text"
            placeholder="john_doe"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 dark:bg-slate-950"
            // TODO: Підключити register("username")
          />
          {/* TODO: Відобразити помилку errors.username.message */}
        </div>

        {/* Поле: Веб-сайт */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="prof-website" className="text-sm font-semibold flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" /> Особистий сайт (URL)
          </label>
          <input
            id="prof-website"
            name="website"
            type="text"
            placeholder="https://example.com"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 dark:bg-slate-950"
            // TODO: Підключити register("website")
          />
          {/* TODO: Відобразити помилку errors.website.message */}
        </div>

        {/* Поле: Стать (Радіо-кнопки) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-muted-foreground" /> Стать
          </label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="gender"
                value="male"
                className="text-amber-600 focus:ring-amber-500 h-4 w-4"
                // TODO: Підключити register("gender")
              />
              Чоловіча
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="gender"
                value="female"
                className="text-amber-600 focus:ring-amber-500 h-4 w-4"
                // TODO: Підключити register("gender")
              />
              Жіноча
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="gender"
                value="other"
                className="text-amber-600 focus:ring-amber-500 h-4 w-4"
                // TODO: Підключити register("gender")
              />
              Інша
            </label>
          </div>
          {/* TODO: Відобразити помилку errors.gender.message */}
        </div>

        {/* Поле: Про себе */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="prof-bio" className="text-sm font-semibold">Коротко про себе</label>
          <textarea
            id="prof-bio"
            name="bio"
            placeholder="Я веброзробник з України..."
            rows={4}
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 dark:bg-slate-950"
            // TODO: Підключити register("bio")
          />
          {/* TODO: Відобразити помилку errors.bio.message */}
        </div>

        <button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 rounded-lg transition-all shadow-sm hover:shadow-amber-500/10"
        >
          Зберегти профіль
        </button>
      </form>

      <ValidationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formTitle="Налаштування профілю"
        rules={validationRulesMap.profile}
      />
    </div>
  )
}
export default ProfileForm
