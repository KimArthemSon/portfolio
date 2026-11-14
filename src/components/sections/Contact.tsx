import { useId, useRef, useState, type FormEvent } from 'react';
import { FiArrowUpRight, FiSend } from 'react-icons/fi';
import { SiGmail } from 'react-icons/si';
import type { Profile } from '../../types';
import { Section } from '../layout/Section';

interface ContactProps {
  contact: Profile['contact'];
}

export function Contact({ contact }: ContactProps) {
  const [user, domain] = contact.email.split('@');

  return (
    <Section id="contact" label="Contact" number="05">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div>
          <h2 className="heading-display">{contact.heading}</h2>
          <p className="body-copy mt-6">{contact.intro}</p>

          <p className="mt-10">
          <a
            href={`mailto:${contact.email}`}
            className="link-draw mt-10 inline text-[clamp(1.375rem,1rem+1.2vw,1.875rem)] font-normal leading-[1.5] tracking-[-0.02em] text-ink"
          >
            {user}
            <wbr />@{domain}
          </a>
          </p>

          <ul className="mt-10 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-x-8">
            {contact.links.map(({ label, value, href }) => (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="link-draw text-muted transition-colors hover:text-ink"
                  >
                    {label === value ? (
                      value
                    ) : (
                      <>
                        <span className="sr-only">{label}: </span>
                        {value}
                      </>
                    )}
                  </a>
                ) : (
                  <span className="text-muted">{value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <MessageForm email={contact.email} copy={contact.form} />
      </div>
    </Section>
  );
}

interface MessageFormProps {
  email: string;
  copy: Profile['contact']['form'];
}

/**
 * No backend: the form composes an email and hands it to the visitor's mail app
 * (mailto:) or to Gmail's compose window, pre-filled and ready to send.
 */
function MessageForm({ email, copy }: MessageFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const ids = { name: useId(), subject: useId(), message: useId(), hint: useId() };

  const compose = () => {
    const finalSubject = subject.trim() || copy.defaultSubject;
    const signature = name.trim() ? `\n\n— ${name.trim()}` : '';
    return { subject: finalSubject, body: `${message.trim()}${signature}` };
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { subject: s, body } = compose();
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(body)}`;
  };

  const openGmail = () => {
    if (!formRef.current?.reportValidity()) return;
    const { subject: s, body } = compose();
    const params = new URLSearchParams({ view: 'cm', fs: '1', to: email, su: s, body });
    window.open(`https://mail.google.com/mail/?${params.toString()}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      aria-describedby={ids.hint}
      className="flex flex-col gap-5 lg:pt-2"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={ids.name} className="eyebrow mb-2 block">
            {copy.nameLabel}
          </label>
          <input
            id={ids.name}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={copy.namePlaceholder}
            className="field"
          />
        </div>
        <div>
          <label htmlFor={ids.subject} className="eyebrow mb-2 block">
            {copy.subjectLabel}
          </label>
          <input
            id={ids.subject}
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={copy.subjectPlaceholder}
            className="field"
          />
        </div>
      </div>

      <div>
        <label htmlFor={ids.message} className="eyebrow mb-2 block">
          {copy.messageLabel}
        </label>
        <textarea
          id={ids.message}
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={copy.messagePlaceholder}
          className="field resize-y leading-relaxed"
        />
      </div>

      <div className="flex flex-wrap gap-3 pt-1">
        <button
          type="submit"
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-surface transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-ink/85 active:scale-[0.97] focus-visible:rounded-full motion-reduce:transform-none"
        >
          {copy.submitLabel}
          <FiSend
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:-rotate-12"
            strokeWidth={1.75}
          />
        </button>
        <button
          type="button"
          onClick={openGmail}
          className="group inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium text-ink ring-1 ring-inset ring-ink/25 transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:ring-ink/60 active:scale-[0.97] focus-visible:rounded-full motion-reduce:transform-none"
        >
          <SiGmail aria-hidden="true" className="h-4 w-4 text-[#EA4335] transition-transform duration-300 group-hover:scale-110" />
          {copy.gmailLabel}
          <FiArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.75}
          />
        </button>
      </div>

      <p id={ids.hint} className="text-xs leading-relaxed text-muted">
        {copy.hint}
      </p>
    </form>
  );
}
