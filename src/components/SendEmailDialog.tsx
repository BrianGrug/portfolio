import { useRef, useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import type { TurnstileInstance } from '@marsidev/react-turnstile';
import { useMutation } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Dialog } from '@/components/retroui/Dialog';
import { Button } from '@/components/retroui/Button';
import { sendEmail } from '@/lib/sendEmail';
import { Textarea } from '@/components/retroui/Textarea';
import { Input } from './retroui/Input';

export default function SendEmailDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const { mutateAsync: sendEmailMutation, isPending } = useMutation({
    mutationFn: ({
      body,
      returnEmail,
      turnstileToken,
    }: {
      body: string;
      returnEmail: string;
      turnstileToken: string;
    }) =>
      sendEmail({
        data: {
          token: turnstileToken,
          body: `From: ${returnEmail}\n\n${body}`,
          subject: 'New Inquiry - ' + new Date().toLocaleDateString(),
        },
      }),
    onSuccess: (data) => {
      form.reset();
      onOpenChange(false);
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      turnstileRef.current?.reset();
      setToken(null);
    },
  });

  const form = useForm({
    defaultValues: {
      returnEmail: '',
      body: '',
    },
    onSubmit: async ({ value }) => {
      if (!token) return;
      await sendEmailMutation({
        body: value.body,
        returnEmail: value.returnEmail,
        turnstileToken: token,
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size="md">
        <Dialog.Header>Contact Me</Dialog.Header>
        <form
          id="send-email-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <div className="flex flex-col items-center gap-4 p-4">
            <Turnstile
              ref={turnstileRef}
              siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY!}
              onSuccess={setToken}
              onExpire={() => setToken(null)}
              onError={() => setToken(null)}
            />
            <form.Field
              name="returnEmail"
              validators={{
                onChange: z.email('Enter a valid email'),
              }}
            >
              {(field) => (
                <div className="w-full">
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="Email"
                    className="w-full"
                    aria-invalid={!field.state.meta.isValid}
                  />
                  {!field.state.meta.isValid && (
                    <p className="mt-1 text-sm text-destructive">
                      {field.state.meta.errors
                        .map((err) => err?.message)
                        .join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
            <form.Field
              name="body"
              validators={{
                onChange: z.string().min(1, 'Enter a message'),
              }}
            >
              {(field) => (
                <div className="w-full">
                  <Textarea
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="Enter your message here"
                    className="w-full"
                    rows={5}
                    aria-invalid={!field.state.meta.isValid}
                  />
                  {!field.state.meta.isValid && (
                    <p className="mt-1 text-sm text-destructive">
                      {field.state.meta.errors
                        .map((err) => err?.message)
                        .join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          </div>
        </form>
        <Dialog.Footer>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <form.Subscribe
            selector={(state) => ({
              canSubmit: state.canSubmit,
              isSubmitting: state.isSubmitting,
            })}
          >
            {({ canSubmit, isSubmitting }) => (
              <Button
                type="submit"
                form="send-email-form"
                disabled={!token || !canSubmit || isSubmitting || isPending}
              >
                {isSubmitting || isPending ? 'Sending...' : 'Send'}
              </Button>
            )}
          </form.Subscribe>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
