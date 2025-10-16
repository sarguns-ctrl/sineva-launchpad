-- Enable pg_cron extension for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule daily newsletter to run every day at 9 AM UTC
SELECT cron.schedule(
  'send-daily-newsletter',
  '0 9 * * *', -- Every day at 9 AM UTC
  $$
  SELECT
    net.http_post(
        url:='https://cbvvydecbbnuprmhpfvm.supabase.co/functions/v1/send-daily-newsletter',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNidnZ5ZGVjYmJudXBybWhwZnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0NTUzMDQsImV4cCI6MjA3MTAzMTMwNH0.IhEcUgjeNsZn-mmaFRoAtERC_jtxmG85HU8erDt79ng"}'::jsonb,
        body:='{}'::jsonb
    ) as request_id;
  $$
);