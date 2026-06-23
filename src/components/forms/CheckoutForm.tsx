import { useState } from "react"
import {
  ShoppingBag,
  User,
  Phone,
  MapPin,
  CreditCard,
  HelpCircle,
} from "lucide-react"
import { ValidationModal, validationRulesMap } from "../ValidationInfo"

export function CheckoutForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="w-full rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-rose-50 p-2.5 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Оформлення замовлення</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Форма №6: Доставка та оплата товарів
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer rounded-lg p-2 text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
          title="Показати правила валідації"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <form className="space-y-4">
        {/* Поле: Ім'я отримувача */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="chk-name"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <User className="h-4 w-4 text-muted-foreground" /> ПІБ отримувача
          </label>
          <input
            id="chk-name"
            name="customerName"
            type="text"
            placeholder="Шевченко Тарас Григорович"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:bg-slate-950"
            // TODO: Підключити register("customerName")
          />
          {/* TODO: Відобразити помилку errors.customerName.message */}
        </div>

        {/* Поле: Номер телефону */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="chk-phone"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <Phone className="h-4 w-4 text-muted-foreground" /> Номер телефону
          </label>
          <input
            id="chk-phone"
            name="phone"
            type="text"
            placeholder="+380XXXXXXXXX"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:bg-slate-950"
            // TODO: Підключити register("phone")
          />
          {/* TODO: Відобразити помилку errors.phone.message */}
        </div>

        {/* Поле: Адреса доставки */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="chk-address"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <MapPin className="h-4 w-4 text-muted-foreground" /> Адреса доставки
          </label>
          <input
            id="chk-address"
            name="address"
            type="text"
            placeholder="м. Львів, вул. Городоцька, 15"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:bg-slate-950"
            // TODO: Підключити register("address")
          />
          {/* TODO: Відобразити помилку errors.address.message */}
        </div>

        {/* Поле: Метод оплати (Радіо-кнопки) */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <CreditCard className="h-4 w-4 text-muted-foreground" /> Спосіб
            оплати
          </label>
          <div className="mt-1 flex flex-col gap-2">
            <label className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                className="h-4 w-4 text-rose-600 focus:ring-rose-500"
                // TODO: Підключити register("paymentMethod")
              />
              Оплата готівкою при отриманні
            </label>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                className="h-4 w-4 text-rose-600 focus:ring-rose-500"
                // TODO: Підключити register("paymentMethod")
              />
              Оплата карткою на сайті
            </label>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                className="h-4 w-4 text-rose-600 focus:ring-rose-500"
                // TODO: Підключити register("paymentMethod")
              />
              PayPal / Apple Pay
            </label>
          </div>
          {/* TODO: Відобразити помилку errors.paymentMethod.message */}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-rose-600 py-2.5 font-semibold text-white shadow-sm transition-all hover:bg-rose-700 hover:shadow-rose-500/10"
        >
          Підтвердити замовлення
        </button>
      </form>

      <ValidationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formTitle="Оформлення замовлення"
        rules={validationRulesMap.checkout}
      />
    </div>
  )
}
export default CheckoutForm
