import React from "react";
import DeliveryImg from "../assets/delivery.png";
import HeroBgImg from "../assets/heroBg.png";
import { heroData } from "../utils/data";

const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
      <div className="flex-1 py-2 flex flex-col items-start justify-center md:items-start gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">Home Delivery</p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img className="w-full h-full object-contain" src={DeliveryImg} alt="deliveryimage" />
          </div>
        </div>

        <p className="text-[2.5rem] md:text-[4.5rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in <span className="text-orange-600 text-[3rem] md:text-[5rem] tracking-wider">Your City</span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          We serve Chinese & fast foods. Food quality is our first priority, you can find delicious food at a very reasonable price. Most of the items
          are Chinese, and we also serve Maggie, omelet, tea, coffee, etc. People's favorites are momos, chilly chicken, chilly paneer, chicken
          pakora, etc. We welcome you!
        </p>

        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now
        </button>
      </div>

      <div className="flex-1 py-2 flex items-center relative">
        <img src={HeroBgImg} className="ml-auto h-420 w-full lg:w-auto lg:h-650" alt="herobg" />
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center py-4 gap-4 flex-wrap">
          {/* lg:px-32 */}
          {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className=" lg:w-190  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img src={n.imgSrc} className="w-20 lg:w-40 -mt-10 lg:-mt-20" alt="I1" />
                <p className="text-base lg:text-xl mt-2 lg:mt-4 font-semibold text-textColor">{n.name}</p>
                <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">{n.decp}</p>
                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">$</span>
                  {n.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
