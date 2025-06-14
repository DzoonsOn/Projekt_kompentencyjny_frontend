'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import '../../components/style/Categories.css'

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
		<div style={{ textAlign: 'center', padding: '20px' }}>
			<h1 className='header'>
				<div className='redDivStyle'>Kamery</div>
			</h1>

			<div className='title'>
				<h2>Kategorie</h2>
			</div>

			{loading ? (
				<div className='loadingScreen'>
					<p className='text-xl text-red-600 font-bold animate-pulse'>Ładowanie kategorii...</p>
				</div>
			) : (
				<div className='gridContainer'>
					{categories.map(item => (
						<button
							key={item.department.departmentId}
							className='button'
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
