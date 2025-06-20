'use client'

import { useRef } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Categories() {
	const router = useRouter()
	const featuresRef = useRef([])
	return (
		<div className='my-5 max-w-[1440px] mx-auto'>
			<div className='flex items-center mb-6'>
				<button
					onClick={() => {
						window.location.href = '/'
					}}
					className='text-gray-600 pl-6 hover:text-gray-800 transition flex items-center space-x-2'>
					<ArrowLeft />
					<span>Powrót do strony głównej</span>
				</button>
			</div>
			<section
				className='py-10 px-6 rounded-t-3xl'
				style={{
					backgroundColor: 'white',
					color: '#4169E1',
				}}>
				<h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>Jak się z nami skontaktować?</h2>
				<div className='grid gap-6 md:grid-cols-3 max-w-6xl mx-auto'>
					{['Telefon', 'Adres', 'E-mail'].map((feature, idx) => (
						<div
							key={feature}
							ref={el => {
								if (el) featuresRef.current[idx] = el
							}}
							className='bg-white  rounded-2xl p-6 shadow-lg text-center hover:scale-105 transition-transform border'
							style={{ borderColor: '#4169E1', color: '#4169E1' }}>
							<h3 className='text-xl font-bold mb-2'>{feature}</h3>
							<p className='text-sm'>
								{feature === 'Telefon'
									? '+48 22 123 45 67\n wt.–czw. 9:00–17:00'
									: feature === 'Adres'
									? 'ul. Nowoczesna 12, 00-123 Warszawa\n pon.–pt. 9:00–17:00'
									: 'support@shelfdetect.com'}
							</p>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}
