import React from 'react'

interface StudentAvatarProps {
  fullName: string
  sizeClass?: string
  usePlaceholder?: boolean
  avatarInitial?: string
}

export default function StudentAvatar({
  fullName,
  sizeClass = 'w-9 h-9',
  usePlaceholder = false,
  avatarInitial,
}: Readonly<StudentAvatarProps>) {
  if (usePlaceholder && avatarInitial) {
    return (
      <div className="avatar avatar-placeholder">
        <div className={`bg-white/20 text-white ${sizeClass} rounded-full flex items-center justify-center`}>
          <span className="text-sm font-semibold">{avatarInitial}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="avatar">
      <div className={`${sizeClass} rounded-full bg-[#4fd1c5] text-white flex items-center justify-center overflow-hidden`}>
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName)}&backgroundColor=4fd1c5`}
          alt="Avatar"
          loading="lazy"
        />
      </div>
    </div>
  )
}
