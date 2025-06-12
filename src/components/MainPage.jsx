import Elements from '../utilis/elements'
import StorageSummary from './StorageSummary'
const MainPage = () => {
	return (
		<div className='my-4'>
			<div className='grid grid-cols-2 gap-2 mx-4'>
				{Elements.map(element => (
					<StorageSummary key={`${element.done}-${element.done2}`} element={element} />
				))}
			</div>
		</div>
	)
}

export default MainPage
