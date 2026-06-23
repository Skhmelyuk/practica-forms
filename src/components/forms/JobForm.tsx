import { useState } from "react"
import { Briefcase, User, Mail, Phone, Link, FileText, Compass, HelpCircle } from "lucide-react"
import { ValidationModal, validationRulesMap } from "../ValidationInfo"

export function JobForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Заявка надіслана! (Тут має бути інтегрований RHF)")
  }

  return (
    <div className="w-full rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 rounded-xl">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Подача резюме</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Форма №8: Заявка на вакансію в компанію</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="p-2 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 rounded-lg transition-colors cursor-pointer"
          title="Показати правила валідації"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Поле: ПІБ */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="job-name" className="text-sm font-semibold flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" /> Ваше ім'я (ПІБ)
          </label>
          <input
            id="job-name"
            name="candidateName"
            type="text"
            placeholder="Коваленко Ігор Вікторович"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:bg-slate-950"
            // TODO: Підключити register("candidateName")
          />
          {/* TODO: Відобразити помилку errors.candidateName.message */}
        </div>

        {/* Поле: Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="job-email" className="text-sm font-semibold flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" /> Електронна адреса
          </label>
          <input
            id="job-email"
            name="email"
            type="text"
            placeholder="name@company.com"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:bg-slate-950"
            // TODO: Підключити register("email")
          />
          {/* TODO: Відобразити помилку errors.email.message */}
        </div>

        {/* Поле: Номер телефону */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="job-phone" className="text-sm font-semibold flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" /> Телефон
          </label>
          <input
            id="job-phone"
            name="phone"
            type="text"
            placeholder="+380971234567"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:bg-slate-950"
            // TODO: Підключити register("phone")
          />
          {/* TODO: Відобразити помилку errors.phone.message */}
        </div>

        {/* Поле: Посада (Select) */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="job-position" className="text-sm font-semibold flex items-center gap-2">
            <Compass className="h-4 w-4 text-muted-foreground" /> Бажана посада
          </label>
          <select
            id="job-position"
            name="position"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:bg-slate-950"
            // TODO: Підключити register("position")
          >
            <option value="">Оберіть вакансію...</option>
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Developer</option>
            <option value="designer">UI/UX Designer</option>
            <option value="pm">Project Manager</option>
          </select>
          {/* TODO: Відобразити помилку errors.position.message */}
        </div>

        {/* Поле: Портфоліо URL */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="job-portfolio" className="text-sm font-semibold flex items-center gap-2">
            <Link className="h-4 w-4 text-muted-foreground" /> Посилання на портфоліо (Github/Behance)
          </label>
          <input
            id="job-portfolio"
            name="portfolio"
            type="text"
            placeholder="https://github.com/username"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:bg-slate-950"
            // TODO: Підключити register("portfolio")
          />
          {/* TODO: Відобразити помилку errors.portfolio.message */}
        </div>

        {/* Поле: Досвід (Number) */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="job-exp" className="text-sm font-semibold">Досвід роботи (років)</label>
          <input
            id="job-exp"
            name="experience"
            type="number"
            placeholder="2"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:bg-slate-950"
            // TODO: Підключити register("experience")
          />
          {/* TODO: Відобразити помилку errors.experience.message */}
        </div>

        {/* Поле: Супровідний лист */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="job-letter" className="text-sm font-semibold flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" /> Супровідний лист
          </label>
          <textarea
            id="job-letter"
            name="coverLetter"
            placeholder="Чому ви хочете працювати саме у нас..."
            rows={4}
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:bg-slate-950"
            // TODO: Підключити register("coverLetter")
          />
          {/* TODO: Відобразити помилку errors.coverLetter.message */}
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2.5 rounded-lg transition-all shadow-sm hover:shadow-cyan-500/10"
        >
          Надіслати заявку
        </button>
      </form>

      <ValidationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formTitle="Подача резюме"
        rules={validationRulesMap.job}
      />
    </div>
  )
}
export default JobForm
