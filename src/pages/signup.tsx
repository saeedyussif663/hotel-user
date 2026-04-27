import { zodResolver } from '@hookform/resolvers/zod';
import {
  BuildingsIcon,
  DeviceMobileIcon,
  EnvelopeIcon,
  LockIcon,
  UserIcon,
  ArrowLeftIcon,
} from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
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
import { Separator } from '@/components/ui/separator';

// ─── Schemas ────────────────────────────────────────────────────────────────

const signupSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^\d{9}$/.test(val),
        'Enter a valid 9-digit number (e.g. 244 123 456)'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const otpSchema = z.object({
  code: z.string().length(6, 'Enter the 6-digit code'),
});

type SignupValues = z.infer<typeof signupSchema>;
type OtpValues = z.infer<typeof otpSchema>;

// ─── Logo ────────────────────────────────────────────────────────────────────

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

// ─── OTP input ───────────────────────────────────────────────────────────────

function OtpBoxes({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const boxRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));
  const chars = value.split('').concat(Array(6).fill('')).slice(0, 6);

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, '').slice(-1);
    const next = [...chars];
    next[index] = digit;
    onChange(next.join(''));
    if (digit && index < 5) boxRefs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !chars[index] && index > 0) {
      const prev = [...chars];
      prev[index - 1] = '';
      onChange(prev.join(''));
      boxRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    onChange(pasted.padEnd(6, '').slice(0, 6).trimEnd());
    const focusIdx = Math.min(pasted.length, 5);
    boxRefs.current[focusIdx]?.focus();
  }

  return (
    <div className="flex gap-2.5 justify-center">
      {chars.map((char, i) => (
        <input
          key={i}
          ref={(el) => { boxRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={char}
          autoFocus={i === 0}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          className="w-11 h-12 text-center text-lg font-semibold border border-input rounded-lg bg-transparent outline-none focus-visible:border-ring transition-colors caret-transparent"
        />
      ))}
    </div>
  );
}

// ─── Steps ───────────────────────────────────────────────────────────────────

const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 32 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -32 }),
};

export default function SignupPage() {
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [direction, setDirection] = useState(1);
  const [email, setEmail] = useState('');

  function goToOtp() { setDirection(1); setStep('otp'); }
  function goBack()  { setDirection(-1); setStep('form'); }

  // ── Signup form ──

  const signupForm = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', phone: '' },
  });

  function onSignup(values: SignupValues) {
    setEmail(values.email);
    // TODO: call signup API — backend sets isActive: false, sends OTP
    console.log(values);
    goToOtp();
  }

  // ── OTP form ──

  const otpForm = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: '' },
  });

  function onVerify(values: OtpValues) {
    // TODO: call verify-otp API — backend sets isActive: true
    console.log(values);
  }

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 'form' ? (
            <motion.div
              key="form"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <div className="bg-background rounded-2xl border border-border shadow-sm p-8 flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col items-center gap-4 text-center">
                  <Logo />
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      Join Aurea and manage all your stays in one place.
                    </p>
                  </div>
                </div>

                {/* Google */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-2 h-10"
                  onClick={() => console.log('Google sign-up')}
                >
                  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  Continue with Google
                </Button>

                <div className="flex items-center gap-3">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">or</span>
                  <Separator className="flex-1" />
                </div>

                {/* Form */}
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(onSignup)} className="flex flex-col gap-4">
                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        control={signupForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <UserIcon
                                  size={16}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input placeholder="John" className="pl-9" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signupForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Email */}
                    <FormField
                      control={signupForm.control}
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

                    {/* Password */}
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
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

                    {/* Confirm password */}
                    <FormField
                      control={signupForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <LockIcon
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                              />
                              <Input
                                type="password"
                                placeholder="Re-enter your password"
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

                    {/* Phone — optional */}
                    <FormField
                      control={signupForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Phone number{' '}
                            <span className="text-muted-foreground font-normal">(optional)</span>
                          </FormLabel>
                          <FormControl>
                            <div className="flex">
                              <span className="inline-flex items-center gap-1.5 px-3 rounded-l-lg border border-r-0 border-input bg-muted text-sm text-muted-foreground shrink-0">
                                <DeviceMobileIcon size={14} />
                                +233
                              </span>
                              <Input
                                type="tel"
                                inputMode="numeric"
                                placeholder="244 123 456"
                                className="rounded-l-none"
                                maxLength={9}
                                {...field}
                                onChange={(e) =>
                                  field.onChange(e.target.value.replace(/\D/g, ''))
                                }
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full h-10 mt-1">
                      Create account
                    </Button>
                  </form>
                </Form>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-primary font-medium hover:underline underline-offset-4"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="otp"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <div className="bg-background rounded-2xl border border-border shadow-sm p-8 flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col items-center gap-4 text-center">
                  <Logo />
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      We sent a 6-digit code to{' '}
                      <span className="text-foreground font-medium">{email}</span>.
                      Enter it below to activate your account.
                    </p>
                  </div>
                </div>

                <Form {...otpForm}>
                  <form onSubmit={otpForm.handleSubmit(onVerify)} className="flex flex-col gap-6">
                    <FormField
                      control={otpForm.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <OtpBoxes value={field.value} onChange={field.onChange} />
                          </FormControl>
                          <FormMessage className="text-center" />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full h-10">
                      Verify &amp; activate
                    </Button>
                  </form>
                </Form>

                <div className="flex flex-col items-center gap-3">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive it?{' '}
                    <button
                      type="button"
                      onClick={() => console.log('resend OTP')}
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
                    Back to sign up
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
