"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Subscription = {
  id: string;
  status: string;
  planName?: string | null;
  productName?: string | null;
  interval?: string | null;
  amount?: number | null;
  currency?: string | null;
  currentPeriodEnd?: string | null;
  canceledEndAt?: string | null;
};

type Order = {
  id: string;
  orderNo: string;
  status: string;
  amount: number;
  currency: string;
  paymentProvider: string;
  productName?: string | null;
  planName?: string | null;
  paidAt?: string | null;
  createdAt: string;
};

function formatAmount(amount: number, currency: string) {
  const normalized = (currency || "usd").toUpperCase();
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: normalized,
  }).format(amount / 100);
}

function statusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  const s = status.toLowerCase();
  if (s === "active" || s === "paid" || s === "succeeded") return "default";
  if (s === "canceled" || s === "failed") return "destructive";
  return "secondary";
}

export default function BillingPage() {
  const t = useTranslations("dashboard.billing");
  const [credits, setCredits] = useState<number | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/credits").then((r) => r.json()).catch(() => null),
      fetch("/api/user/subscriptions").then((r) => r.json()).catch(() => null),
      fetch("/api/user/orders").then((r) => r.json()).catch(() => null),
    ]).then(([creditsRes, subsRes, ordersRes]) => {
      if (creditsRes?.code === 0) setCredits(creditsRes.data.balance);
      if (subsRes?.code === 0 && Array.isArray(subsRes.data)) {
        const active = subsRes.data.find((s: Subscription) => s.status === "active") || subsRes.data[0];
        setSubscription(active || null);
      }
      if (ordersRes?.code === 0 && Array.isArray(ordersRes.data)) {
        setOrders(ordersRes.data);
      }
      setLoaded(true);
    });
  }, []);

  const planLabel =
    subscription?.planName ||
    subscription?.productName ||
    (subscription ? subscription.status : null);

  const periodEnd = subscription?.currentPeriodEnd
    ? new Date(subscription.currentPeriodEnd)
    : null;
  const canceledEnd = subscription?.canceledEndAt
    ? new Date(subscription.canceledEndAt)
    : null;
  const isCanceled = subscription?.status === "canceled" || !!canceledEnd;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("subscription")}</CardTitle>
          </CardHeader>
          <CardContent>
            {!loaded ? (
              <p className="text-muted-foreground text-sm">…</p>
            ) : subscription ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">{planLabel}</span>
                  <Badge variant={statusVariant(subscription.status)}>
                    {subscription.status}
                  </Badge>
                </div>
                {subscription.amount && subscription.currency && (
                  <p className="text-sm text-muted-foreground">
                    {formatAmount(subscription.amount, subscription.currency)}
                    {subscription.interval ? ` / ${subscription.interval}` : ""}
                  </p>
                )}
                {isCanceled && canceledEnd ? (
                  <p className="text-sm text-muted-foreground">
                    {t("ends_on", { date: canceledEnd.toLocaleDateString() })}
                  </p>
                ) : periodEnd ? (
                  <p className="text-sm text-muted-foreground">
                    {t("renews_on", { date: periodEnd.toLocaleDateString() })}
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">{t("no_subscription")}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("credits")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {loaded ? credits ?? 0 : "…"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("credits_description")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("payments")}</CardTitle>
        </CardHeader>
        <CardContent>
          {!loaded ? (
            <p className="text-muted-foreground text-sm">…</p>
          ) : orders.length === 0 ? (
            <p className="text-muted-foreground text-sm">{t("no_payments")}</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("order_no")}</TableHead>
                    <TableHead>{t("plan")}</TableHead>
                    <TableHead>{t("amount")}</TableHead>
                    <TableHead>{t("status")}</TableHead>
                    <TableHead>{t("provider")}</TableHead>
                    <TableHead>{t("date")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell className="font-mono text-xs">{o.orderNo}</TableCell>
                      <TableCell>{o.planName || o.productName || "—"}</TableCell>
                      <TableCell className="font-medium">
                        {formatAmount(o.amount, o.currency)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(o.status)}>{o.status}</Badge>
                      </TableCell>
                      <TableCell className="capitalize">{o.paymentProvider}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(o.paidAt || o.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
