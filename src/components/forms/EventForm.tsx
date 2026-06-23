import { useState } from "react"
import { Calendar, Users, MapPin, Grid, Plus, HelpCircle } from "lucide-react"
import { ValidationModal, validationRulesMap } from "../ValidationInfo"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const eventSchema = z.object({
  title: z
    .string()
    .min(5, "Мінімум 5 символів")
    .max(100, "Не більше 100 символів"),

  date: z
    .string()
    .min(1, "Дата є обов'язковою")
    .refine((val) => {
      const selectDate = new Date(val)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      return selectDate > today
    }, { message: "Дата проведення події має бути в майбутньому" }),

    isOnline: z.boolean(),

    maxParticipants: z
      .coerce
      .number()
      .min(10, "Мінімум 10 учасників")
      .max(1000, "Максимум 1000 учасників"),

    category: z.string().min(1, "Оберіть категорію події"),

    location: z.string().optional(),
})
.superRefine((data, ctx) => {
  if (!data.isOnline && (!data.location || data.location.trim().length < 5)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Адреса обов'язкова для офлайн подій (мінімум 5 символів)",
      path: ["location"],
    })
  }
})

export function EventForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      date: "",
      isOnline: false,
      location: "",
      maxParticipants: 10,
      category: "",
    },
  })

  const isOnlineSelected = watch("isOnline")

  const onFormSubmit = (data: any) => {
  console.log("Дані форми валідні та успішно зібрані:", data)
  alert(`Подію "${data.title}" успішно створено!`)
}

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   alert("Подію створено! (Тут має бути інтегрований RHF)")
  // }

  return (
    <div className="w-full rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-xl">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Створення події</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Форма №5: Організація заходу чи мітапу</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 rounded-lg transition-colors cursor-pointer"
          title="Показати правила валідації"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        {/* Поле: Назва події */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="evt-title" className="text-sm font-semibold">Назва події</label>
          <input
            id="evt-title"
            // name="title"
            type="text"
            placeholder="React Meetup Kyiv"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:bg-slate-950"
            {...register("title")}
          />
           {errors.title && (
            <p className="text-xs font-semibold text-red-500">{errors.title.message}</p>
          )}
          {/* TODO: Відобразити помилку errors.title.message */}
        </div>

        {/* Поле: Дата та Час */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="evt-date" className="text-sm font-semibold flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" /> Дата проведення
          </label>
          <input
            id="evt-date"
            // name="date"
            type="date"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:bg-slate-950"
            {...register("date")}
            // TODO: Підключити register("date")
          />
          {errors.date && (
            <p className="text-xs font-semibold text-red-500">{errors.date.message}</p>
          )}
          {/* TODO: Відобразити помилку errors.date.message */}
        </div>

        {/* Поле: Локація */}
        <div className={`flex flex-col gap-1.5 transition-opacity ${isOnlineSelected ? "opacity-50" : ""}`}>
          <label htmlFor="evt-location" className="text-sm font-semibold flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" /> Місце проведення (Адреса)
          </label>
          <input
            id="evt-location"
            type="text"
            disabled={isOnlineSelected}
            placeholder={isOnlineSelected ? "Подія відбудеться онлайн" : "Київ, вул. Хрещатик, 1"}
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:bg-slate-950 disabled:bg-muted/50"
            {...register("location")} 
          />
          {/* TODO: Відобразити помилку errors.location.message */}
          {errors.location && (
            <p className="text-xs font-semibold text-red-500">{errors.location.message}</p>
          )}
        </div>

        {/* Поле: Кількість учасників */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="evt-max" className="text-sm font-semibold flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" /> Макс. кількість учасників
          </label>
          <input
            id="evt-max"
            // name="maxParticipants"
            type="number"
            placeholder="100"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:bg-slate-950"
            // TODO: Підключити register("maxParticipants")
            {...register("maxParticipants")}
          />
          {/* TODO: Відобразити помилку errors.maxParticipants.message */}
          {errors.maxParticipants && (
            <p className="text-xs font-semibold text-red-500">{errors.maxParticipants.message}</p>
          )}
        </div>

        {/* Поле: Категорія */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="evt-category" className="text-sm font-semibold flex items-center gap-2">
            <Grid className="h-4 w-4 text-muted-foreground" /> Категорія події
          </label>
          <select
            id="evt-category"
            // name="category"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:bg-slate-950"
            // TODO: Підключити register("category")
            {...register("category")}
          >
            <option value="">Оберіть категорію...</option>
            <option value="workshop">Воркшоп</option>
            <option value="conference">Конференція</option>
            <option value="meetup">Мітап</option>
            <option value="hackathon">Хакатон</option>
          </select>
          {/* TODO: Відобразити помилку errors.category.message */}
          {errors.category && (
            <p className="text-xs font-semibold text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* Чекбокс: Онлайн захід */}
        <div className="flex items-center gap-2 py-1">
          <input
            id="evt-online"
            // name="isOnline"
            type="checkbox"
            className="rounded border-input text-purple-600 focus:ring-purple-500 h-4 w-4"
            // TODO: Підключити register("isOnline")
            {...register("isOnline")}
          />
          <label htmlFor="evt-online" className="text-xs text-muted-foreground cursor-pointer">
            Це онлайн подія (посилання буде надіслано перед заходом)
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg transition-all shadow-sm hover:shadow-purple-500/10 flex items-center justify-center gap-2"
        >
          Створити подію <Plus className="h-4 w-4" />
        </button>
      </form>

      <ValidationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formTitle="Створення події"
        rules={validationRulesMap.event}
      />
    </div>
  )
}
export default EventForm
