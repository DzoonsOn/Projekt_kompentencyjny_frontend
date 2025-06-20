'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import '../../components/style/Categories.css'
import { ArrowLeft } from 'lucide-react'

type Department = {
	departmentId: number
	departmentName: string
}

type Category = {
	department: Department
	count: number
}

export default function Categories() {
	const [categories, setCategories] = useState<Category[]>([])
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await fetch('https://localhost:5001/productShortage/Categories', {
					headers: {
						Accept: 'text/plain',
					},
				})
				if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
				const data: Category[] = await res.json()
				setCategories(data)
			} catch (error) {
				console.error('Błąd pobierania kategorii:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchCategories()
	}, [])

	const handleRedirect = (departmentId: number) => {
		router.push(`/products?departmentId=${departmentId}`)
	}

	return (
		<div className='p-6 max-w-[1440px] mx-auto' style={{ textAlign: 'center', padding: '20px' }}>
			<div className='flex items-center mb-6'>
				<button
					onClick={() => router.push(`/`)}
					className='text-gray-600 hover:text-gray-800 transition flex items-center space-x-2'>
					<ArrowLeft />
					<span>Powrót do strony głównej</span>
				</button>
			</div>
			<h1 className='header'>
				<div className='redDivStyle'>Kamery</div>
			</h1>

			<div className='title font-bold '>
				<h2>Kategorie</h2>
			</div>

			{loading ? (
				<div className='loadingScreen'>
					<p className='text-xl text-[#99ccff] font-bold animate-pulse'>Ładowanie kategorii...</p>
				</div>
			) : (
				<div className='gridContainer'>
					{categories.map(item => (
						<button
							key={item.department.departmentId}
							className='button h-20'
							onClick={() => handleRedirect(item.department.departmentId)}>
							{item.department.departmentName}
							<div className='redSquareStyle'>{item.count}</div>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
