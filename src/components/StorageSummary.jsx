'use client'
import { useRouter } from 'next/navigation'
const StorageSummary = ({ element }) => {
	const { divColor, href, colorCircle, svg, title, topicOne, topicTwo, textXl, done, done2, task2Number, taskNumber } =
		element
	const router = useRouter()

	const goToNextPage = () => {
		router.push(`\\${element.href}`)
	}
	return (
		<button
			onClick={href ? goToNextPage : null}
			className={` ${divColor} text-white rounded-lg p-4 shadow-md min-h-40 cursor-pointer`}>
			<div className='flex items-start mb-4'>
				<div className={`w-8 h-8 flex items-center justify-center ${colorCircle} rounded-full mr-4`}>{svg}</div>
				<h2 className='text-md font-semibold'>{title}</h2>
			</div>

			<div className='mb-4'>
				<div className='flex justify-between items-center mb-2'>
					{topicOne && <span className={`${textXl ? 'text-xl font-bold' : 'text-md'}`}>{topicOne}</span>}
					{taskNumber && done && (
						<span className={`${textXl ? 'text-xl' : 'text-md'} font-bold`}>
							{taskNumber} <span className='text-gray-300'>/ {done}</span>
						</span>
					)}
				</div>

				{topicTwo && (
					<div className='flex justify-between items-center'>
						<span className={`${textXl ? 'text-xl' : 'text-md'}`}>{topicTwo}</span>
						{element.task2Number && done2 && (
							<span className={`${textXl ? 'text-2xl' : 'text-md'} font-bold`}>
								{task2Number} <span className='text-gray-300'>/ {done2}</span>
							</span>
						)}
					</div>
				)}
			</div>

			{element.content && <div className='text-right text-xs text-gray-200'>{element.content}</div>}
		</button>
	)
}

export default StorageSummary
