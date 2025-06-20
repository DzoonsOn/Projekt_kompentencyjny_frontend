'use client'

const Footer = () => {
	return (
		<footer
			className='flex flex-col md:flex-row items-center justify-between px-6 py-4 border rounded-md shadow-md mt-auto w-full'
			style={{ backgroundColor: '#99ccff' }}>
			<div className='flex items-center'>
				<span className='font-semibold' style={{ color: '#4169E1' }}>
					Aplikacja: ShelfDetect v1.0
				</span>
			</div>
			<div className='flex items-center mt-2 md:mt-0'>
				<span className='text-sm' style={{ color: '#4169E1' }}>
					Kontakt: support@shelfdetect.com
				</span>
			</div>
		</footer>
	)
}

export default Footer
