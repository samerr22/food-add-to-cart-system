import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import food from "../img/food.jpg";

export default function staffoder() {
  const { currentUser } = useSelector((state) => state.user);
  const [orderDetailsList, setOrderDetailsList] = useState([]);
  console.log(orderDetailsList)

  

  //after submit form display data order page
   
  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`/api/items/getAllOder`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
            setOrderDetailsList(data.Details);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchinfo();
  }, []);


  const handleStatusChange = async (FormmId, currentStatus) => {
    try {
      let newStatus;
      switch (currentStatus) {
        case "processing":
          newStatus = "Approval";
          break;
        case "Approval":
          newStatus = "Reject";
          break;
        case "Reject":
          newStatus = "processing";
          break;
        default:
          newStatus = "processing"; // Default to "Processing" if status is not recognized
      }

      const res = await fetch(`/api/items/adopp/${FormmId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrderDetailsList(
            orderDetailsList.map((order) => {
            if (order._id === FormmId) {
              return { ...order, status: newStatus };
            }
            return order;
          })
        );
       
      }
    } catch (error) {
      console.log(error.message);
    }
  };

   


  return (
    <div className="min-h-screen">
          <img src={food} alt="" className="w-full h-[700px]   object-cover" />

      <div className="absolute transform -translate-x-0 translate-y-0 top-1 flex justify-center items-center">
        <div className="lg:mt-20 mt-[270px] md:mt-20 lg:ml-[] md:ml-[] ml-[4px]">
          <div className="flex justify-center items-center mt-2">
            <div className="uppercase font-light  opacity-85 text-3xl ml-32 mt-8 text-white ">
            orders
            </div>
          </div>
         
          <div className="w-[1200px] h-[400px] mt-6 ml-36  shadow-sm shadow-black rounded-xl bg-opacity-90 bg-gray-100">
            <div className="">
              <div className="flex justify-center items-center ">
                <div className="max-h-[400px] overflow-y-auto scrollbar-none ">
                  <table className="w-[1200px]  border  border-white border-opacity-50 divide-y divide-black shadow-md">
                    <thead className="bg-none divide-x divide-black">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-serif bg-gray-900 rounded-xl bg-opacity-90 text-white font-medium text-opacity-80   uppercase">
                          items
                        </th>
                        <th className="px-6 py-2 text-left text-sm font-serif   bg-gray-900 rounded-xl bg-opacity-90 text-white text-opacity-80   uppercase">
                          total price
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-serif  bg-gray-900 rounded-xl bg-opacity-90 text-white text-opacity-80   uppercase">
                          order date
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-serif bg-gray-900 rounded-xl bg-opacity-90 text-white text-opacity-80   uppercase">
                          customer info
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-serif  bg-gray-900 rounded-xl bg-opacity-90 text-white text-opacity-80   uppercase">
                          order status
                        </th>
                      
                      </tr>
                    </thead>

                    <tbody className="bg-none bg-opacity-40 divide-y divide-gray-200">
                      {orderDetailsList.map((order) => (
                        <tr key={order._id} className="bg-white">
                          <td className="px-6 py-4 break-words max-w-[300px]">
                            {order.items.map((item) => (
                              <div key={item._id}>
                                <div className="flex  gap-3">
                                  <div className="w-32 truncate font-serif text-black ">
                                    {item.ItemsN}
                                  </div>

                                  <div className="font-mono text-black">
                                    (x{item.quantity}) - RS.
                                    {item.price * item.quantity}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-mono text-black ">
                            Rs.{order.totalPrice}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-semibold from-black">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 font-serif text-black whitespace-nowrap ">
                            {order.Username}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-serif text-black">
                            <button onClick={() =>
                                    handleStatusChange(order._id, order.status)} className="w-32 h-8 rounded-full bg-[#13c53a] border text-white border-white shadow-sm shadow-black opacity-90">
                            {order.status}
                            </button>
                         
                          </td>
                        
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

