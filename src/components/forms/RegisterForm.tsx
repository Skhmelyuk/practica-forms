import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserPlus, Mail, Lock, User, ArrowRight, HelpCircle } from "lucide-react"
import { ValidationModal, validationRulesMap } from "../ValidationInfo"

const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Мінімум 3 символи")
      .regex(/^[A-Za-zА-Яа-яІіЇїЄєҐґ\s]+$/, "Тільки літери та пробіли"),

    email: z
      .email("Некоректний email"),

    password: z
      .string()
      .min(8, "Мінімум 8 символів")
      .regex(/[A-Z]/, "Повинна бути хоча б 1 велика літера")
      .regex(/[0-9]/, "Повинна бути хоча б 1 цифра")
      .regex(/[^A-Za-z0-9]/, "Повинен бути хоча б 1 спецсимвол"),

    confirmPassword: z
      .string()
      .min(1, "Підтвердіть пароль"),

    acceptTerms: z.boolean().refine((value) => value === true, {
      message: "Необхідно погодитися з правилами",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  })

  const onSubmit = (data: RegisterFormData) => {
    console.log(data)
    alert("Реєстрація успішна!")
  }

  return (
    <div className="w-full rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <UserPlus className="h-6 w-6" />
          </div>

          <div>
            <h3 className="text-xl font-bold">Реєстрація акаунту</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Форма №3: Створення нового користувача
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="reg-fullname"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <User className="h-4 w-4 text-muted-foreground" />
            Повне ім'я
          </label>

          <input
            id="reg-fullname"
            placeholder="Іван Франко"
            {...register("fullName")}
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-slate-950"
          />

          {errors.fullName && (
            <p className="text-xs text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="reg-email"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <Mail className="h-4 w-4 text-muted-foreground" />
            Електронна пошта
          </label>

          <input
            id="reg-email"
            placeholder="example@domain.com"
            {...register("email")}
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-slate-950"
          />

          {errors.email && (
            <p className="text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="reg-password"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <Lock className="h-4 w-4 text-muted-foreground" />
            Пароль
          </label>

          <input
            id="reg-password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-slate-950"
          />

          {errors.password && (
            <p className="text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="reg-confirmpass"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <Lock className="h-4 w-4 text-muted-foreground" />
            Підтвердження пароля
          </label>

          <input
            id="reg-confirmpass"
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-slate-950"
          />

          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2.5 py-1">
          <input
            id="reg-terms"
            type="checkbox"
            {...register("acceptTerms")}
            className="mt-0.5 h-4 w-4 rounded border-input text-blue-600 focus:ring-blue-500"
          />

          <label
            htmlFor="reg-terms"
            className="cursor-pointer text-xs leading-tight text-muted-foreground"
          >
            Я погоджуюсь із Умовами використання та Політикою конфіденційності
          </label>
        </div>

        {errors.acceptTerms && (
          <p className="text-xs text-red-500">
            {errors.acceptTerms.message}
          </p>
        )}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition-all hover:bg-blue-700"
        >
          Зареєструватися
          <ArrowRight className="h-4 w-4" />
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