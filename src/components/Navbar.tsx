import olx from "../assets/olx.png";
import lens from "../assets/lens.png";
import arrow from "../assets/arrow.png";
import search from "../assets/search.png";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase"; 
import { toast } from "react-toastify";

type NavbarProps = {
  setSearch: (value: string) => void;
};

const Navbar = (props: NavbarProps) => {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.email || "User"); 
      } else {
        setUser(null);
      }
    });

    
    return () => unsubscribe();
  }, []);

  const handleUser = async () => {
    if (user) {
      try {
        await signOut(auth);
        setUser(null);
        toast.success("Logged out successfully");
      } catch (error: any) {
        console.error("Logout Error:", error);
        toast.error("Failed to log out. Please try again.");
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex p-4 bg-slate-100 shadow-md">
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <img src={olx} alt="OLX Logo" className="w-11 h-9" />
      </div>
      <div className="flex border border-spacing-1 w-67 p-2 border-black ml-4 bg-white">
        <img src={lens} className="w-5 h-5 mt-1" />
        <input placeholder="Location" className="ml-3 outline-none" />
        <img src={arrow} className="w-8 h-7" />
      </div>
      <div className="flex h-12 ml-14 border border-black bg-white">
        <input
          onChange={(e) => props.setSearch(e.target.value)}
          placeholder="Find Cars, Mobile phones, and more..."
          className="ml-3 outline-none"
          style={{ width: '36rem' }}
        />
        <img src={search} alt="Search" />
      </div>

      <div className="flex h-12 p-3 ml-10 cursor-pointer">
        <h1 className="font-semibold">ENGLISH</h1>
        <img src={arrow} alt="Arrow" className="w-8 h-7" />
      </div>
      <div className="flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline">
        <h1 onClick={handleUser} className="font-bold ">
          {user ? 'Logout' : 'Login'}
        </h1>
      </div>
      <div onClick={()=>navigate('/sell')} className="w-28 flex h-12 p-3 ml-6 cursor-pointer rounded-full border border-yellow-500">
        <h1 className="font-bold">+ SELL</h1>
      </div>
    </div>
  );
};

export default Navbar;
