/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormProvider as Form, FieldErrors, UseFormReturn } from 'react-hook-form'
import { ReactNode, useEffect, useRef } from 'react'

interface FormProviderProps {
  children: ReactNode
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  methods: UseFormReturn<any>
  [key: string]: any
}

function getFirstErrorFieldName(errors: FieldErrors, parentPath = ''): string | null {
  for (const key of Object.keys(errors)) {
    const fieldPath = parentPath ? `${parentPath}.${key}` : key
    const error = errors[key]

    if (!error) continue

    if (error.message) {
      return fieldPath
    }

    if (typeof error === 'object' && !error.type) {
      const nested = getFirstErrorFieldName(error as FieldErrors, fieldPath)
      if (nested) return nested
    }
  }
  return null
}

export default function FormProvider({ children, onSubmit, methods, ...other }: FormProviderProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const {
    formState: { errors, submitCount },
  } = methods

  useEffect(() => {
    if (submitCount === 0 || Object.keys(errors).length === 0) return

    const fieldName = getFirstErrorFieldName(errors)
    if (!fieldName) return

    const formEl = formRef.current
    if (!formEl) return

    const escapedName = CSS.escape(fieldName)
    const el =
      formEl.querySelector<HTMLElement>(`[name="${escapedName}"]`) ||
      formEl.querySelector<HTMLElement>(`#${escapedName}`)

    if (!el) return

    el.scrollIntoView({ behavior: 'smooth', block: 'center' })

    const timer = setTimeout(() => {
      el.focus({ preventScroll: true })
    }, 300)

    return () => clearTimeout(timer)
  }, [submitCount, errors])

  return (
    <Form {...methods}>
      <form ref={formRef} {...other} onSubmit={onSubmit}>
        {children}
      </form>
    </Form>
  )
}
