-- Auto-approve any new applications for demo purposes
-- This will make newly submitted applications immediately visible on the agents page
UPDATE agent_applications 
SET status = 'approved' 
WHERE status = 'pending';