'use client'

import { X, Star, Check } from 'lucide-react'

export default function SwipeActions() {
  return (
    <div className="flex items-center gap-4">
      <button className="btn btn-circle btn-outline border-error text-error hover:bg-error hover:text-white w-14 h-14">
        <X className="w-6 h-6" />
      </button>
      <button className="btn btn-circle btn-outline border-warning text-warning hover:bg-warning hover:text-white w-14 h-14">
        <Star className="w-6 h-6" />
      </button>
      <button className="btn btn-circle btn-outline border-success text-success hover:bg-success hover:text-white w-14 h-14">
        <Check className="w-6 h-6" />
      </button>
    </div>
  )
}
