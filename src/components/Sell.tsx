import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { storage, db } from '../firebase';
import { toast } from 'react-toastify'; // Assuming you're using toast notifications
import { useNavigate } from 'react-router-dom';

const Sell = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const navigate=useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && category && price && image) {
      try {
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);
        const priceNumber = parseFloat(price);

        await addDoc(collection(db, "products"), {
          title,
          price: priceNumber,
          category,
          description,
          image: imageUrl,
        });

        toast.success('Product added successfully!');
        navigate('/')
        
      } catch (error) {
        console.error('Error adding product: ', error);
        toast.error('Failed to add product. Please try again.');
      }
    } else {
      toast.error('Please fill in all fields.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sell Your Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            accept="image/*"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Sell;
