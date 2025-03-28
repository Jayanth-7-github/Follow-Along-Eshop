import ProductCard from "../components/Product";
import { useEffect ,useState} from "react";
import axios from "axios"
import { useNavigate} from "react-router-dom";





export default function ProductPage() {
   
    let [data,setData]=useState([])
   

    const navigate = useNavigate()
    
    useEffect(() => {
      const fetchData = async () => {
          try {
              let response = await axios.get("http://localhost:8181/product/allproduct");
              
              if (response.status === 200) {  
                 
                  setData(response.data.message);
              }
          } catch (error) {
              console.error("Error fetching products:", error);
          }
      };

      fetchData();  
  }, []);

  const addtocart=(id)=>{
    console.log("hbhb")
    console.log(id)
     navigate("/pro",{state:{id}})

  }


    return (
      <div className="w-full min-h-screen bg-neutral-800">
        <div className="grid grid-cols-5 gap-4 p-4">
          {data.map((product, index) => (
            <ProductCard key={index} {...product} toCart={()=>addtocart(product._id)} />
          ))}
        </div>
      </div>
    );
  }