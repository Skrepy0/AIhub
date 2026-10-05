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
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId: string) => void
      execute: (widgetId: string) => void
      getResponse: (widgetId: string) => string
      remove: (widgetId: string) => void
    }
  }
}

interface TurnstileProps {
  siteKey: string
  onVerify: (token: string) => void
  onExpire?: () => void
  className?: string
}

export interface TurnstileRef {
  reset: () => void
  execute: () => void
  getResponse: () => string
  remove: () => void
}

export const Turnstile = forwardRef<TurnstileRef, TurnstileProps>(
  function Turnstile({ siteKey, onVerify, onExpire, className }, ref) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const widgetIdRef = useRef<string | null>(null)
    const renderedRef = useRef(false)
    const onVerifyRef = useRef(onVerify)
    const onExpireRef = useRef(onExpire)

    // Keep callback refs current so the render effect doesn't re-fire
    onVerifyRef.current = onVerify
    onExpireRef.current = onExpire

    useImperativeHandle(
      ref,
      () => ({
        reset() {
          const wid = widgetIdRef.current
          if (wid && window.turnstile) window.turnstile.reset(wid)
        },
        execute() {
          const wid = widgetIdRef.current
          if (wid && window.turnstile) window.turnstile.execute(wid)
        },
        getResponse() {
          const wid = widgetIdRef.current
          if (wid && window.turnstile) return window.turnstile.getResponse(wid)
          return ''
        },
        remove() {
          const wid = widgetIdRef.current
          if (wid && window.turnstile) {
            window.turnstile.remove(wid)
            widgetIdRef.current = null
          }
        },
      }),
      []
    )

    useEffect(() => {
      if (renderedRef.current) return

      const render = () => {
        if (!containerRef.current || !window.turnstile) return
        if (renderedRef.current) return

        try {
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => onVerifyRef.current(token),
            'error-callback': () => onExpireRef.current?.(),
            'expired-callback': () => onExpireRef.current?.(),
          })
          renderedRef.current = true
        } catch {
          /* empty */
        }
      }

      if (window.turnstile) {
        render()
        return
      }

      const scriptId = 'cf-turnstile'
      const existing = document.getElementById(
        scriptId
      ) as HTMLScriptElement | null
      if (existing) {
        if ((window as unknown as { turnstile?: unknown }).turnstile) {
          render()
        } else {
          existing.addEventListener('load', render, { once: true })
        }
      } else {
        const s = document.createElement('script')
        s.id = scriptId
        s.src =
          'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
        s.async = true
        s.defer = true
        s.onload = () => render()
        document.head.appendChild(s)
      }

      return () => {
        if (renderedRef.current) {
          const wid = widgetIdRef.current
          if (wid && window.turnstile) {
            try {
              window.turnstile.remove(wid)
            } catch {
              /* empty */
            }
          }
          widgetIdRef.current = null
          renderedRef.current = false
        }
      }
    }, [siteKey])

    return <div ref={containerRef} className={className} />
  }
)
