import { useEffect, useRef, useState } from 'react'
import { Check, Copy, Landmark } from 'lucide-react'
import type { MembershipFormValues } from '../lib/membershipSchema'
import { priceLong, siteConfig } from '../config/site'

type Props = {
  open: boolean
  values: MembershipFormValues | null
  onClose: () => void
}

function CopyRow({ label, value, copyValue }: { label: string; value: string; copyValue?: string }) {
  const [state, setState] = useState<'idle' | 'ok' | 'ko'>('idle')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue ?? value)
      setState('ok')
    } catch {
      setState('ko')
    }
    setTimeout(() => setState('idle'), 2500)
  }
  return (
    <div className="py-3">
      <dt className="text-sm text-ink/70">{label}</dt>
      <dd className="mt-1 flex items-center justify-between gap-3">
        <span className="break-words font-bold tracking-wide">{value}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-plum/40 px-3 text-sm font-semibold text-plum hover:bg-plum/5"
          aria-label={`Copier : ${label}`}
        >
          {state === 'ok' ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
          {state === 'ok' ? 'Copié' : state === 'ko' ? 'Sélectionnez le texte' : 'Copier'}
        </button>
      </dd>
    </div>
  )
}

export default function PaymentPreviewDialog({ open, values, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const { beneficiary, iban, bic } = siteConfig.payment

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    else if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby="pay-title"
      aria-describedby="pay-desc"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close()
      }}
      className="m-auto max-h-[92dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-3xl bg-white p-0 text-ink shadow-2xl"
    >
      {open && values && (
      <div className="p-6">
        <Landmark aria-hidden="true" className="h-9 w-9 text-plum" />
        <h2 id="pay-title" className="mt-2 font-display text-2xl font-bold text-plum">
          Paiement par virement
        </h2>
        <p id="pay-desc" className="mt-2 text-base">
          Pour finaliser votre adhésion, effectuez un virement de <strong>{priceLong}</strong> vers le compte ci-dessous.
          Le paiement de la cotisation se fait uniquement par virement bancaire.
        </p>

        <dl className="mt-3 divide-y divide-sand rounded-2xl bg-cream/60 px-4">
          <div className="py-3">
            <dt className="text-sm text-ink/70">Bénéficiaire</dt>
            <dd className="mt-1 font-bold">{beneficiary}</dd>
          </div>
          <CopyRow label="IBAN" value={iban} copyValue={iban.replace(/\s/g, '')} />
          <CopyRow label="BIC" value={bic} />
          <div className="py-3">
            <dt className="text-sm text-ink/70">Montant</dt>
            <dd className="mt-1 font-bold">{priceLong}</dd>
          </div>
        </dl>

        <p className="mt-4 rounded-xl bg-sky/30 p-3 text-[15px]">
          Indiquez en référence du virement : <strong>Adhésion {values.fullName}</strong>
        </p>

        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-plum px-6 font-bold text-cream transition hover:bg-plum/90"
        >
          Fermer
        </button>
      </div>
      )}
    </dialog>
  )
}
