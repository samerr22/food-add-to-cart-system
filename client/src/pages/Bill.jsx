import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import food from "../img/food.jpg";

export default function Bill() {
  const { currentUser } = useSelector((state) => state.user);
  const [orderDetailsList, setOrderDetailsList] = useState([]);
  console.log(orderDetailsList)

  const CurrentuserId = currentUser ? currentUser._id : null;

  //after submit form display data order page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/items/getallcheck/${CurrentuserId}`);
        const data = await response.json();
        console.log(data);

        if (data.length > 0) {
          setOrderDetailsList(data);
        } else {
          setOrderDetailsList([]);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchData();
  }, [CurrentuserId]);

  return (
    <div className="min-h-screen">
          <img src={food} alt="" className="w-full h-[700px]   object-cover" />

      <div className="absolute transform -translate-x-0 translate-y-0 top-1 flex justify-center items-center">
        <div className="lg:mt-20 mt-[270px] md:mt-20 lg:ml-[] md:ml-[] ml-[4px]">
          <div className="flex justify-center items-center ml-4 mt-2">
            <div className="uppercase font-light  opacity-85 text-3xl ml-32 mt-8 text-white ">
            order history
            </div>
          </div>
          <div className="flex justify-center items-center ml-3 mt-3">
          <Link to={`/cart`}>
            <button className="text-white w-32 h-8  rounded-full bg-black border border-white  shadow-black uppercase font-serif ml-32 cursor-pointer hover:opacity-85">
            back
            </button>
            </Link>
          
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
                        <th className="px-6 py-3 text-left text-sm font-serif  bg-gray-900 rounded-xl bg-opacity-90 text-white text-opacity-80   uppercase">
                          action
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
                            <button className="w-32 cursor-default h-8 rounded-full bg-[#13c53a] border text-white border-white shadow-sm shadow-black opacity-90">
                            {order.status}
                            </button>
                         
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-serif text-black">
                          <button className="w-32 h-8 rounded-full hover:opacity-80 bg-[#040846] border text-white border-white shadow-sm shadow-black opacity-90">
                           Pay Now
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
