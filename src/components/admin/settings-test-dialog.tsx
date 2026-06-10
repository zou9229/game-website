"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TestField, TestSpec, TestResult } from "@/modules/config/settings-test-specs";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: string;
  spec: TestSpec;
  groupTitle: string;
  /** Current (possibly unsaved) form values for this group, merged over saved config server-side. */
  configOverrides?: Record<string, string>;
}

export function SettingsTestDialog({ open, onOpenChange, group, spec, groupTitle, configOverrides }: Props) {
  const t = useTranslations("admin");
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  // Reset form + result each time the dialog opens for a new group
  useEffect(() => {
    if (!open) return;
    const initial: Record<string, string> = {};
    for (const f of spec.fields) {
      if (f.defaultValue) initial[f.name] = f.defaultValue;
    }
    setInputs(initial);
    setResult(null);
    setRunning(false);
  }, [open, group, spec]);

  const canRun = useMemo(
    () => spec.fields.every((f) => !f.required || !!inputs[f.name]?.trim()),
    [spec.fields, inputs],
  );

  async function handleRun() {
    setRunning(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/settings/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group, inputs, configs: configOverrides ?? {} }),
      });
      const data = await res.json();
      if (data.code !== 0) {
        setResult({ success: false, message: data.message || t("settings.test.error") });
      } else {
        setResult(data.data as TestResult);
      }
    } catch (err: any) {
      setResult({ success: false, message: err?.message || t("settings.test.error") });
    } finally {
      setRunning(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("settings.test.title", { group: groupTitle })}</DialogTitle>
          <DialogDescription>{t("settings.test.description")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {spec.fields.map((field) => (
            <TestInput
              key={field.name}
              field={field}
              value={inputs[field.name] ?? ""}
              onChange={(v) => setInputs((prev) => ({ ...prev, [field.name]: v }))}
            />
          ))}
        </div>

        {result && <TestResultView result={result} />}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={running}>
            {t("settings.test.close")}
          </Button>
          <Button onClick={handleRun} disabled={running || !canRun}>
            {running && <Loader2 className="size-4 animate-spin" />}
            {running ? t("settings.test.running") : t("settings.test.run")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function TestInput({
  field,
  value,
  onChange,
}: {
  field: TestField;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={field.name}>
        {field.label}
        {field.required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      {field.type === "textarea" ? (
        <textarea
          id={field.name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      ) : (
        <Input
          id={field.name}
          type={field.type === "number" ? "number" : field.type === "email" ? "email" : "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
        />
      )}
    </div>
  );
}

function TestResultView({ result }: { result: TestResult }) {
  return (
    <div
      className={`rounded-lg border p-3 text-sm ${
        result.success
          ? "border-emerald-500/30 bg-emerald-500/5"
          : "border-destructive/30 bg-destructive/5"
      }`}
    >
      <div className="flex items-start gap-2 font-medium">
        {result.success ? (
          <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
        ) : (
          <XCircle className="size-4 shrink-0 text-destructive mt-0.5" />
        )}
        <span className={result.success ? "" : "text-destructive"}>{result.message}</span>
      </div>

      {result.details && Object.keys(result.details).length > 0 && (
        <dl className="mt-3 space-y-1.5 text-xs">
          {Object.entries(result.details).map(([k, v]) => (
            <div key={k} className="grid grid-cols-[auto_1fr] gap-2">
              <dt className="text-muted-foreground whitespace-nowrap">{k}:</dt>
              <dd className="break-all">
                {v?.startsWith("http") ? (
                  <a
                    href={v}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline underline-offset-2"
                  >
                    {v}
                  </a>
                ) : (
                  <span className="font-mono">{v}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
