import { NextResponse } from 'next/server'

export function middleware(req) {
  const res = NextResponse.next()
  return res
} 