import ProductCard from "../components/Product"
import { useEffect ,useState} from "react";
import axios from "axios"

const baseUrl = "http://localhost:1100";





export default function SellerProductPage() {
    
    let [data,setData]=useState([])
    
    useEffect(() => {
      const fetchData = async () => {
          try {
              let response = await axios.get(`${baseUrl}/product/allproduct`);
              
              if (response.status === 200) {  
                 
                  setData(response.data.message);
              }
          } catch (error) {
              console.error("Error fetching products:", error);
          }
      };

      fetchData();  
  }, []);

 


    return (
      <div className="w-full min-h-screen bg-neutral-800">
        <div className="grid grid-cols-5 gap-4 p-4">
          {data.map((product, index) => (
            <ProductCard key={index} {...product} role={"seller"} />
          ))}
        </div>
      </div>
    );
  }