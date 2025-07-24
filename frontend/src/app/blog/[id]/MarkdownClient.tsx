"use client";

import MarkdownRenderer from '@/components/shared/MarkdownRenderer';

export default function MarkdownClient({ content }: { content: string }) {
  return <MarkdownRenderer content={content} />;
} 