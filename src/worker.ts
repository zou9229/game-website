import handler from 'vinext/server/app-router-entry';

import { getAllConfigs } from '@/modules/config/service';
import {
  runGameDataSourceCheck,
  runScheduledGameDataAiReview,
} from '@/modules/game-data-sync/service';

type WorkerEnv = {
  ASSETS?: {
    fetch(request: Request): Promise<Response> | Response;
  };
};

type ScheduledEvent = {
  cron: string;
  scheduledTime: number;
};

type ExecutionContext = {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
};

async function runScheduledGameDataSourceCheck(event: ScheduledEvent) {
  const snapshot = await runGameDataSourceCheck('cloudflare-cron', {
    notifyOperator: true,
  });
  const configs = await getAllConfigs();
  const aiAutomation = await runScheduledGameDataAiReview(snapshot, configs);

  console.log(
    [
      '[questcodes] scheduled game-data source check completed',
      `cron=${event.cron}`,
      `healthy=${snapshot.healthySources}/${snapshot.sourceCount}`,
      `attention=${snapshot.attentionCount}`,
      `ai-review=${aiAutomation.status}${aiAutomation.error ? `:${aiAutomation.error}` : ''}`,
      snapshot.notification
        ? `notification=${snapshot.notification.sent ? 'sent' : snapshot.notification.skippedReason || snapshot.notification.error || 'not-sent'}`
        : 'notification=not-configured',
    ].join(' ')
  );
}

export default {
  fetch(request: Request, env: WorkerEnv, ctx: ExecutionContext) {
    return handler.fetch(request, env, ctx);
  },

  scheduled(event: ScheduledEvent, _env: WorkerEnv, ctx: ExecutionContext) {
    ctx.waitUntil(runScheduledGameDataSourceCheck(event));
  },
};
