"use client"

import DOMPurify from "isomorphic-dompurify"

export const parseIdeaText = (text: string): string => {
  if (!text) return ""

  const sanitized = DOMPurify.sanitize(text, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'u', 'ul', 'ol', 'li', 'br', 'p'],
    ALLOWED_ATTR: [],
  })

  return sanitized
    .trim()
    .replace(/\r\n|\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n\n")
}
