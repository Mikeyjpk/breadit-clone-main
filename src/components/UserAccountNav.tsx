'use client'

import { User } from 'next-auth'
import { FC } from 'react'
import { DropdownMenu } from './ui/DropdownMenu'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { UserAvatar } from './UserAvatar'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
  
interface UserAccountNavProps {
    user: Pick<User, 
        'name' | 'image' | 'email'
    >
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                user={{ name: user.name || null, image: user.image || null }}
                className='h-8 w-8'
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent className='bg-white p-3 mt-3 shadow-lg rounded-sm' align='end'>
                <div className='flex items-center justify-start gap-2 p-2'>
                    <div className='flex flex-col space-y-1 leading-none'>
                        {user.name && <p className='font-medium'>{user.name}</p>}
                        {user.email && (
                        <p className='w-[200px] truncate text-sm text-muted-foreground'>
                            {user.email}
                        </p>
                        )}
                    </div>
                </div>
                <hr />
                <div className='flex flex-col gap-4 py-2'>
                    <DropdownMenuItem asChild>
                        <Link href='/'>
                            Feed
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href='/r/create'>
                            Create Community
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href='/settings'>
                            Settings
                        </Link>
                    </DropdownMenuItem>
                </div>
                <hr />
                <DropdownMenuItem
                    className='cursor-pointer text-center p-3'
                    onSelect={(event) => {
                        event.preventDefault()
                        signOut({
                        callbackUrl: `${window.location.origin}/sign-in`,
                        })
                    }}>
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
  )
}

export default UserAccountNav