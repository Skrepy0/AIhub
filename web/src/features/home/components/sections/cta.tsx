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
import { ArrowRight, GlobeLock, LayoutDashboard } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'
import { Button } from '@/components/ui/button'

interface CTAProps {
  className?: string
  isAuthenticated?: boolean
}

export function CTA(props: CTAProps) {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 overflow-hidden px-6 py-20 md:py-28'>
      <div
        aria-hidden
        className='absolute inset-0 -z-10 opacity-20 dark:opacity-[0.08]'
        style={{
          background: [
            'radial-gradient(ellipse 50% 50% at 30% 50%, oklch(0.7 0.15 250 / 70%) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 40% at 70% 40%, oklch(0.65 0.12 200 / 50%) 0%, transparent 70%)',
          ].join(', '),
        }}
      />

      <AnimateInView className='mx-auto max-w-4xl' animation='scale-in'>
        <div className='border-border/40 bg-background/80 rounded-[2rem] border p-8 text-center shadow-[0_25px_80px_-35px_rgba(15,23,42,0.25)] backdrop-blur-sm md:p-12'>
          <div className='mx-auto flex size-14 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10'>
            <GlobeLock className='size-7 text-cyan-500' />
          </div>
          <h2 className='mt-6 text-2xl leading-tight font-bold tracking-tight md:text-4xl'>
            {t('Make AI access feel like infrastructure, not improvisation')}
          </h2>
          <p className='text-muted-foreground/80 mx-auto mt-4 max-w-2xl text-sm leading-relaxed md:text-base'>
            {t(
              'AIhub gives you one branded gateway for models, budgets, routing rules, and analytics — ready for teams that want a stable place to land.'
            )}
          </p>

          <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
            {props.isAuthenticated ? (
              <>
                <Button
                  className='group rounded-lg'
                  render={<Link to='/dashboard' />}
                >
                  <LayoutDashboard className='mr-2 size-4' />
                  {t('Open dashboard')}
                  <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
                </Button>
                <Button
                  variant='outline'
                  className='border-border/50 hover:border-border hover:bg-muted/50 rounded-lg'
                  render={<Link to='/pricing' />}
                >
                  {t('View pricing')}
                </Button>
              </>
            ) : (
              <>
                <Button
                  className='group rounded-lg'
                  render={<Link to='/sign-up' />}
                >
                  {t('Start with AIhub')}
                  <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
                </Button>
                <Button
                  variant='outline'
                  className='border-border/50 hover:border-border hover:bg-muted/50 rounded-lg'
                  render={<Link to='/pricing' />}
                >
                  {t('Explore plans')}
                </Button>
              </>
            )}
          </div>
        </div>
      </AnimateInView>
    </section>
  )
}
