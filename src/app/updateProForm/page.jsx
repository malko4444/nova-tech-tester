"use client";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

import { useRouter } from "next/navigation";
export default function OtherPage() {
  const [item, setItem] = useState(null);
  const router = useRouter();
  // Load the selected item from localStorage
  useEffect(() => {
    const storedItem = localStorage.getItem("selectedItem for Update");
    if (storedItem) {
      setItem(JSON.parse(storedItem));
    }
  }, []);

  // Update handler for Firestore
  const updateHandler = async () => {
    if (item?.id) {
      try {
        const docRef = doc(db, "products", item.id);
        const data = {
          name: item.name,
          description: item.description,
          oldPrice: item.oldPrice,
          price: item.price,
          image: item.image,
        };
  
        if (item.image1) {
          data.image1 = item.image1;
        }
  
        if (item.image2) {
          data.image2 = item.image2;
        }
  
        await updateDoc(docRef, data);
        alert("Item updated successfully!");
        router.push("/");
      } catch (error) {
        console.error("Error updating document:", error);
        alert("Failed to update item.");
      }
    } else {
      alert("No valid item ID found for update.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      
      {item && (
        <div className="flex flex-col  ">
          <input
          className="custom-input"
            type="text"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            placeholder="Name"
          />
          <input
          className="custom-input"
            type="text"
            value={item.description}
            onChange={(e) =>
              setItem({ ...item, description: e.target.value })
            }
            placeholder="Description"
          />
           <input
          className="custom-input"
            type="text"
            value={item.oldPrice}
            onChange={(e) => setItem({ ...item, oldPrice: e.target.value })}
            placeholder="Old Price"
          />
          <input
          className="custom-input"
            type="text"
            value={item.price}
            onChange={(e) => setItem({ ...item, price: e.target.value })}
            placeholder="New Price"
          />
          <input
          className="custom-input"
            type="text"
            value={item.image}
            onChange={(e) => setItem({ ...item, image: e.target.value })}
            placeholder="Image URL"
          />
          <input
          className="custom-input"
            type="text"
            value={item.image1}
            onChange={(e) => setItem({ ...item, image1: e.target.value })}
            placeholder="Image 1 URL"
          />
          <input
          className="custom-input"
            type="text"
            value={item.image2}
            onChange={(e) => setItem({ ...item, image2: e.target.value })}
            placeholder="Image 2 URL"
          />
          <button className="w-[500px] h-[40px] bg-[#212121] text-white font-medium mt-[20px] " onClick={updateHandler}>Update</button>
        </div>
      )}
    </div>
  );
}
