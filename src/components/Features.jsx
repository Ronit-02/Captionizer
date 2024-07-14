import PropTypes from 'prop-types';

const Features = ({title, image, reverse}) => {

    return (
    <div className={`flex flex-col items-end gap-8 md:flex-row ${reverse ? 'md:flex-row-reverse' : ''}`}>
        <h1 className='text-2xl leading-tight font-primaryBold h-fit'>{title}</h1>
        <diV className="w-3/4 h-[200px]">
            <img className='object-contain w-full h-full' src={image} alt='feature-image' />
        </diV>
    </div>
  )
}

Features.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    reverse: PropTypes.bool,
}

export default Features