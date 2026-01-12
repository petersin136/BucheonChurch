import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: authData, error: authError } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1
    });

    if (authError) {
      console.error('Ping error:', authError);
      return res.status(500).json({
        ok: false,
        error: authError.message,
        timestamp: new Date().toISOString()
      });
    }

    console.log('✅ Ping successful - DB active');
    return res.status(200).json({
      ok: true,
      dbActive: true,
      timestamp: new Date().toISOString(),
      queryResult: 'success'
    });

  } catch (err) {
    console.error('Ping error:', err);
    return res.status(500).json({
      ok: false,
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }
}
