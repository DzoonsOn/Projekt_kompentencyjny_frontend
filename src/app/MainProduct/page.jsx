'use client'
import Image from 'next/image'
import polka from '@/public/polka.jpg'
const MainPage = () => {
	const handeAddProduct = () => {}
	const handeUnAddProduct = () => {}

	const stylessAddButton =
		'items-center justify-center px-3 py-4 text-md font-semibold text-white rounded-full shadow-md'
	const stylesInfoDiv =
		'w-full flex justify-center py-2 bg-gray-200 rounded-lg text-gray-800 font-semibold shadow-md hover:bg-gray-300'
	return (
		<div className=' mx-auto bg-white rounded-lg shadow-md p-4 border my-2'>
			<div className='pb-4 flex flex-col mx-auto lg:w-1/4 md:w-1/2'>
				<h1 className='text-center text-xl text-black font-bold mb-1'>Hugo boss</h1>
				<div className='h-0.5 bg-slate-600 self-stretch'></div>
			</div>

			<div className='relative w-full h-64 bg-green-300 mb-4'>
				<Image src={polka} alt='Detected Items' className='w-full h-full object-cover' />
			</div>

			<div className='flex justify-center lg:gap-40 gap-14 mb-4'>
				<button onClick={handeAddProduct} className={`${stylessAddButton} bg-red-500  hover:bg-red-800`}>
					<p>Nie dodano</p>
				</button>
				<button onClick={handeUnAddProduct} className={`${stylessAddButton} bg-green-500  hover:bg-green-800`}>
					<p>&nbsp;&nbsp;Dodano&nbsp;&nbsp;</p>
				</button>
			</div>

			<div className='flex flex-col space-y-3'>
				<div className={stylesInfoDiv}>Półka</div>
				<div className={stylesInfoDiv}>Numer od lewej</div>
				<div className={stylesInfoDiv}>Kategoria</div>
			</div>
		</div>
	)
}
export default MainPage
