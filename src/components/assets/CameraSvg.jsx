const CameraSvg = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			width={25}
			height={25}
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect>
			<path d='M3 7h18l-3-3h-3l-1.5-1.5h-3L12 7'></path>
			<circle cx='12' cy='12' r='4'></circle>
		</svg>
	)
}

export default CameraSvg
