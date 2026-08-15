/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
// Modified by Skrepy2233 (AIhub) on 2026-08-15

import {
  Activity,
  CircleDot,
  DatabaseZap,
  ShieldCheck,
  Split,
  WandSparkles,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'

export function HowItWorks() {
  const { t } = useTranslation()

  const steps = [
    {
      num: '1',
      title: t('Connect upstreams'),
      desc: t(
        'Register providers, keys, and models, then map them into a single entry point.'
      ),
      icon: <DatabaseZap className='size-6' strokeWidth={1.5} />,
    },
    {
      num: '2',
      title: t('Route with policy'),
      desc: t(
        'Set fallback rules, budgets, and access controls for the traffic you send.'
      ),
      icon: <Split className='size-6' strokeWidth={1.5} />,
    },
    {
      num: '3',
      title: t('Monitor everything'),
      desc: t(
        'Watch health, spend, and latency in one place and respond before users notice.'
      ),
      icon: <Activity className='size-6' strokeWidth={1.5} />,
    },
    {
      num: '4',
      title: t('Ship with confidence'),
      desc: t(
        'Give teams a stable gateway while the upstream fleet evolves underneath.'
      ),
      icon: <ShieldCheck className='size-6' strokeWidth={1.5} />,
    },
  ]

  return (
    <section className='border-border/40 relative z-10 border-t px-6 py-20 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-16 max-w-2xl'>
          <p className='text-muted-foreground mb-3 text-xs font-medium tracking-widest uppercase'>
            {t('How it works')}
          </p>
          <h2 className='text-2xl font-bold tracking-tight md:text-4xl'>
            {t('From raw upstreams to a clean relay layer')}
          </h2>
          <p className='text-muted-foreground mt-4 max-w-xl text-sm leading-relaxed md:text-base'>
            {t(
              'AIhub keeps the messy parts of model access behind the curtain so your team only sees one dependable surface.'
            )}
          </p>
        </AnimateInView>

        <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
          {steps.map((step, i) => (
            <AnimateInView
              key={step.num}
              delay={i * 120}
              animation='fade-up'
              className='border-border/40 bg-background relative min-w-0 overflow-hidden rounded-3xl border p-6'
            >
              <div className='text-muted-foreground/20 absolute top-4 right-4 text-5xl font-black tracking-tight'>
                {step.num}
              </div>
              <div className='border-border/50 bg-muted/30 relative mb-5 flex size-14 items-center justify-center rounded-2xl border'>
                {step.icon}
              </div>
              <h3 className='text-base font-semibold'>{step.title}</h3>
              <p className='text-muted-foreground mt-2 text-sm leading-relaxed break-words'>
                {step.desc}
              </p>
              <div className='text-muted-foreground mt-5 flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase'>
                <CircleDot className='size-3.5 text-cyan-500' />
                {t('Stage')}
                <WandSparkles className='size-3.5 text-violet-500' />
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
