import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


type Product = {
  id: string;  
  image: string;
  price: number;
  title: string;
  category: string;
};


type ProductsProp = {
  products: Product[];
  search: string;
  menu?: string;
};

const Home = ({ products: initialProducts, search, menu }: ProductsProp) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const dataList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(dataList);
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      }
    };

    fetchData();
  }, []);

  const searchTerm = (search || menu || '').toLowerCase();

  const filteredProducts = products.concat(initialProducts).filter(product => {
    return product.title.toLowerCase().includes(searchTerm);
  });

  return (
    <div className="grid grid-cols-4">
      {filteredProducts.map(product => (
        <Link 
          to='/details' 
          state={{ data: product }} 
          key={product.id}
        >
          <div className="border border-spacing-1 p-2 ml-3 mt-3">
            <img src={product.image} className="w-60 h-48" alt={product.title} />
            <h1 className="font-bold text-xl">${product.price}</h1>
            <h1>{product.title}</h1>
            <h1>{product.category}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
