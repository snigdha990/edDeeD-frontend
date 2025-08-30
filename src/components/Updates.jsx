const Links = [
    {
        href: "https://us06web.zoom.us/meeting/register/9QQkvwA1S5yBNt4aDmE_QA",
        src: "https://eddeed.com/img/Banner1.jpg",
        alt: "Zoom Meeting Registration Banner"
    },
    {
        href: "https://consult.eddeed.com",
        src: "https://eddeed.com/img/Banner2.jpg",
        alt: "edDeeD Consultation Banner"
    },
    {
        href: "https://donate.eddeed.com/",
        src: "https://eddeed.com/img/Banner3.jpg",
        alt: "edDeeD Donate Banner"
    }
];

export default function Updates(){
    return(
        <section className="latest-updates">
            <h2>Latest Updates</h2>
            <div className="updates">
                {Links.map(({href,src,alt},idx)=>{
                    return(
                        <a key={idx} href={href} target="_blank" rel="noopener noreferrer" >
                           <img src={src} alt={alt} className="banner-image"></img>
                        </a>
                    )
                })}
            </div>
        </section>
    )
}