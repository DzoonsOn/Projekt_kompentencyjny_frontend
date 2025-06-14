'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

// === TYPES ===
type ProductShortage = {
	shortageId: string
	productName: string
	shelfUnit: string
	shelfNumber: string
	productNumber: string
	departmentId: string
	fileData: string
}

type Department = {
	departmentId: number
	departmentName: string
}

type Category = {
	department: Department
	count: number
}

const ProductShortagePage = () => {
	const [products, setProducts] = useState<ProductShortage[]>([])
	const [filteredProducts, setFilteredProducts] = useState<ProductShortage[]>([])
	const [categories, setCategories] = useState<Category[]>([])
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [totalCount, setTotalCount] = useState(0)
	const [filterId, setFilterId] = useState<string>('')

	const pageSize = 9

	const router = useRouter()
	const searchParams = useSearchParams()

	const totalPages = Math.ceil(totalCount / pageSize)

	const fetchTotalCount = async () => {
		try {
			const res = await fetch('https://localhost:5001/productShortage/Count', {
				headers: { Accept: 'text/plain' },
			})
			const data = await res.json()
			setTotalCount(data.count || 0)
		} catch (error) {
			console.error('Błąd pobierania liczby elementów:', error)
		}
	}

	const fetchProducts = async () => {
		setLoading(true)
		try {
			const res = await fetch(
				`https://localhost:5001/productShortage/Paginated?pageNumber=${page}&pageSize=${pageSize}`,
				{
					headers: { Accept: 'text/plain' },
				}
			)
			const data: ProductShortage[] = await res.json()
			setProducts(data || [])
		} catch (error) {
			console.error('Błąd pobierania danych:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchTotalCount()
		fetchProducts()
	}, [page])

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

	useEffect(() => {
		const urlFilterId = searchParams.get('departmentId') || ''
		setFilterId(urlFilterId)
	}, [searchParams])

	useEffect(() => {
		if (filterId) {
			setFilteredProducts(products.filter(p => p.departmentId === filterId))
		} else {
			setFilteredProducts(products)
		}
	}, [filterId, products])

	const getDepartmentName = (id: string): string => {
		const match = categories.find(cat => cat.department.departmentId.toString() === id)
		return match ? match.department.departmentName : `ID: ${id}`
	}

	return (
		<div className='p-6 max-w-[1440px] mx-auto'>
			<h1 className='text-4xl font-bold mb-6 text-gray-800'>Braki produktowe</h1>

			<div className='mb-6'>
				<label htmlFor='filterId' className='block mb-1 text-gray-900 font-semibold'>
					Filtruj po Department ID (1–8):
				</label>
				<p className='text-sm text-gray-600 mb-2'>
					Wprowadź wartość z przedziału od 1 do 8, aby zawęzić wyniki według identyfikatora działu.
				</p>
				<input
					id='filterId'
					type='number'
					min='1'
					max='8'
					value={filterId}
					onChange={e => setFilterId(e.target.value)}
					placeholder='Wpisz ID działu (np. 1)...'
					className='w-1/6 border text-gray-900 border-gray-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500'
				/>
				<div className='mt-3'>
					<button
						onClick={() => setFilterId('')}
						className='inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors duration-200'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-4 w-4'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
						</svg>
						Wyczyść filtr
					</button>
				</div>
			</div>

			{loading ? (
				<p className='text-gray-600'>Ładowanie...</p>
			) : filteredProducts.length === 0 ? (
				<p className='text-gray-600'>Brak wyników</p>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{filteredProducts.map(product => (
						<div
							key={product.shortageId}
							onClick={() => router.push(`/products/${product.shortageId}`)}
							className='bg-white border cursor-pointer border-gray-200 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.01]'>
							<img
								src={`data:image/png;base64,${product.fileData}`}
								alt={product.productName}
								className='w-full h-52 object-cover rounded-t-xl'
							/>
							<div className='p-4'>
								<h2 className='text-2xl font-semibold text-gray-800'>{product.productName}</h2>
								<p className='text-gray-700 text-base mt-2'>
									Regał: <span className='font-medium'>{product.shelfUnit}</span> / Półka:{' '}
									<span className='font-medium'>{product.shelfNumber}</span>
								</p>
								<p className='text-gray-700 text-base mt-1'>
									Dział: <span className='font-medium'>{getDepartmentName(product.departmentId)}</span>
								</p>
							</div>
						</div>
					))}
				</div>
			)}

			<div className='mt-8 flex justify-center gap-4'>
				<button
					disabled={page === 1}
					onClick={() => setPage(prev => Math.max(prev - 1, 1))}
					className='px-4 py-2 bg-red-600 text-white rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed'>
					Poprzednia
				</button>
				<span className='text-gray-700 text-lg font-medium'>
					Strona {page} z {totalPages}
				</span>
				<button
					disabled={page >= totalPages}
					onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
					className='px-4 py-2 bg-red-600 text-white rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed'>
					Następna
				</button>
			</div>
		</div>
	)
}

export default ProductShortagePage
