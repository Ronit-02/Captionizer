import PropTypes from 'prop-types';

const Features = ({id, title, image, reverse}) => {

    return (
    <div className={`flex flex-col items-end gap-8 md:flex-row ${reverse ? 'md:flex-row-reverse' : ''}`}>
        <h1 className='text-base leading-tight md:text-2xl text-balance h-fit'>{id}. {title}</h1>
        <div className="w-full md:w-3/4 h-[200px]">
            <img className='object-contain w-full h-full' src={image} alt='feature-image' />
        </div>
    </div>
  )
}

Features.propTypes = {
    id: PropTypes.any,
    title: PropTypes.string,
    image: PropTypes.string,
    reverse: PropTypes.bool,
}

export default Features