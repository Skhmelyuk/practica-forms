import { useState } from "react"
import { Star, MessageSquareCode, Package, ThumbsUp, ThumbsDown, HelpCircle } from "lucide-react"
import { ValidationModal, validationRulesMap } from "../ValidationInfo"

export function ReviewForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Відгук надіслано! (Тут має бути інтегрований RHF)")
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

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Поле: Назва товару */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="rev-product" className="text-sm font-semibold flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" /> Назва товару
          </label>
          <input
            id="rev-product"
            name="productName"
            type="text"
            placeholder="Смартфон Apple iPhone 15"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 dark:bg-slate-950"
            // TODO: Підключити register("productName")
          />
          {/* TODO: Відобразити помилку errors.productName.message */}
        </div>

        {/* Поле: Оцінка (Select) */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="rev-rating" className="text-sm font-semibold flex items-center gap-2">
            <Star className="h-4 w-4 text-muted-foreground" /> Оцінка товару
          </label>
          <select
            id="rev-rating"
            name="rating"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 dark:bg-slate-950"
            // TODO: Підключити register("rating")
          >
            <option value="">Оберіть оцінку...</option>
            <option value="5">5 ★★★★★ (Відмінно)</option>
            <option value="4">4 ★★★★☆ (Добре)</option>
            <option value="3">3 ★★★☆☆ (Задовільно)</option>
            <option value="2">2 ★★☆☆☆ (Погано)</option>
            <option value="1">1 ★☆☆☆☆ (Жахливо)</option>
          </select>
          {/* TODO: Відобразити помилку errors.rating.message */}
        </div>

        {/* Поле: Переваги (Pros) */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="rev-pros" className="text-sm font-semibold flex items-center gap-2">
            <ThumbsUp className="h-4 w-4 text-emerald-600" /> Переваги
          </label>
          <input
            id="rev-pros"
            name="pros"
            type="text"
            placeholder="Швидкий, гарний екран"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 dark:bg-slate-950"
            // TODO: Підключити register("pros")
          />
          {/* TODO: Відобразити помилку errors.pros.message */}
        </div>

        {/* Поле: Недоліки (Cons) */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="rev-cons" className="text-sm font-semibold flex items-center gap-2">
            <ThumbsDown className="h-4 w-4 text-rose-600" /> Недоліки
          </label>
          <input
            id="rev-cons"
            name="cons"
            type="text"
            placeholder="Ціна, батарея"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 dark:bg-slate-950"
            // TODO: Підключити register("cons")
          />
          {/* TODO: Відобразити помилку errors.cons.message */}
        </div>

        {/* Поле: Текст відгуку */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="rev-text" className="text-sm font-semibold flex items-center gap-2">
            <MessageSquareCode className="h-4 w-4 text-muted-foreground" /> Детальний відгук
          </label>
          <textarea
            id="rev-text"
            name="reviewText"
            placeholder="Поділіться вашим досвідом використання..."
            rows={4}
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 dark:bg-slate-950"
            // TODO: Підключити register("reviewText")
          />
          {/* TODO: Відобразити помилку errors.reviewText.message */}
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
