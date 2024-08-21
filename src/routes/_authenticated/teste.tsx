import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/teste')({
  component: () => <div>Hello /login!</div>
})
