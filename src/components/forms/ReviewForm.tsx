import { useState } from "react"
import { Star, MessageSquareCode, Package, ThumbsUp, ThumbsDown, HelpCircle } from "lucide-react"
import { ValidationModal, validationRulesMap } from "../ValidationInfo"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const reviewSchema = z.object({
  productName: z
    .string()
    .min(2, { message: "Назва товару має містити мінімум 2 символи" })
    .max(100, { message: "Назва товару занадто довга" }),
  rating: z
    .string()
    .min(1, { message: "Будь ласка, оберіть оцінку" }),
  pros: z
    .string()
    .min(3, { message: "Опишіть переваги (мінімум 3 символи)" }),
  cons: z
    .string()
    .min(3, { message: "Опишіть недоліки (мінімум 3 символи)" }),
  reviewText: z
    .string()
    .min(10, { message: "Відгук має бути детальнішим (мінімум 10 символів)" })
    .max(1000, { message: "Максимальна довжина відгуку — 1000 символів" }),
})

type ReviewFormData = z.infer<typeof reviewSchema>

export function ReviewForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      productName: "",
      rating: "",
      pros: "",
      cons: "",
      reviewText: "",
    },
  })

  const onSubmit = (data: ReviewFormData) => {
    console.log("Валідні дані форми:", data)
    alert("Відгук успішно надіслано!")
    reset()
  }

  return (
    <div className="w-full rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-500 rounded-xl">
            <Star className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Відгук про товар</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Форма №7: Оцінка та коментарі покупців</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="p-2 text-yellow-600 dark:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-950/30 rounded-lg transition-colors cursor-pointer"
          title="Показати правила валідації"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Поле: Назва товару */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="rev-product" className="text-sm font-semibold flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" /> Назва товару
          </label>
          <input
            id="rev-product"
            type="text"
            placeholder="Смартфон Apple iPhone 15"
            className={`w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 dark:bg-slate-950 ${
              errors.productName ? "border-destructive focus:border-destructive" : "border-input"
            }`}
            {...register("productName")}
          />
          {errors.productName && (
            <p className="text-xs font-medium text-rose-500">{errors.productName.message}</p>
          )}
        </div>

        {/* Поле: Оцінка (Select) */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="rev-rating" className="text-sm font-semibold flex items-center gap-2">
            <Star className="h-4 w-4 text-muted-foreground" /> Оцінка товару
          </label>
          <select
            id="rev-rating"
            className={`w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 dark:bg-slate-950 ${
              errors.rating ? "border-destructive focus:border-destructive" : "border-input"
            }`}
            {...register("rating")}
          >
            <option value="">Оберіть оцінку...</option>
            <option value="5">5 ★★★★★ (Відмінно)</option>
            <option value="4">4 ★★★★☆ (Добре)</option>
            <option value="3">3 ★★★☆☆ (Задовільно)</option>
            <option value="2">2 ★★☆☆☆ (Погано)</option>
            <option value="1">1 ★☆☆☆☆ (Жахливо)</option>
          </select>
          {errors.rating && (
            <p className="text-xs font-medium text-rose-500">{errors.rating.message}</p>
          )}
        </div>

        {/* Поле: Переваги (Pros) */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="rev-pros" className="text-sm font-semibold flex items-center gap-2">
            <ThumbsUp className="h-4 w-4 text-emerald-600" /> Переваги
          </label>
          <input
            id="rev-pros"
            type="text"
            placeholder="Швидкий, гарний екран"
            className={`w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 dark:bg-slate-950 ${
              errors.pros ? "border-destructive focus:border-destructive" : "border-input"
            }`}
            {...register("pros")}
          />
          {errors.pros && (
            <p className="text-xs font-medium text-rose-500">{errors.pros.message}</p>
          )}
        </div>

        {/* Поле: Недоліки (Cons) */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="rev-cons" className="text-sm font-semibold flex items-center gap-2">
            <ThumbsDown className="h-4 w-4 text-rose-600" /> Недоліки
          </label>
          <input
            id="rev-cons"
            type="text"
            placeholder="Ціна, батарея"
            className={`w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 dark:bg-slate-950 ${
              errors.cons ? "border-destructive focus:border-destructive" : "border-input"
            }`}
            {...register("cons")}
          />
          {errors.cons && (
            <p className="text-xs font-medium text-rose-500">{errors.cons.message}</p>
          )}
        </div>

        {/* Поле: Текст відгуку */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="rev-text" className="text-sm font-semibold flex items-center gap-2">
            <MessageSquareCode className="h-4 w-4 text-muted-foreground" /> Детальний відгук
          </label>
          <textarea
            id="rev-text"
            placeholder="Поділіться вашим досвідом використання..."
            rows={4}
            className={`w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 dark:bg-slate-950 ${
              errors.reviewText ? "border-destructive focus:border-destructive" : "border-input"
            }`}
            {...register("reviewText")}
          />
          {errors.reviewText && (
            <p className="text-xs font-medium text-rose-500">{errors.reviewText.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2.5 rounded-lg transition-all shadow-sm"
        >
          Надіслати відгук
        </button>
      </form>

      <ValidationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formTitle="Відгук про товар"
        rules={validationRulesMap.review}
      />
    </div>
  )
}
export default ReviewForm
