import { Layout } from "@/components";
import { client } from "@/lib/client";
import css from "../../styles/Order.module.css";
import { UilBill, UilBox } from "@iconscout/react-unicons";
import Image from "next/image";
import Cash from "../../assets/cash.png";
import Onway from "../../assets/delivered.png";
import Package from "../../assets/package.png";
import Spinner from "../../assets/spinner.svg";

export const getServerSideProps = async ({ params }) => {
  try {
    const query = `*[_type == 'order' && _id == '${params.id}']`;
    const orders = await client.fetch(query);

    // Check if order exists
    if (!orders || orders.length === 0) {
      return {
        notFound: true, // Return a 404 page if the order is not found
      };
    }

    const order = orders[0];

    return {
      props: {
        order: order || null, // Return null if order is undefined
      },
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    return {
      props: {
        order: null, // Return null in case of error
      },
    };
  }
};

export default function Orders({ order }) {
  return (
    <div className={css.container}>
      <span className={css.heading}>Order in process</span>
      <div className={css.details}>
        <div>
          <span>Order ID</span>
          <span>{order._id}</span>
        </div>

        <div>
          <span>Customer Name</span>
          <span>{order.name}</span>
        </div>
        <div>
          <span>Phone</span>
          <span>{order.phone}</span>
        </div>
        <div>
          <span>Total</span>
          <span>${order.totalPrice}</span>
        </div>
      </div>
      <div className={css.statusContainer}>
        <div className={css.status}>
          <UilBill width={50} height={50} />
          <span>Payment</span>
          <span className={css.completed}>On Delivery</span>
        </div>
        <div className={css.status}>
          <Image src={Package} alt="cooking" width={50} height={50} />
          <span>Packing</span>
          {order.status === 1 && (
            <div className={css.spinner}>
              <Image src={Spinner} alt="" />
            </div>
          )}
          {order.status > 1 && <span className={css.completed}>Completed</span>}
        </div>
        <div className={css.status}>
          <Image src={Onway} width={50} height={50} alt="" />
          <span>OnWay</span>
          {order.status === 2 && (
            <div className={css.spinner}>
              <Image src={Spinner} alt="" />
            </div>
          )}
          {order.status > 2 && <span className={css.completed}>Completed</span>}
        </div>
        <div className={css.status}>
          <UilBox width={50} height={50} />
          <span>Delivered</span>
          {order.status === 3 && (
            <div className={css.spinner}>
              <Image src={Spinner} alt="" />
            </div>
          )}

          {order.status > 3 && <span className={css.completed}>Completed</span>}
        </div>
      </div>
    </div>
  );
}
