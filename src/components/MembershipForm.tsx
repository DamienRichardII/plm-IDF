import { useRef, useState } from 'react'
import type { ComponentType, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, CreditCard, Info, Mail, MapPin, Pencil, User, UserPlus } from 'lucide-react'
import { MOTIVATION_MAX, membershipSchema } from '../lib/membershipSchema'
import type { MembershipFormValues } from '../lib/membershipSchema'
import { priceLong, siteConfig } from '../config/site'
import { BrushBand } from './Decor'
import PaymentPreviewDialog from './PaymentPreviewDialog'

const field =
  'block h-12 w-full rounded-xl border bg-white pl-11 pr-3 text-base text-ink placeholder:text-ink/50 aria-[invalid=true]:border-red-700 border-plum/25'

function Field({
  id,
  label,
  error,
  icon: Icon,
  children,
}: {
  id: string
  label: string
  error?: string
  icon?: ComponentType<{ className?: string }>
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[15px] font-bold">
        {label} <span aria-hidden="true" className="text-red-700">*</span>
      </label>
      <div className="relative">
        {Icon && <Icon className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-ink/60" />}
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm font-semibold text-red-800">
          {error}
        </p>
      )}
    </div>
  )
}

export default function MembershipForm({ className = '' }: { className?: string }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<MembershipFormValues>({
    resolver: zodResolver(membershipSchema),
    mode: 'onTouched',
    defaultValues: { fullName: '', postalAddress: '', email: '', source: '' },
  })
  const [pending, setPending] = useState<MembershipFormValues | null>(null)
  const submitRef = useRef<HTMLButtonElement>(null)
  const count = watch('source')?.length ?? 0

  const aria = (name: keyof MembershipFormValues) => ({
    'aria-invalid': errors[name] ? (true as const) : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    'aria-required': true as const,
  })

  const onClose = (completed: boolean) => {
    setPending(null) // les données ne sont jamais conservées
    if (completed) reset()
    submitRef.current?.focus()
  }

  return (
    <section
      id="formulaire"
      aria-labelledby="form-title"
      tabIndex={-1}
      className={`scroll-mt-20 outline-none rounded-[28px] bg-white/90 p-5 shadow-soft sm:p-8 ${className}`}
    >
      <h2 id="form-title" className="flex items-center justify-center gap-3 text-center text-2xl font-bold sm:text-3xl">
        <UserPlus aria-hidden="true" className="h-7 w-7 shrink-0" />
        Formulaire d’adhésion
      </h2>
      <p className="mt-3 text-center">
        <BrushBand className="px-5 py-2 font-display text-base font-bold text-plum sm:text-xl">
          Rejoins Parcours le Monde Île-de-France !
        </BrushBand>
      </p>
      <p className="mt-4 text-sm text-ink/80">
        <span aria-hidden="true" className="text-red-700">*</span> Champs obligatoires
      </p>

      <form noValidate onSubmit={handleSubmit((v) => setPending(v))} className="mt-3 space-y-4">
        <Field id="fullName" label="Nom et prénom" icon={User} error={errors.fullName?.message}>
          <input id="fullName" type="text" autoComplete="name" placeholder="Votre nom et prénom" className={field} {...aria('fullName')} {...register('fullName')} />
        </Field>
        <Field id="postalAddress" label="Adresse postale" icon={MapPin} error={errors.postalAddress?.message}>
          <input id="postalAddress" type="text" autoComplete="street-address" placeholder="Numéro, rue, code postal, ville" className={field} {...aria('postalAddress')} {...register('postalAddress')} />
        </Field>
        <Field id="email" label="Adresse mail" icon={Mail} error={errors.email?.message}>
          <input id="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} placeholder="votre@email.com" className={field} {...aria('email')} {...register('email')} />
        </Field>
        <Field id="source" label="Comment avez-vous connu Parcours le Monde IDF ?" error={errors.source?.message}>
          <Pencil aria-hidden="true" className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-ink/60" />
          <textarea
            id="source"
            rows={3}
            maxLength={MOTIVATION_MAX}
            autoComplete="off"
            placeholder="Bouche-à-oreille, réseaux sociaux, événement…"
            className={`${field} h-auto min-h-24 resize-y py-3`}
            {...aria('source')}
            {...register('source')}
          />
          <p aria-live="off" className="mt-1 text-right text-sm text-ink/70">
            {count} / {MOTIVATION_MAX}
          </p>
        </Field>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-sand bg-cream/60 p-4">
          <CreditCard aria-hidden="true" className="h-9 w-9 shrink-0 text-plum" />
          <div className="min-w-[10rem] flex-1">
            <p className="font-bold">Cotisation annuelle</p>
            <p className="text-sm leading-snug">Adhésion à l’association {siteConfig.associationName}</p>
          </div>
          <p className="w-full shrink-0 rounded-xl bg-sand px-3 py-2 text-center text-xl font-bold sm:w-auto">{priceLong}</p>
        </div>

        <button
          ref={submitRef}
          type="submit"
          className="flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-plum px-5 text-base font-bold text-cream shadow-soft transition hover:-translate-y-0.5 hover:bg-plum/90 active:translate-y-0 sm:text-lg"
        >
          <CreditCard aria-hidden="true" className="h-5 w-5 shrink-0" />
          Payer {priceLong} et adhérer
          <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0" />
        </button>
        <p className="flex items-center justify-center gap-2 text-center text-sm font-semibold text-ink/85">
          <Info aria-hidden="true" className="h-4 w-4 shrink-0" />
          Démonstration : aucun paiement ni envoi de données.
        </p>
      </form>

      <PaymentPreviewDialog open={pending !== null} values={pending} onClose={onClose} />
    </section>
  )
}
