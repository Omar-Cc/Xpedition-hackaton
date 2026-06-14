import { cn } from '@/src/lib/utils'

interface UtpEmpleaLogoProps {
  className?: string
}

export default function UtpEmpleaLogo({ className }: Readonly<UtpEmpleaLogoProps>) {
  return (
    <div className={cn("flex items-center shrink-0 select-none", className)}>
      <div className="flex items-center font-sans font-black">
        <div className="flex gap-px">
          <span className="bg-black text-white w-7 h-7 flex items-center justify-center text-[16px] font-black rounded-none">
            U
          </span>
          <span className="bg-black text-white w-7 h-7 flex items-center justify-center text-[16px] font-black rounded-none">
            T
          </span>
          <span className="bg-black text-white w-7 h-7 flex items-center justify-center text-[16px] font-black rounded-none">
            P
          </span>
        </div>
        <span className="text-[#e30613] text-[22px] font-black ml-2 mr-1.5 leading-none">
          +
        </span>
        <span className="text-base-content text-[18px] font-black tracking-tight leading-none">
          emplea
        </span>
      </div>
    </div>
  )
}
