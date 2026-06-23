import { useState } from "react"
import { Mail, MessageSquare, User, Tag, Send, HelpCircle } from "lucide-react"
import { ValidationModal, validationRulesMap } from "../ValidationInfo"

export function ContactForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Форма зворотного зв'язку відправлена! (Тут має бути інтегрований RHF)")
  }

  return (
    <div className="w-full rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Зворотний зв'язок</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Форма №1: Контактна форма для зв'язку</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-lg transition-colors cursor-pointer"
          title="Показати правила валідації"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Поле: Ім'я */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-name" className="text-sm font-semibold flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" /> Ваше ім'я
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Олександр"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-slate-950"
            // TODO: Підключити register("name")
          />
          {/* TODO: Відобразити помилку errors.name.message */}
          <span className="text-xs text-destructive hidden">Помилка валідації</span>
        </div>

        {/* Поле: Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-email" className="text-sm font-semibold flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" /> Електронна пошта
          </label>
          <input
            id="contact-email"
            name="email"
            type="text"
            placeholder="example@mail.com"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-slate-950"
            // TODO: Підключити register("email")
          />
          {/* TODO: Відобразити помилку errors.email.message */}
        </div>

        {/* Поле: Тема звернення */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-subject" className="text-sm font-semibold flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" /> Тема звернення
          </label>
          <select
            id="contact-subject"
            name="subject"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-slate-950"
            // TODO: Підключити register("subject")
          >
            <option value="">Оберіть тему...</option>
            <option value="support">Технічна підтримка</option>
            <option value="sales">Відділ продажів</option>
            <option value="partnership">Співпраця</option>
            <option value="other">Інше</option>
          </select>
          {/* TODO: Відобразити помилку errors.subject.message */}
        </div>

        {/* Поле: Повідомлення */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-message" className="text-sm font-semibold">Повідомлення</label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Опишіть ваше питання..."
            rows={4}
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-slate-950"
            // TODO: Підключити register("message")
          />
          {/* TODO: Відобразити помилку errors.message.message */}
        </div>

        {/* Чекбокс: Згода на новини */}
        <div className="flex items-center gap-2 py-1">
          <input
            id="contact-newsletter"
            name="newsletter"
            type="checkbox"
            className="rounded border-input text-indigo-600 focus:ring-indigo-500 h-4 w-4"
            // TODO: Підключити register("newsletter")
          />
          <label htmlFor="contact-newsletter" className="text-xs text-muted-foreground cursor-pointer">
            Я погоджуюсь отримувати щотижневі оновлення продукту
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-all shadow-sm hover:shadow-indigo-500/10 flex items-center justify-center gap-2"
        >
          Надіслати повідомлення <Send className="h-4 w-4" />
        </button>
      </form>

      <ValidationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formTitle="Зворотний зв'язок"
        rules={validationRulesMap.contact}
      />
    </div>
  )
}
export default ContactForm
