'use client'

import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type ProductShortage = {
	shortageId: string
	productName: string
	shelfUnit: string
	shelfNumber: string
	productNumber: string
	departmentId: string
	fileData: string
}

interface Props {
	params: Promise<{
		id: number
	}>
}

const ProductDetailsPage = ({ params }: Props) => {
	const { id } = use(params)
	const router = useRouter()

	const [product, setProduct] = useState<ProductShortage | null>(null)
	const [loading, setLoading] = useState(true)
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		const fetchAllProducts = async () => {
			try {
				const res = await fetch('https://localhost:5001/productShortage/all', {
					headers: { Accept: 'text/plain' },
				})
				const data: ProductShortage[] = await res.json()
				const found = data.find(p => p.shortageId === String(id))
				setProduct(found || null)
			} catch (error) {
				console.error('Błąd pobierania produktów:', error)
			} finally {
				setLoading(false)
			}
		}

		if (id) {
			fetchAllProducts()
		}
	}, [id])

	const handleDelete = async () => {
		if (!product) return

		try {
			const res = await fetch(`https://localhost:5001/productShortage?id=${product.shortageId}`, {
				method: 'DELETE',
				headers: {
					Accept: '*/*',
				},
			})

			if (res.ok) {
				console.log('Produkt został usunięty.')
				setShowModal(false)
				router.push('/products') // lub inna strona po usunięciu
			} else {
				console.error('Błąd przy usuwaniu:', res.status)
			}
		} catch (error) {
			console.error('Błąd sieci podczas usuwania:', error)
		}
	}

	if (loading) {
		return <p className='text-gray-600 p-6'>Ładowanie danych produktu...</p>
	}

	if (!product) {
		return <p className='text-red-500 p-6'>Nie znaleziono produktu.</p>
	}

	return (
		<div className='max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg border'>
			<h1 className='text-4xl font-bold text-gray-800 mb-8 text-center'>{product.productName}</h1>

			<div className='w-1/3 mx-auto rounded-xl overflow-hidden shadow-md mb-8 aspect-[1/2]'>
				<img
					src={`data:image/png;base64,${product.fileData}`}
					alt={product.productName}
					className='w-full h-full object-cover'
				/>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700 px-2 mb-6'>
				<div className='bg-gray-50 p-4 rounded-lg shadow'>
					<span className='text-gray-500 font-semibold block'>Numer produktu:</span>
					{product.productNumber}
				</div>
				<div className='bg-gray-50 p-4 rounded-lg shadow'>
					<span className='text-gray-500 font-semibold block'>Regał:</span>
					{product.shelfUnit}
				</div>
				<div className='bg-gray-50 p-4 rounded-lg shadow'>
					<span className='text-gray-500 font-semibold block'>Półka:</span>
					{product.shelfNumber}
				</div>
				<div className='bg-gray-50 p-4 rounded-lg shadow'>
					<span className='text-gray-500 font-semibold block'>Dział ID:</span>
					{product.departmentId}
				</div>
			</div>

			<div className='flex justify-end'>
				<button
					onClick={() => setShowModal(true)}
					className='bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-md transition'>
					Usuń produkt
				</button>
			</div>

			{showModal && (
				<div className='fixed inset-0 flex justify-center items-center bg-opacity-30 backdrop-blur-lg'>
					<div className='bg-white text-gray-800 p-6 rounded-md shadow-xl w-96'>
						<h2 className='text-xl font-semibold mb-3'>Potwierdź usunięcie</h2>
						<p className='text-sm text-gray-600'>Czy na pewno chcesz usunąć ten produkt?</p>

						<div className='mt-6 flex justify-end gap-3'>
							<button
								onClick={() => setShowModal(false)}
								className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition'>
								Anuluj
							</button>
							<button
								onClick={handleDelete}
								className='bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition'>
								Usuń
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ProductDetailsPage
