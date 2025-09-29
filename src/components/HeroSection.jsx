import { useState ,useEffect} from 'react';
import activityImage from '../assets/images/activity-image.jpg';
import schoolImage from '../assets/images/school-image.jpg';
import jobImage from '../assets/images/job-image.jpg';
import tuitionImage from '../assets/images/tuition-image.jpg';
import { Link } from 'react-router-dom';

const slides = [ 
  {
    title:"Discover the Right Activities and Workshops based on your Child’s Aptitude and Interests",
    image:activityImage,
    button:"Find the Right Activities",
    background: "linear-gradient(to right, #a0f0e0, #ffffff, #da3753ff)",
    link:'/activities'
  },
  {
    title:"Search, Discover, and Decide on the Right School for Your Child",
    image:schoolImage,
    button:"Find the Right Schools",
     background: "linear-gradient(to right, #ffe0cc, #ffffff, #da3753ff)",
     link:'/schools'
  },
  {
    title:"Connect with the best schoools across India & apply to thousands of job opportunities across top institutes and locations",
    image:jobImage,
    button:"Discover Jobs",
    background: "linear-gradient(to right, #c0e0ff, #ffffff, #da3753ff)",
    link:'/jobs'
  },
  {
    title:"Search for the best Tuition and Tutors based on your Child’s Requirements",
    image:tuitionImage,
    button:"Find the Right Tuition",
    background: "linear-gradient(to right, #f8b5d6, #ffffff, #da3753ff)",
    link:'/beyond-school'
  }
];

export default function HeroSection() {
  const[current,setCurrent]=useState(0);
  const prevSlide=()=>{
    setCurrent((prev)=>(prev===0? slides.length-1:prev-1));
  }
  const nextSlide=()=>{
    setCurrent((prev)=>(prev===slides.length-1?0:prev+1));
  }
   useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);  

    return () => clearInterval(interval); 
  }, []);

  const currentSlide = slides[current];

  return (
    <section className="hero-slider" style={{ background: currentSlide.background }}>
      <button className="arrow left" onClick={prevSlide}>&#10094;</button>
      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-heading">{currentSlide.title}</div>
          <Link to={currentSlide.link} className='hero-btn'>{currentSlide.button}</Link>
        </div>
        <div className="hero-right">
          <img src={currentSlide.image} alt="Slide" className="hero-image" />
        </div>
      </div>
      <button className="arrow right" onClick={nextSlide}>&#10095;</button>
    </section>
  );
}
