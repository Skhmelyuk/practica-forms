/* eslint-disable react-refresh/only-export-components */
import { X, ShieldAlert, CheckCircle2 } from "lucide-react"

interface ValidationModalProps {
  isOpen: boolean
  onClose: () => void
  formTitle: string
  rules: { field: string; requirements: string[] }[]
}

export function ValidationModal({ isOpen, onClose, formTitle, rules }: ValidationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Задній фон з розмиттям */}
      <div 
        className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200" 
        onClick={onClose}
      />
      
      {/* Вікно модалки */}
      <div className="relative w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl dark:bg-slate-900 animate-in fade-in zoom-in-95 duration-200 z-10 max-h-[85vh] overflow-y-auto">
        
        {/* Кнопка закриття */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground hover:bg-muted p-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {/* Заголовок */}
        <div className="flex items-center gap-2.5 mb-5 border-b border-border pb-3">
          <ShieldAlert className="h-5 w-5 text-indigo-500 shrink-0" />
          <h3 className="text-base font-bold tracking-tight">Вимоги до валідації: {formTitle}</h3>
        </div>

        {/* Список полів та правил */}
        <div className="space-y-4">
          {rules.map((rule, idx) => (
            <div key={idx} className="space-y-1.5 p-3 rounded-lg bg-muted/40 dark:bg-slate-950/40 border border-border/30">
              <span className="text-xs font-bold text-primary tracking-wide font-mono block">
                [ Поле: {rule.field} ]
              </span>
              <ul className="space-y-1">
                {rule.requirements.map((req, rIdx) => (
                  <li key={rIdx} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500/80 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Окремі структуровані правила для кожної форми
export const validationRulesMap = {
  contact: [
    { field: "name (Ім'я)", requirements: ["Обов'язкове поле", "Мінімум 3 символи", "Максимум 30 символів"] },
    { field: "email (Email)", requirements: ["Обов'язкове поле", "Має бути валідним форматом email"] },
    { field: "subject (Тема)", requirements: ["Обов'язкове поле (вибір одного зі значень підтримки/продажів тощо)"] },
    { field: "message (Повідомлення)", requirements: ["Обов'язкове поле", "Мінімум 10 символів", "Максимум 500 символів"] },
    { field: "newsletter (Новини)", requirements: ["Необов'язкове поле (тип boolean)"] }
  ],
  login: [
    { field: "email (Email)", requirements: ["Обов'язкове поле", "Має бути коректним email-адресом"] },
    { field: "password (Пароль)", requirements: ["Обов'язкове поле", "Мінімум 6 символів для безпеки"] },
    { field: "rememberMe (Запам'ятати)", requirements: ["Необов'язкове поле (тип boolean)"] }
  ],
  register: [
    { field: "fullName (ПІБ)", requirements: ["Обов'язкове поле", "Мінімум 3 символи", "Тільки літери та пробіли (без спецсимволів/цифр)"] },
    { field: "email (Email)", requirements: ["Обов'язкове поле", "Має бути коректним email"] },
    { field: "password (Пароль)", requirements: ["Обов'язкове поле", "Мінімум 8 символів", "Містить щонайменше 1 велику літеру", "Містить щонайменше 1 цифру", "Містить щонайменше 1 спеціальний символ"] },
    { field: "confirmPassword (Підтвердження)", requirements: ["Обов'язкове поле", "Має точно збігатися з полем password (використати refine)"] },
    { field: "acceptTerms (Правила)", requirements: ["Обов'язкове для вибору (значення має бути строго true)"] }
  ],
  profile: [
    { field: "username (Нікнейм)", requirements: ["Обов'язкове поле", "Від 3 до 15 символів", "Тільки латинські літери, цифри та символ підкреслення (_)"] },
    { field: "website (Сайт)", requirements: ["Необов'язкове поле", "Якщо заповнене — має відповідати коректному URL адресу"] },
    { field: "gender (Стать)", requirements: ["Обов'язкове поле", "Вибір одного із радіо-значень (male/female/other)"] },
    { field: "bio (Про себе)", requirements: ["Необов'язкове поле", "Якщо заповнене — максимум 200 символів"] }
  ],
  event: [
    { field: "title (Назва)", requirements: ["Обов'язкове поле", "Довжина від 5 до 100 символів"] },
    { field: "date (Дата)", requirements: ["Обов'язкове поле", "Дата проведення події має бути в майбутньому (після поточної дати)"] },
    { field: "location (Локація)", requirements: ["Умовне поле: Обов'язкове тільки якщо відсутній вибір 'Онлайн подія' (isOnline === false)", "Мінімум 5 символів"] },
    { field: "maxParticipants (Учасники)", requirements: ["Обов'язкове поле", "Має бути числом в межах від 10 до 1000"] },
    { field: "category (Категорія)", requirements: ["Обов'язкове поле (вибір зі списку категорії події)"] },
    { field: "isOnline (Онлайн)", requirements: ["Необов'язкове поле (тип boolean)"] }
  ],
  checkout: [
    { field: "customerName (ПІБ)", requirements: ["Обов'язкове поле", "Мінімум 5 символів"] },
    { field: "phone (Телефон)", requirements: ["Обов'язкове поле", "Має відповідати українському мобільному формату +380XXXXXXXXX (регулярний вираз)"] },
    { field: "address (Адреса)", requirements: ["Обов'язкове поле", "Мінімум 10 символів"] },
    { field: "paymentMethod (Спосіб оплати)", requirements: ["Обов'язкове поле (один із варіантів оплати)"] }
  ],
  review: [
    { field: "productName (Товар)", requirements: ["Обов'язкове поле", "Мінімум 3 символи"] },
    { field: "rating (Оцінка)", requirements: ["Обов'язкове поле", "Має бути числом від 1 до 5"] },
    { field: "pros (Переваги)", requirements: ["Необов'язкове поле", "Якщо заповнене — максимум 100 символів"] },
    { field: "cons (Недоліки)", requirements: ["Необов'язкове поле", "Якщо заповнене — максимум 100 символів"] },
    { field: "reviewText (Коментар)", requirements: ["Обов'язкове поле", "Мінімум 20 символів", "Максимум 1000 символів"] }
  ],
  job: [
    { field: "candidateName (ПІБ)", requirements: ["Обов'язкове поле", "Мінімум 4 символи"] },
    { field: "email (Email)", requirements: ["Обов'язкове поле", "Має бути коректним email-адресом"] },
    { field: "phone (Телефон)", requirements: ["Обов'язкове поле", "Має відповідати формату телефону"] },
    { field: "position (Вакансія)", requirements: ["Обов'язкове поле (вибір вакансії зі списку)"] },
    { field: "portfolio (Портфоліо)", requirements: ["Обов'язкове поле", "Має бути валідним URL посиланням (наприклад, GitHub/Behance)"] },
    { field: "experience (Досвід)", requirements: ["Обов'язкове поле", "Число від 0 до 50 років"] },
    { field: "coverLetter (Супровідний)", requirements: ["Необов'язкове поле", "Якщо заповнене — мінімум 30 символів"] }
  ],
  payment: [
    { field: "cardHolder (Власник)", requirements: ["Обов'язкове поле", "Мінімум 4 символи", "Тільки великі латинські літери та пробіли"] },
    { field: "cardNumber (Номер карти)", requirements: ["Обов'язкове поле", "Має містити рівно 16 цифр (можна з урахуванням пробілів)"] },
    { field: "expiry (Термін дії)", requirements: ["Обов'язкове поле", "Формат MM/YY, де місяць 01-12", "Термін дії не має бути простроченим"] },
    { field: "cvv (CVV код)", requirements: ["Обов'язкове поле", "Рівно 3 цифры (тільки числове введення)"] },
    { field: "saveCard (Зберегти карту)", requirements: ["Необов'язкове поле (тип boolean)"] }
  ]
}
