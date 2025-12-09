# Impression Tracking Implementation

**Date**: 2025-12-08
**Location**: `/Users/seulchankim/projects/seeso/careerly-perflexity/careerly-v2`

## Overview

Implemented impression batching system for efficient tracking of post views in the Next.js frontend.

## Files Created/Modified

### 1. API Service Function
**File**: `/lib/api/services/posts.service.ts`

Added `recordImpressionsBatch()` function:
- Sends batched impression data to `/api/v1/posts/impressions/batch/`
- Uses `authClient` for authenticated requests
- Payload: `{ post_ids: number[] }`

### 2. Impression Tracker Hook
**File**: `/lib/hooks/useImpressionTracker.ts`

Main batching logic:
- **Batching**: Flushes every 3 seconds OR when 10 impressions queued
- **Deduplication**: Tracks each post ID only once per session
- **Auth-aware**: Uses `checkAuth()` from token.client.ts
- **Reliability**: `sendBeacon` on page unload to prevent data loss
- **Memory**: Refs for performance (no re-renders)

### 3. Post Impression Hook
**File**: `/lib/hooks/usePostImpression.ts`

IntersectionObserver wrapper:
- Returns ref for attaching to post elements
- Triggers callback when 50% visible (configurable)
- Tracks once per post per session

### 4. Documentation
**File**: `/lib/hooks/README.md`

Usage examples and configuration guide.

## Usage Example

```tsx
'use client';

import { useImpressionTracker } from '@/lib/hooks/useImpressionTracker';
import { usePostImpression } from '@/lib/hooks/usePostImpression';

function PostsPage() {
  const { trackImpression } = useImpressionTracker();

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} trackImpression={trackImpression} />
      ))}
    </div>
  );
}

function PostCard({ post, trackImpression }) {
  const ref = usePostImpression(post.id, trackImpression, 0.5);

  return <article ref={ref}>{/* post content */}</article>;
}
```

## Configuration

Edit `/lib/hooks/useImpressionTracker.ts`:

```typescript
const FLUSH_INTERVAL = 3000;  // Batch flush interval (ms)
const MAX_QUEUE_SIZE = 10;    // Max impressions before flush
```

## Technical Details

- **No external state management**: Pure React hooks
- **TypeScript**: Full type safety
- **Build verified**: No errors
- **Auth pattern**: Uses existing `checkAuth()` from `token.client.ts`
- **API pattern**: Follows existing `authClient` pattern in services

## Backend Endpoint

Expected backend endpoint:

```
POST /api/v1/posts/impressions/batch/
Body: { post_ids: [1, 2, 3] }
Auth: Required (uses authClient)
```

## Next Steps

1. Integrate into post list pages (community, profile, etc.)
2. Add to post detail pages if needed
3. Monitor backend for performance
4. Adjust `FLUSH_INTERVAL` and `MAX_QUEUE_SIZE` based on metrics
