'use client'

import { useState, KeyboardEvent } from 'react'
import { X, Plus } from 'lucide-react'

export default function TagsForm() {
  const [tags, setTags] = useState<string[]>(['Python', 'SQL', 'Figma'])
  const [inputValue, setInputValue] = useState('')

  const addTag = () => {
    const trimmed = inputValue.trim()
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed])
      setInputValue('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 p-3 min-h-[50px] rounded-lg border border-slate-200 bg-slate-50/50">
        {tags.length === 0 && (
          <span className="text-sm text-slate-400 italic">Escribe etiquetas y presiona Enter o el botón "+"</span>
        )}
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-xs font-semibold"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="hover:bg-blue-100 p-0.5 rounded-full transition-colors text-blue-500"
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ej. Next.js, Power BI, Excel Avanzado, Derecho Penal..."
          className="flex-1 p-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTag}
          className="p-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  )
}