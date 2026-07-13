import { headers } from 'next/headers';

import { getAuth } from '@/core/auth';
import { envConfigs } from '@/config';
import { getStorage, isStorageConfigured } from '@/modules/storage/service';
import { md5 } from '@/lib/hash';
import { enforceMinIntervalRateLimit } from '@/lib/rate-limit';
import { respData, respErr } from '@/lib/resp';

const extFromMime = (mimeType: string) => {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/avif': 'avif',
  };
  return map[mimeType] || '';
};

const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
]);
const MAX_FILES_PER_REQUEST = 5;
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

// Hard cap for inline base64 (no storage configured). Keep small — fits comfortably
// in a TEXT column and a JSON response. Configurable via INLINE_IMAGE_MAX_KB.
const INLINE_MAX_BYTES =
  (Number(envConfigs.inline_image_max_kb) || 2048) * 1024;

export async function POST(req: Request) {
  const limited = enforceMinIntervalRateLimit(req, {
    intervalMs: 1000,
    keyPrefix: 'upload-image',
  });
  if (limited) return limited;

  try {
    const auth = getAuth();
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return respErr('Unauthorized');

    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    if (!files.length) return respErr('No files provided');
    if (files.length > MAX_FILES_PER_REQUEST) {
      return respErr(`Upload at most ${MAX_FILES_PER_REQUEST} images at once`);
    }

    const useStorage = isStorageConfigured();
    const storage = useStorage ? getStorage() : null;
    const uploadResults: Array<{
      url: string;
      key: string;
      filename: string;
      deduped: boolean;
    }> = [];

    for (const file of files) {
      if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
        return respErr(`Unsupported image type for ${file.name}`);
      }

      const arrayBuffer = await file.arrayBuffer();
      const body = new Uint8Array(arrayBuffer);
      if (body.length > MAX_UPLOAD_BYTES) {
        return respErr(`Image ${file.name} exceeds the 10MB upload limit`);
      }

      // No storage configured → return data URL (caller persists it).
      if (!storage) {
        if (body.length > INLINE_MAX_BYTES) {
          const limitKb = Math.round(INLINE_MAX_BYTES / 1024);
          return respErr(
            `Image too large for inline storage (${(body.length / 1024).toFixed(0)}KB > ${limitKb}KB). Configure STORAGE_* env vars or use a smaller image.`
          );
        }
        const base64 = Buffer.from(body).toString('base64');
        const dataUrl = `data:${file.type};base64,${base64}`;
        uploadResults.push({
          url: dataUrl,
          key: '',
          filename: file.name,
          deduped: false,
        });
        continue;
      }

      const digest = md5(body);
      const ext = extFromMime(file.type) || file.name.split('.').pop() || 'bin';
      const key = `uploads/${digest}.${ext}`;

      const exists = await storage.exists({ key });
      if (exists) {
        const publicUrl = storage.getPublicUrl({ key });
        if (publicUrl) {
          uploadResults.push({
            url: publicUrl,
            key,
            filename: file.name,
            deduped: true,
          });
          continue;
        }
      }

      const result = await storage.uploadFile({
        body,
        key,
        contentType: file.type,
        disposition: 'inline',
      });

      if (!result.success || !result.url) {
        return respErr(result.error || 'Upload failed');
      }

      uploadResults.push({
        url: result.url,
        key: result.key || key,
        filename: file.name,
        deduped: false,
      });
    }

    return respData({
      urls: uploadResults.map((r) => r.url),
      results: uploadResults,
    });
  } catch (e: any) {
    console.error('upload image failed:', e);
    return respErr(e?.message || 'upload image failed');
  }
}
