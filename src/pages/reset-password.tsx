import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeftIcon,
  BuildingsIcon,
  EnvelopeIcon,
  LockIcon,
} from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// ─── Schemas ─────────────────────────────────────────────────────────────────

const requestSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const resetSchema = z
  .object({
    code: z.string().min(1, 'Verification code is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RequestValues = z.infer<typeof requestSchema>;
type ResetValues = z.infer<typeof resetSchema>;

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 justify-center">
      <div className="size-8 rounded-md bg-primary flex items-center justify-center">
        <BuildingsIcon size={16} weight="fill" className="text-primary-foreground" />
      </div>
      <span className="font-bold text-base tracking-tight">Aurea Hotel</span>
    </Link>
  );
}

// ─── Animation ───────────────────────────────────────────────────────────────

const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 32 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -32 }),
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResetPasswordPage() {
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [direction, setDirection] = useState(1);
  const [email, setEmail] = useState('');

  function goToReset() { setDirection(1);  setStep('reset'); }
  function goBack()    { setDirection(-1); setStep('request'); }

  // ── Request form ──

  const requestForm = useForm<RequestValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: { email: '' },
  });

  function onRequest(values: RequestValues) {
    setEmail(values.email);
    // TODO: call request-reset API — backend sends OTP to email
    console.log(values);
    goToReset();
  }

  // ── Reset form ──

  const resetForm = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { code: '', password: '', confirmPassword: '' },
  });

  function onReset(values: ResetValues) {
    // TODO: call reset-password API with { email, code, password }
    console.log({ email, ...values });
  }

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 'request' ? (
            <motion.div
              key="request"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <div className="bg-background rounded-2xl border border-border shadow-sm p-8 flex flex-col gap-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <Logo />
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Reset your password</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      Enter your email and we'll send you a verification code.
                    </p>
                  </div>
                </div>

                <Form {...requestForm}>
                  <form onSubmit={requestForm.handleSubmit(onRequest)} className="flex flex-col gap-4">
                    <FormField
                      control={requestForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <EnvelopeIcon
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                              />
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                className="pl-9"
                                autoComplete="off"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full h-10 mt-1">
                      Send code
                    </Button>
                  </form>
                </Form>

                <p className="text-center text-sm text-muted-foreground">
                  Remembered it?{' '}
                  <Link
                    to="/login"
                    className="text-primary font-medium hover:underline underline-offset-4"
                  >
                    Back to sign in
                  </Link>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="reset"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <div className="bg-background rounded-2xl border border-border shadow-sm p-8 flex flex-col gap-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <Logo />
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Set new password</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      Enter the code we sent to{' '}
                      <span className="text-foreground font-medium">{email}</span>{' '}
                      and choose a new password.
                    </p>
                  </div>
                </div>

                <Form {...resetForm}>
                  <form onSubmit={resetForm.handleSubmit(onReset)} className="flex flex-col gap-4">
                    <FormField
                      control={resetForm.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Verification code</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter the code from your email"
                              autoComplete="one-time-code"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={resetForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <LockIcon
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                              />
                              <Input
                                type="password"
                                placeholder="Min. 8 characters"
                                className="pl-9"
                                autoComplete="new-password"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={resetForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm new password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <LockIcon
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                              />
                              <Input
                                type="password"
                                placeholder="Re-enter your new password"
                                className="pl-9"
                                autoComplete="new-password"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full h-10 mt-1">
                      Reset password
                    </Button>
                  </form>
                </Form>

                <div className="flex flex-col items-center gap-3">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive it?{' '}
                    <button
                      type="button"
                      onClick={() => console.log('resend reset OTP')}
                      className="text-primary font-medium hover:underline underline-offset-4"
                    >
                      Resend code
                    </button>
                  </p>
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeftIcon size={14} />
                    Back
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
