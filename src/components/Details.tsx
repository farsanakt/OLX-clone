import { useLocation } from "react-router-dom"


const Details = () => {

    const location=useLocation()

    
  return (
    <div className="flex pt-4 ">
    <img src={location?.state?.data?.image}  /> 
    <div>
          <h1 className="font">${location?.state?.data?.price}</h1> 
          <h1 className="mt-5"><span>Category</span>:{location?.state?.data?.category}</h1> 
          <h1 className="mt-5"><span>Titlle</span>:{location?.state?.data?.title}</h1> 
          <h1 className="mt-5"><span>Description</span>{location?.state?.data?.description}</h1> 
    </div>
  
    </div>
  )
}

export default Details
