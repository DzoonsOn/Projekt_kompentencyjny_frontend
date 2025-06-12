'use client'
import ArrowRightSVG from '@/public/ArrowRight'
import BellSVG from '@/public/Bell'
import MenuHamburgerSVG from '@/public/menu'
import { useState } from 'react'

const Header = () => {
	const [ringBell, setRingBell] = useState(1)
	const handleClick = () => {
		setRingBell(year => year + 1)
	}
	return (
		<div className='w-full'>
			<div className='bg-red-600 text-white flex items-center justify-between px-4 py-2'>
				<div className='flex items-center space-x-4'>
					<span className='text-sm'>{ringBell}</span>
					<button onClick={handleClick}>
						<BellSVG />
					</button>
				</div>

				<div className='flex items-center space-x-2'>
					<button className='bg-red-400 p-2 rounded'>
						<ArrowRightSVG />
					</button>
					<button className='border border-white p-1 rounded'>
						<MenuHamburgerSVG />
					</button>
				</div>
			</div>

			<div className='bg-orange-400 text-white px-4 py-2 rounded-l-lg rounded-t-lg shadow-md mt-2 mx-4'>
				ogłoszenie testowe
			</div>

			<div className='p-4'>
				<h2 className='text-lg font-semibold text-black'>Menu główne</h2>
			</div>
		</div>
	)
}

export default Header
