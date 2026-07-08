import { Form, Head } from '@inertiajs/react';
import { useRef } from 'react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

const demoAccounts = [
    {
        name: 'Test User',
        description: 'Browse the projects as a regular visitor',
        email: 'test@example.com',
        password: 'password',
    },
    {
        name: 'Demo User',
        description: 'A second account with its own data',
        email: 'demo@example.com',
        password: 'password',
    },
];

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const fillCredentials = (account: (typeof demoAccounts)[number]) => {
        if (emailRef.current) {
            emailRef.current.value = account.email;
        }
        if (passwordRef.current) {
            passwordRef.current.value = account.password;
        }
        passwordRef.current?.focus();
    };

    return (
        <AuthLayout
            title="Log in to your account"
            description="Enter your email and password below to log in"
        >
            <Head title="Log in" />

            <div className="mb-6 grid gap-3">
                <p className="text-center text-sm text-muted-foreground">
                    Quick access — click an account to fill the form
                </p>
                {demoAccounts.map((account) => (
                    <button
                        key={account.email}
                        type="button"
                        onClick={() => fillCredentials(account)}
                        className="rounded-xl border bg-card p-4 text-left text-card-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                        <span className="block text-sm font-medium">
                            {account.name}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                            {account.description}
                        </span>
                        <span className="mt-1 block text-xs text-muted-foreground">
                            {account.email}
                        </span>
                    </button>
                ))}
            </div>

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    ref={emailRef}
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    ref={passwordRef}
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Log in
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="text-center text-sm text-muted-foreground">
                                Don't have an account?{' '}
                                <TextLink href={register()} tabIndex={5}>
                                    Sign up
                                </TextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
