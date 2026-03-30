export type WithClassName<P extends object = object> = Omit<P, 'className'> & {
  className?: string
}
