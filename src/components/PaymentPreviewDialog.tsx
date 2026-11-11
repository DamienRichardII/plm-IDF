import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, Info } from 'lucide-react'
import type { MembershipFormValues } from '../lib/membershipSchema'
import { priceLong } from '../config/site'
import { demoMembershipService } from '../services/membershipService'

type Props = {
  open: boolean
  values: MembershipFormValues | null
  /** completed = true si la simulation est allée au bout */
  onClose: (completed: boolean) => void
}

export default function PaymentPreviewDialog({ open, values, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [stage, setStage] = useState<'review' | 'done'>('review')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) {
      setStage('review')
      setBusy(false)
      d.showModal()
    } else if (!open && d.open) {
      d.close()
    }
  }, [open])

  const confirm = async () => {
    if (!values) return
    setBusy(true)
    await demoMembershipService.confirm(values)
    setBusy(false)
    setStage('done')
  }

  const btnPrimary =
    'inline-flex min-h-12 items-center justify-center rounded-full bg-plum px-6 font-bold text-cream transition hover:bg-plum/90 disabled:opacity-60'
  const btnSecondary =
    'inline-flex min-h-12 items-center justify-center rounded-full border-2 border-plum px-6 font-semibold text-plum transition hover:bg-plum/5'

  return (
    <dialog
      ref={ref}
      aria-labelledby="pay-title"
      aria-describedby="pay-desc"
      onClose={() => onClose(stage === 'done')}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close()
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl bg-white p-0 text-ink shadow-2xl"
    >
      <div className="p-6">
        {stage === 'review' ? (
          <>
            <h2 id="pay-title" className="font-display text-2xl font-bold text-plum">
              Récapitulatif de l’adhésion
            </h2>
            <p id="pay-desc" className="mt-3 flex gap-2 rounded-xl bg-sky/30 p-3 text-[15px]">
              <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
              <span>
                <strong>Paiement simulé.</strong> Aucun numéro de carte bancaire n’est demandé et rien n’est envoyé.
              </span>
            </p>
            <dl className="mt-4 divide-y divide-sand text-[15px]">
              <Row label="Nom et prénom" value={values?.fullName ?? ''} />
              <Row label="Adresse mail" value={values?.email ?? ''} />
              <Row label="Adresse postale" value={values?.postalAddress ?? ''} />
              <Row label="Cotisation annuelle" value={priceLong} strong />
            </dl>
            <div className="mt-6 flex flex-col gap-3">
              <button type="button" className={btnPrimary} onClick={confirm} disabled={busy}>
                {busy ? 'Simulation en cours…' : 'Simuler la confirmation'}
              </button>
              <button type="button" className={btnSecondary} onClick={() => ref.current?.close()} disabled={busy}>
                Revenir au formulaire
              </button>
            </div>
          </>
        ) : (
          <>
            <CheckCircle2 aria-hidden="true" className="h-10 w-10 text-plum" />
            <h2 id="pay-title" className="mt-2 font-display text-2xl font-bold text-plum">
              Démonstration terminée
            </h2>
            <p id="pay-desc" role="status" className="mt-3 text-base">
              Démonstration terminée. Aucun paiement n’a été effectué et aucune adhésion n’a été enregistrée.
            </p>
            <button type="button" className={`${btnPrimary} mt-6 w-full`} onClick={() => ref.current?.close()}>
              Fermer
            </button>
          </>
        )}
      </div>
    </dialog>
  )
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between gap-4 py-2">
      <dt className="shrink-0 text-ink/70">{label}</dt>
      <dd className={`[overflow-wrap:anywhere] text-right ${strong ? 'font-bold' : ''}`}>{value}</dd>
    </div>
  )
}
