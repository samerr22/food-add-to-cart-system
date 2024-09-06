import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const [Info, setInfo] = useState([]);
  const [quantity, setquantity] = useState(1);
  const { currentUser } = useSelector((state) => state.user);
  const CurrentuserId = currentUser ? currentUser._id : null;
  const [totalPrice, setTotalPrice] = useState(0);
  const [FormId, setdetformId] = useState(0);
  console.log(totalPrice);
  const [reportDownloaded, setReportDownloaded] = useState(false);
  const navigate = useNavigate();

  // after click the add to cart save database after display in the dropdown menu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/items/CgetAll/${CurrentuserId}`);
        const data = await response.json();

        console.log("data", data);

        if (data.length > 0) {
          setInfo(data);

          const totalPrice = data.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
          setTotalPrice(totalPrice);
        } else {
          setItems(null);
          setTotalPrice(0);
        }
      } catch (error) {
        console.error("Error fetching bid data:", error);
      }
    };

    fetchData();
  }, [CurrentuserId]);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/items/deletes/${FormId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setInfo((prev) => prev.filter((items) => items._id !== FormId));
        alert("succesfull");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  


  //save report in th data base
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      

      const formDataWithItems = {
       
        CurrentuserId: currentUser._id,
        items: Info.map((item) => ({
          ItemsN: item.ItemsN,
          price: item.price,
          quantity: item.quantity,
        })),
        length: Info.length,
        totalPrice: totalPrice,
      };

      console.log("dataaa", formDataWithItems);

      const res = await fetch("/api/items/Ocreate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataWithItems),
      });
      const data = await res.json();
      if (data.success === false) {
        return  console.log(data.message);
      }

      if (res.ok) {
        console.log(formDataWithItems);
         alert("succesfull")
        handleDeleteall();
        navigate("/bill")
        
       
      }
    } catch (error) {
      console.log(error.message);
    }
  };


   //if submite is success clear the cart details
   const handleDeleteall = async () => {
    try {
      const res = await fetch(`/api/items/deletesall/${CurrentuserId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("fail");
      } else {
        console.log("success");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Add title
    doc.text("bill Report", 10, 10);
  
    // Define the columns for the table
    const columns = [
      { title: "Item Name", dataKey: "name" },
      { title: "Quantity", dataKey: "quantity" },
      { title: "Price", dataKey: "price" }
    ];
  
    // Define the data for the table
    const data = Info.map((item) => ({
      name: item.ItemsN,
      quantity: item.quantity,
      price: item.price
    }));
  
    // Add table to the PDF
    doc.autoTable({
      columns: columns,
      body: data,
      startY: 20, // Start the table below the title
      styles: {
        cellPadding: 1,
        fontSize: 10,
        lineHeight: 1.2,
        overflow: "linebreak", // Ensure text wraps to the next line
      },
     
     
    });
  
    // Add total price to the PDF
    const finalY = doc.lastAutoTable.finalY; // Get the y position of the last table
    doc.text(`Total Price: RS.${totalPrice}`, 10, finalY + 10);
  
    // Save the PDF
    doc.save("supplierReport.pdf");
    setReportDownloaded(true);
  };
  

  


  return (
    <div>
      <div className="flex justify-center items-center mt-2 mb-8">
        <div>
          <img
            src="https://images.pexels.com/photos/236910/pexels-photo-236910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="h-[600px] w-[1400px] rounded-md shadow-sm"
          />
        </div>
      </div>
       <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center ">
        <div className=" mt-4">
          <div className=" flex justify-center items-center">
            <div className="w-[1200px] h-[500px] bg-slate-600 rounded-xl bg-opacity-10">
              <div className="flex justify-center items-center  ">
                <div className="max-h-96 scrollbar-none  overflow-y-auto mt-4">
                  <table className="w-[1000px] border border-white border-opacity-50 divide-y divide-black shadow-md">
                    <thead className="bg-none divide-x  divide-black">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs bg-gray-800 bg-opacity-90 text-white font-medium text-opacity-80   uppercase">
                          Image
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium   bg-gray-800 bg-opacity-90 text-white text-opacity-80   uppercase">
                          Item Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium  bg-gray-800 bg-opacity-90 text-white text-opacity-80   uppercase">
                          quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium  bg-gray-800 bg-opacity-90 text-white text-opacity-80   uppercase">
                          one item price
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-medium bg-gray-800 bg-opacity-90 text-white text-opacity-80   uppercase">
                          Delete
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-none bg-opacity-40 divide-y divide-gray-200">
                    {Info && Info.length > 0 ? (
                    <>
                      {Info.map((items) => (
                        <tr
                          key={items._id}
                          className=" dark:border-gray-700 dark:bg-gray-800"
                        >
                          <td className="px-6 py-4 break-words max-w-[300px]">
                            <img
                              src={items.image}
                              alt=""
                              className="w-10 h-10 object-cover"
                            />
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            {items.ItemsN}
                          </td>

                          <td className="px-6 py-4 break-words max-w-[300px] ">
                            {items.quantity}
                          </td>

                          <td className="px-6 py-4  break-words max-w-[300px]">
                            {items.price}
                          </td>

                          <td className="px-2 py-4 whitespace-nowrap">
                            <span
                              onClick={() => {
                                setdetformId(items._id);
                                handleDeleteUser();
                              }}
                            >
                              <div className="w-24  cursor-pointer bg-red-600 hover:opacity-80 rounded-lg  h-10 bg-opacity-70 border-white border border-opacity-45 text font-serif text-white text-opacity-80 ">
                                <div className="flex justify-center items-center mt-2">
                                    <div>
                                    Delete
                                    </div>

                                </div>
                            
                              </div>
                            </span>
                          </td>
                        </tr>
                      ))}
                      </>
                  ) : (
                    <>
                      <p className="text-2xl font-serif uppercase absolute ml-[360px] opacity-60 mt-14 ">
                        oops!. You have no items
                      </p>
                    </>
                  )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div>
          <div className="w-[1200px] h-[300px] mt-10 rounded-xl bg-opacity-10 shadow-sm bg-slate-600">
            <div className="flex justify-center items-center gap-48 ">
              <div className="mt-14">
                <div className="uppercase opacity-70 font-serif text-3xl">
                  date
                </div>
                <div className="uppercase mt-8 opacity-70 font-serif text-3xl">
                  promo code
                </div>
                <div className="uppercase mt-8 opacity-70 font-serif text-3xl">
                  total
                </div>
              </div>

              <div className="mt-14">
                <div className="uppercase font-serif text-xl">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="rounded-full w-[200px] h-8 bg-opacity-10"
                  />
                </div>
                <div className="uppercase mt-8 font-serif text-xl">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="rounded-full w-[200px] h-8 bg-opacity-10"
                  />
                </div>
                <div className=" mt-8 font-medium ">
                  <div
                    type="text"
                    name=""
                    id=""
                    className="rounded-full w-[200px] h-8 bg-opacity-10"
                  >
                    <div className="flex justify-center items-center">
                      <div className="text-2xl opacity-70 mt-[-10px]">
                        RS.{totalPrice}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div>
                <button type="submit" disabled={!reportDownloaded} className={`w-52 rounded-full h-10 uppercase text-white ${reportDownloaded ? 'bg-blue-700 opacity-80 hover:opacity-90' : 'bg-blue-500 opacity-50 cursor-not-allowed'}`}>
                  Checkout
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="text-sm uppercase text-red-600">
                first Please downlaod the Bill
              </div>
            </div>
          </div>
        </div>
      </div>
      </form>
      <div className="flex justify-center items-center mb-8 g mt-16">
        <div>
        
        <Link to={`/bill`}>
          <button className="w-32 h-8  text-opacity-80 rounded-full text-white bg-opacity-90 uppercase bg-blue-700 hover:opacity-80 shadow-lg">
            {" "}
            view order
          </button>
          </Link>

          <button  onClick={generatePDF} className="w-52 h-8 ml-4  whitespace-nowrap text-opacity-80 rounded-full text-white bg-opacity-90 uppercase bg-blue-700 hover:opacity-80 shadow-lg">
            {" "}
            Download bill
          </button>
        </div>
      </div>
      
    </div>
  );
}
