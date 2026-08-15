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
import { Link } from '@tanstack/react-router'
import {
  Activity,
  ArrowRight,
  Blocks,
  CircleGauge,
  Workflow,
  Shield,
  Sparkles,
  WandSparkles,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'
import { Button } from '@/components/ui/button'

interface FeaturesProps {
  className?: string
}

export function Features(_props: FeaturesProps) {
  const { t } = useTranslation()

  const features = [
    {
      id: 'routing',
      title: t('Multi-model routing'),
      desc: t(
        'Send one request to the best upstream with simple policies and fallback paths.'
      ),
      icon: <Workflow className='size-4 text-cyan-400' />,
    },
    {
      id: 'telemetry',
      title: t('Live telemetry'),
      desc: t(
        'Watch throughput, cost, latency, and health without leaving the dashboard.'
      ),
      icon: <Activity className='size-4 text-emerald-400' />,
    },
    {
      id: 'control',
      title: t('Policy control'),
      desc: t(
        'Set budgets, limits, access rules, and safe defaults for every team.'
      ),
      icon: <Shield className='size-4 text-violet-400' />,
    },
    {
      id: 'compat',
      title: t('API compatibility'),
      desc: t(
        'Keep existing clients working while you expand providers behind the scenes.'
      ),
      icon: <Blocks className='size-4 text-amber-400' />,
    },
  ]

  const highlights = [
    { value: 'One API', label: t('for every upstream') },
    { value: 'Smart fallback', label: t('when a model is busy') },
    { value: 'Cost-aware', label: t('routing decisions') },
    { value: 'Team-ready', label: t('permission boundaries') },
  ]

  return (
    <section className='relative z-10 px-6 py-20 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-16 max-w-2xl'>
          <p className='text-muted-foreground mb-3 text-xs font-medium tracking-widest uppercase'>
            {t('Why AIhub')}
          </p>
          <h2 className='text-2xl leading-tight font-bold tracking-tight md:text-4xl'>
            {t('A cleaner relay layer for AI products')}
          </h2>
          <p className='text-muted-foreground mt-4 max-w-xl text-sm leading-relaxed md:text-base'>
            {t(
              'AIhub turns a pile of provider accounts into one calm, inspectable control plane. Ship faster without rebuilding every client integration.'
            )}
          </p>
        </AnimateInView>

        <div className='grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]'>
          <div className='border-border/40 bg-border/40 grid min-w-0 gap-px overflow-hidden rounded-3xl border md:grid-cols-2'>
            {features.map((f, i) => (
              <AnimateInView
                key={f.id}
                delay={i * 80}
                animation='scale-in'
                className='bg-background group hover:bg-muted/20 min-w-0 p-7 transition-colors duration-300 md:p-8'
              >
                <div className='border-border/50 bg-muted/30 mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10'>
                  {f.icon}
                </div>
                <h3 className='text-sm font-semibold'>{f.title}</h3>
                <p className='text-muted-foreground mt-2 text-sm leading-relaxed break-words'>
                  {f.desc}
                </p>
              </AnimateInView>
            ))}
          </div>

          <AnimateInView
            className='border-border/40 via-background relative overflow-hidden rounded-3xl border bg-gradient-to-br from-cyan-500/8 to-violet-500/8 p-7 md:p-8'
            animation='scale-in'
          >
            <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent' />
            <div className='text-muted-foreground flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase'>
              <Sparkles className='size-3.5 text-cyan-400' />
              <span className='min-w-0 truncate'>
                {t('AIhub control room')}
              </span>
            </div>
            <div className='mt-5 space-y-4'>
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className='border-border/40 flex items-start justify-between gap-4 border-b pb-3 last:border-b-0 last:pb-0'
                >
                  <div className='min-w-0'>
                    <div className='text-lg font-semibold'>{item.value}</div>
                    <div className='text-muted-foreground min-w-0 text-sm break-words'>
                      {item.label}
                    </div>
                  </div>
                  <CircleGauge className='size-5 shrink-0 text-cyan-500/80' />
                </div>
              ))}
            </div>
            <div className='mt-8 flex flex-wrap gap-3'>
              <Button
                className='group rounded-lg'
                render={<Link to='/dashboard' />}
              >
                {t('Open dashboard')}
                <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
              <Button
                variant='outline'
                className='border-border/50 hover:border-border hover:bg-muted/50 rounded-lg'
                render={<Link to='/pricing' />}
              >
                {t('See plans')}
              </Button>
            </div>
          </AnimateInView>
        </div>

        <div className='mt-10 grid grid-cols-2 gap-4 md:grid-cols-4'>
          {[
            { icon: WandSparkles, label: t('Fast onboarding') },
            { icon: Activity, label: t('Operational insight') },
            { icon: Shield, label: t('Safer defaults') },
            { icon: Blocks, label: t('Client compatibility') },
          ].map((item) => (
            <AnimateInView
              key={item.label}
              delay={80}
              animation='fade-up'
              className='border-border/40 bg-muted/15 min-w-0 rounded-2xl border p-4'
            >
              <item.icon className='size-5 text-cyan-500' />
              <div className='mt-3 min-w-0 text-sm font-medium break-words'>
                {item.label}
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
