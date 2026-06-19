export default function JobOfferSkeleton() {
  return (
    <div className="rounded-2xl border border-base-200 bg-base-100 p-5 shadow-xs">
      <div className="flex flex-col h-full">
        {/* Avatar + title + match badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="skeleton h-11 w-11 rounded-xl flex-shrink-0" />
            <div className="flex flex-col gap-1.5">
              <div className="skeleton h-4 w-36" />
              <div className="skeleton h-3 w-24" />
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="skeleton h-5 w-20 rounded-full" />
            <div className="skeleton h-7 w-7 rounded-full" />
          </div>
        </div>

        {/* Recomendado + Dificultad badges */}
        <div className="flex gap-2 mb-4">
          <div className="skeleton h-5 w-24 rounded-full" />
          <div className="skeleton h-5 w-28 rounded-full" />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5 mb-3">
          <div className="skeleton h-3 w-full" />
          <div className="skeleton h-3 w-3/4" />
        </div>

        {/* Location / mode / contract tags */}
        <div className="flex gap-1.5 mb-3.5">
          <div className="skeleton h-5 w-28 rounded-lg" />
          <div className="skeleton h-5 w-20 rounded-lg" />
          <div className="skeleton h-5 w-24 rounded-lg" />
        </div>

        {/* Skill tags */}
        <div className="flex gap-1.5 mb-4">
          <div className="skeleton h-6 w-16 rounded-xl" />
          <div className="skeleton h-6 w-20 rounded-xl" />
          <div className="skeleton h-6 w-14 rounded-xl" />
        </div>

        {/* Salary + buttons */}
        <div className="mt-auto pt-3 border-t border-base-200 flex items-center justify-between gap-2">
          <div className="flex flex-col gap-1.5">
            <div className="skeleton h-2 w-20" />
            <div className="skeleton h-5 w-32" />
          </div>
          <div className="flex gap-2">
            <div className="skeleton h-8 w-20 rounded-lg" />
            <div className="skeleton h-8 w-16 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
