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
	const [showImageModal, setShowImageModal] = useState(false)

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
				router.push(`/products?departmentId=${product.departmentId}`)
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

			<div
				className='w-1/2 mx-auto rounded-xl overflow-hidden shadow-md mb-8 aspect-[1/2] cursor-pointer hover:scale-105 transition'
				onClick={() => setShowImageModal(true)}>
				<img
					src={`data:image/png;base64,${product.fileData}`}
					alt={product.productName}
					className='w-full h-full object-cover'
				/>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700 px-2 mb-6'>
				<div className='bg-gray-50 p-2 rounded-lg shadow'>
					<span className='text-gray-500 font-semibold block'>Numer produktu: {product.productNumber}</span>
				</div>
				<div className='bg-gray-50 p-2 rounded-lg shadow'>
					<span className='text-gray-500 font-semibold block'>Regał: {product.shelfUnit}</span>
				</div>
				<div className='bg-gray-50 p-2 rounded-lg shadow'>
					<span className='text-gray-500 font-semibold block'>Półka: {product.shelfNumber}</span>
				</div>
				<div className='bg-gray-50 p-2 rounded-lg shadow'>
					<span className='text-gray-500 font-semibold block'>Dział ID: {product.departmentId}</span>
				</div>
			</div>

			<div className='flex justify-end'>
				<button
					onClick={() => setShowModal(true)}
					className='bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-md transition'>
					Dołożono
				</button>
			</div>

			{/* MODAL POTWIERDZENIA */}
			{showModal && (
				<div className='fixed inset-0 flex justify-center items-center bg-opacity-30 backdrop-blur-lg'>
					<div className='bg-white text-gray-800 p-6 rounded-md shadow-xl w-96'>
						<h2 className='text-xl font-semibold mb-3'>Potwierdź dodanie</h2>
						<p className='text-sm text-gray-600'>Czy na pewno dodałeś ten produkt?</p>

						<div className='mt-6 flex justify-end gap-3'>
							<button
								onClick={() => setShowModal(false)}
								className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition'>
								Cofnij
							</button>
							<button
								onClick={handleDelete}
								className='bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition'>
								Potwierdzam
							</button>
						</div>
					</div>
				</div>
			)}

			{/* MODAL ZDJĘCIA */}
			{showImageModal && (
				<div
					className='fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 cursor-zoom-out'
					onClick={() => setShowImageModal(false)}>
					<img
						src={`data:image/png;base64,${product.fileData}`}
						alt='Podgląd'
						className='max-w-full max-h-full object-contain rounded-lg shadow-lg'
					/>
				</div>
			)}
		</div>
	)
}

export default ProductDetailsPage
