 "use client";

import { useMemo, useState } from "react";

import { analyzeEmail, type EmailInput } from "@/lib/analyzer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SAMPLE_EMAILS: Array<{ label: string; data: EmailInput }> = [
  {
    label: "Client billing issue",
    data: {
      senderName: "Danielle Rivers",
      senderEmail: "danielle@bluewavepartners.com",
      subject: "Invoice 3487 discrepancy",
      body: `Hi team,

We just received invoice 3487 for the April retainer, but it still reflects the higher rate we had before the March contract revision. Could you confirm the updated amount and send a corrected invoice today? This is holding up our payment run.

Thanks,
Danielle`
    }
  },
  {
    label: "New lead",
    data: {
      senderName: "Chris Mendez",
      senderEmail: "chris.mendez@gmail.com",
      subject: "Exploring a website redesign",
      body: `Hello,

I saw your recent work with Northwind Labs and I'm impressed. I'm exploring options for a redesign of our ecommerce storefront and would love to get your pricing and availability for a project starting next month. Could we book a discovery call?

Best,
Chris`
    }
  },
  {
    label: "Vendor shipment",
    data: {
      senderName: "Elaine Puckett",
      senderEmail: "orders@pixelprint.io",
      subject: "PO-5521 shipment confirmation",
      body: `Good afternoon,

We're ready to dispatch the branded notebooks for PO-5521. Please confirm the loading dock availability for Thursday by 3 p.m. so we can notify the carrier.

Regards,
Elaine`
    }
  }
];

const urgencyVariant: Record<string, React.ComponentProps<typeof Badge>["variant"]> =
  {
    High: "danger",
    Medium: "warning",
    Low: "neutral"
  };

const senderVariant: Record<string, React.ComponentProps<typeof Badge>["variant"]> =
  {
    Client: "default",
    Lead: "success",
    Vendor: "neutral",
    Internal: "secondary",
    Spam: "danger"
  };

const intentVariant: Record<string, React.ComponentProps<typeof Badge>["variant"]> =
  {
    Inquiry: "success",
    Complaint: "danger",
    Proposal: "neutral",
    Payment: "warning",
    "Follow-up": "neutral",
    General: "default"
  };

export default function Page() {
  const [form, setForm] = useState<EmailInput>({
    senderName: "",
    senderEmail: "",
    subject: "",
    body: ""
  });

  const result = useMemo(() => analyzeEmail(form), [form]);

  const handleChange = (
    field: keyof EmailInput,
    value: EmailInput[typeof field]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const applySample = (sample: EmailInput) => {
    setForm(sample);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-200">
          <span>AI Assistant</span>
          <span>Business Email Triage</span>
        </div>
        <h1 className="text-4xl font-semibold text-slate-50">
          Review and triage incoming emails instantly
        </h1>
        <p className="max-w-2xl text-base text-slate-400">
          Paste an email to classify the sender, understand intent, gauge urgency,
          and get an actionable next step in clear business language.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="shadow-brand-950/20">
          <CardHeader>
            <CardTitle>Incoming email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {SAMPLE_EMAILS.map((sample) => (
                <button
                  key={sample.label}
                  type="button"
                  onClick={() => applySample(sample.data)}
                  className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-300 transition hover:border-brand-400 hover:text-slate-100"
                >
                  {sample.label}
                </button>
              ))}
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-200">Sender name</label>
                <Input
                  placeholder="Jane Smith"
                  value={form.senderName}
                  onChange={(event) => handleChange("senderName", event.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-200">
                  Sender email
                </label>
                <Input
                  placeholder="jane@company.com"
                  value={form.senderEmail}
                  onChange={(event) => handleChange("senderEmail", event.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-200">Subject</label>
                <Input
                  placeholder="Short subject line"
                  value={form.subject}
                  onChange={(event) => handleChange("subject", event.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-200">Message</label>
                <Textarea
                  rows={10}
                  placeholder="Paste the email content here."
                  value={form.body}
                  onChange={(event) => handleChange("body", event.target.value)}
                />
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                setForm({
                  senderName: "",
                  senderEmail: "",
                  subject: "",
                  body: ""
                })
              }
            >
              Clear email
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-brand-950/20">
          <CardHeader>
            <CardTitle>Classification summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <AnalysisRow
                label="Sender type"
                value={result.senderType}
                badgeVariant={senderVariant[result.senderType]}
              />
              <AnalysisRow
                label="Intent"
                value={result.intent}
                badgeVariant={intentVariant[result.intent]}
              />
              <AnalysisRow
                label="Urgency"
                value={result.urgency}
                badgeVariant={urgencyVariant[result.urgency]}
              />
              <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Recommended action
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-50">
                  {result.nextAction}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-200">Confidence</p>
                <Badge variant="neutral">{(result.confidence * 100).toFixed(0)}%</Badge>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                Confidence reflects how many strong signals were detected in the email.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-200">Reasoning</p>
              <ul className="space-y-2 text-sm text-slate-300">
                {result.notes.map((note, index) => (
                  <li
                    key={`${note}-${index}`}
                    className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-left"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

const AnalysisRow = ({
  label,
  value,
  badgeVariant
}: {
  label: string;
  value: string;
  badgeVariant?: React.ComponentProps<typeof Badge>["variant"];
}) => (
  <div className="flex flex-col gap-1 rounded-lg border border-slate-800 bg-slate-900/60 p-4">
    <span className="text-xs uppercase tracking-wide text-slate-400">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-lg font-semibold text-slate-50">{value}</span>
      <Badge variant={badgeVariant}>{value}</Badge>
    </div>
  </div>
);
