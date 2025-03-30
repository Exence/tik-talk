import { MaskitoOptions } from '@maskito/core'
import { maskitoWithPlaceholder } from '@maskito/kit'

export const phoneMaskOption = {
  ...maskitoWithPlaceholder('+7 (XXX) XXX-XX-XX'),
  mask: [
    '+',
    '7',
    ' ',
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/
  ]
} satisfies MaskitoOptions
