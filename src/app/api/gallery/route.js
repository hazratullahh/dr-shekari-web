import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Gallery from '@/lib/models/Gallery';

export const runtime = 'nodejs';
// Revalidate every 5 minutes - gallery rarely changes, but stays warm.
export const revalidate = 300;

/**
 * GET /api/gallery
 *
 * Returns published gallery images ordered by:
 *   featured DESC, order ASC, createdAt DESC
 *
 * Optional query params:
 *   ?limit=24   (default 60, max 200)
 *   ?featured=1 (only featured)
 */
export async function GET(req) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const limitRaw = parseInt(url.searchParams.get('limit') || '60', 10);
    const limit = Math.min(Math.max(Number.isFinite(limitRaw) ? limitRaw : 60, 1), 200);
    const featuredOnly = url.searchParams.get('featured') === '1';

    const query = { published: true };
    if (featuredOnly) query.featured = true;

    const docs = await Gallery.find(query)
      .sort({ featured: - 1, order: 1, createdAt: - 1 })
      .limit(limit)
      .select('title description publicId url format width height order featured createdAt')
      .lean();

    const items = docs.map((d) => ({
      id: String(d._id),
      title: d.title || '',
      description: d.description || '',
      publicId: d.publicId,
      url: d.url,
      format: d.format,
      width: d.width || 0,
      height: d.height || 0,
      order: d.order ?? 0,
      featured: !!d.featured,
      createdAt: d.createdAt,
    }));

    return NextResponse.json(
      { ok: true, count: items.length, items },
      {
        status: 200,
        headers: {
          // CDN- friendly: stale- while- revalidate keeps it instant for users
          'Cache- Control': 'public, s- maxage=300, stale- while- revalidate=86400',
        },
      }
    );
  } catch (err) {
    console.error('[gallery] GET error:', err);
    return NextResponse.json(
      { ok: false, error: 'Failed to load gallery' },
      { status: 500 }
    );
  }
}
