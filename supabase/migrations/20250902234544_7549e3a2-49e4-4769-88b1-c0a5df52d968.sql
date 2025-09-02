-- Phase 2: Fix Security Definer View Issue
-- Check if there are any problematic views and recreate them without SECURITY DEFINER

-- First, let's check for any views that might be causing the security definer issue
-- The issue is likely with the employee_documents view

-- If the employee_documents view exists and has SECURITY DEFINER, we need to fix it
DROP VIEW IF EXISTS employee_documents CASCADE;

-- Recreate the view without SECURITY DEFINER (uses SECURITY INVOKER by default)
CREATE OR REPLACE VIEW employee_documents AS
SELECT 
  d.id,
  d.title,
  d.file_path,
  d.file_type,
  d.file_size,
  d.description,
  d.tags,
  d.category,
  d.document_type,
  d.is_training_material,
  d.training_record_id,
  d.uploaded_by,
  d.created_at,
  d.updated_at,
  d.employee_id,
  ep.full_name as employee_name,
  ep.email as employee_email,
  tm.title as training_module_title,
  CASE 
    WHEN tr.id IS NOT NULL THEN tr.status
    ELSE NULL
  END as training_status
FROM documents d
LEFT JOIN employee_profiles ep ON d.employee_id = ep.id
LEFT JOIN training_records tr ON d.training_record_id = tr.id
LEFT JOIN training_modules tm ON tr.module_id = tm.id
WHERE d.document_type IS NOT NULL;