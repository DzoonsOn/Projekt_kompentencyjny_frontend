'use client'
const Footer = () => {
	return (
		<div className='flex flex-col md:flex-row items-center justify-between p-4 border rounded-md bg-white shadow-md'>
			<div className='flex items-center space-x-2'>
				<span className='text-gray-900 font-semibold'>System Transakcji Sklepowych</span>
				<span className='text-gray-800 font-bold'>1.8.25</span>
				<span className='bg-orange-300 text-orange-800 text-xs font-semibold px-2 py-1 rounded'>Wersja testowa</span>
			</div>
			<div className='flex items-center space-x-6 mt-2 md:mt-0'>
				<div className='flex items-center text-gray-600'>
					<i className='fas fa-file-alt mr-1'></i>
					<span className='text-sm'>1424</span>
				</div>
				<div className='flex items-center text-gray-600'>
					<i className='fas fa-calendar-alt mr-1'></i>
					<span className='text-sm'>22.11.2024 18:20</span>
				</div>
			</div>
		</div>
	)
}

export default Footer
