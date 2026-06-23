import { useState } from "react"
import { UserCog, AtSign, Globe, Sparkles, HelpCircle } from "lucide-react"
import { ValidationModal, validationRulesMap } from "../ValidationInfo"
import { useForm } from "react-hook-form"

interface ProfileFormData {
  username: string
  website: string
  gender: "male" | "female" | "other"
  bio: string
}

export function ProfileForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>()

  const onSubmit = (data: ProfileFormData) => {
    alert("Профіль було оновлено!")
  }

  return (
    <div className="w-full rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
            <UserCog className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Налаштування профілю</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Форма №4: Особиста інформація
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer rounded-lg p-2 text-amber-600 transition-colors hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/30"
          title="Показати правила валідації"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Поле: Нікнейм */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="prof-username"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <AtSign className="h-4 w-4 text-muted-foreground" /> Нікнейм
          </label>
          <input
            id="prof-username"
            type="text"
            placeholder="john_doe"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:bg-slate-950"
            {...register("username", {
              required: "Нікнейм є обов'язковим",
              minLength: { value: 3, message: "Мінімум 3 символи" },
              maxLength: { value: 15, message: "Максимум 15 символів" },
              pattern: {
                value: /^[A-Za-z0-9_]+$/,
                message: "Тільки латинські літери, цифри та _",
              },
            })}
          />
          {errors.username && (
            <p className="text-sm text-red-700">{errors.username.message}</p>
          )}
        </div>

        {/* Поле: Веб-сайт */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="prof-website"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <Globe className="h-4 w-4 text-muted-foreground" /> Особистий сайт
            (URL)
          </label>
          <input
            id="prof-website"
            type="text"
            placeholder="https://example.com"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:bg-slate-950"
            {...register("website", {
              pattern: {
                value: /^https?:\/\/[^\s$.?#].[^\s]*$/i,
                message: "Некоректний формат URL",
              },
            })}
          />
          {errors.website && (
            <p className="text-sm text-red-700">{errors.website.message}</p>
          )}
        </div>

        {/* Поле: Стать (Радіо-кнопки) */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-muted-foreground" /> Стать
          </label>
          <div className="mt-1 flex gap-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                value="male"
                className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                {...register("gender", { required: "Оберіть стать свою" })}
              />
              Чоловіча
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                value="female"
                className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                {...register("gender", { required: "Оберіть стать свою" })}
              />
              Жіноча
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                value="other"
                className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                {...register("gender", { required: "Оберіть стать свою" })}
              />
              Інша
            </label>
          </div>
          {errors.gender && (
            <p className="text-sm text-red-700">{errors.gender.message}</p>
          )}
        </div>

        {/* Поле: Про себе */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="prof-bio" className="text-sm font-semibold">
            Коротко про себе
          </label>
          <textarea
            id="prof-bio"
            placeholder="Я веброзробник з України..."
            rows={4}
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:bg-slate-950"
            {...register("bio", {
              maxLength: {
                value: 200,
                message: "Може бути макс. 200 символів",
              },
            })}
          />
          {errors.bio && (
            <p className="text-sm text-red-700">{errors.bio.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-amber-600 py-2.5 font-semibold text-white shadow-sm transition-all hover:bg-amber-700 hover:shadow-amber-500/10"
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
