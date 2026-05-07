
-- Revoke anon SELECT on all sensitive tables (still accessible to authenticated via RLS)
REVOKE ALL ON public.profiles FROM anon;
REVOKE ALL ON public.jobs FROM anon;
REVOKE ALL ON public.subscriptions FROM anon;
REVOKE ALL ON public.user_roles FROM anon;

-- Subscriptions: only service-role (edge functions) should write; authenticated can SELECT via RLS
REVOKE INSERT, UPDATE, DELETE ON public.subscriptions FROM authenticated;

-- Revoke direct EXECUTE on SECURITY DEFINER functions from anon/authenticated.
-- These functions are still usable by RLS policies (run as definer) and by triggers.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, public;
