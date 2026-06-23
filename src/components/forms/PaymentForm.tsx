import { useState } from "react"
import { CreditCard, User, Calendar, ShieldCheck, Lock, HelpCircle } from "lucide-react"
import { ValidationModal, validationRulesMap } from "../ValidationInfo"

export function PaymentForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Оплату надіслано! (Тут має бути інтегрований RHF)")
  }

  return (
    <div className="w-full rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Оплата карткою</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Форма №9: Безпечний інтернет-платіж</p>
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

      {/* Візуальний макет кредитної карти для естетики */}
      <div className="mb-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-md border border-slate-700/50">
        <div className="flex justify-between items-start mb-8">
          <CreditCard className="h-8 w-8 text-indigo-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Secure card</span>
        </div>
        <div className="text-xl font-mono tracking-widest mb-4 text-slate-200">•••• •••• •••• ••••</div>
        <div className="flex justify-between text-xs text-slate-400 font-mono">
          <div>
            <div className="uppercase text-[9px] text-slate-500 mb-0.5">Card Holder</div>
            <div className="uppercase">Cardholder Name</div>
          </div>
          <div>
            <div className="uppercase text-[9px] text-slate-500 mb-0.5">Expires</div>
            <div>MM/YY</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Поле: Ім'я на картці */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="pay-holder" className="text-sm font-semibold flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" /> Ім'я власника картки
          </label>
          <input
            id="pay-holder"
            name="cardHolder"
            type="text"
            placeholder="IVAN MAZEPA"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-slate-950 uppercase"
            // TODO: Підключити register("cardHolder")
          />
          {/* TODO: Відобразити помилку errors.cardHolder.message */}
        </div>

        {/* Поле: Номер картки */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="pay-number" className="text-sm font-semibold flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" /> Номер картки
          </label>
          <input
            id="pay-number"
            name="cardNumber"
            type="text"
            placeholder="1234 5678 1234 5678"
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-slate-950"
            // TODO: Підключити register("cardNumber")
          />
          {/* TODO: Відобразити помилку errors.cardNumber.message */}
        </div>

        {/* Термін дії та CVV */}
        <div className="grid grid-cols-2 gap-4">
          {/* Поле: Термін дії */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pay-expiry" className="text-sm font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" /> Термін дії
            </label>
            <input
              id="pay-expiry"
              name="expiry"
              type="text"
              placeholder="MM/YY"
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-slate-950"
              // TODO: Підключити register("expiry")
            />
            {/* TODO: Відобразити помилку errors.expiry.message */}
          </div>

          {/* Поле: CVV */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pay-cvv" className="text-sm font-semibold flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" /> CVV код
            </label>
            <input
              id="pay-cvv"
              name="cvv"
              type="password"
              placeholder="•••"
              maxLength={3}
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-slate-950"
              // TODO: Підключити register("cvv")
            />
            {/* TODO: Відобразити помилку errors.cvv.message */}
          </div>
        </div>

        {/* Чекбокс: Зберегти картку */}
        <div className="flex items-center gap-2 py-1">
          <input
            id="pay-save"
            name="saveCard"
            type="checkbox"
            className="rounded border-input text-indigo-600 focus:ring-indigo-500 h-4 w-4"
            // TODO: Підключити register("saveCard")
          />
          <label htmlFor="pay-save" className="text-xs text-muted-foreground cursor-pointer">
            Зберегти цю картку для майбутніх покупок
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-all shadow-sm hover:shadow-indigo-500/10 flex items-center justify-center gap-2"
        >
          <ShieldCheck className="h-4 w-4" /> Оплатити замовлення
        </button>
      </form>

      <ValidationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formTitle="Оплата карткою"
        rules={validationRulesMap.payment}
      />
    </div>
  )
}
export default PaymentForm
