import {createFileRoute, redirect} from '@tanstack/react-router';
import {FormEvent, useState} from 'react';
import {useAuth} from "@/features/auth";
import {Button, Input} from "@/common";

const fallback = '/home' as const

export const Route = createFileRoute('/login')({
  beforeLoad:({context, search})=>{
    const {checkAuthStatus} = context.authentication
    if (checkAuthStatus()) {
      throw redirect({ to: search.redirect || fallback })
    }
  },
  component: Login
});

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {login} = useAuth();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white shadow-md rounded-lg w-full max-w-sm"
      >
        <Input
          id="email"
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          type="password"
          label="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
}

