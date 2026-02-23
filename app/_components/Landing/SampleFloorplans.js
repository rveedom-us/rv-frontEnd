import FloorPlansCard from "@/_ui/FloorPlansCard";

const SampleFloorplans = () => {
  // NOTE  test json data
  const floorData = [
    {
      id: 1,
      title: "Small",
      size: "18–22 ft",
      beds: "1 BEDS",
      cardDetails: [
        {
          feature: "Rear Bath + Dinette",
          img: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974",
        },
        {
          feature: "Murphy Bed Studio",
          img: "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
        },
      ],
    },
    {
      id: 2,
      title: "Cozy",
      size: "18–22 ft",
      beds: "1 BEDS",
      cardDetails: [
        {
          feature: "Loft Bedroom",
          img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974",
        },
        {
          feature: "Compact Kitchen",
          img: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        },
      ],
    },
    {
      id: 3,
      title: "Modern",
      size: "118–22 ft",
      beds: "1 BEDS",
      cardDetails: [
        {
          feature: "Open Floor Plan",
          img: "https://images.unsplash.com/photo-1696604534314-afe50575c131?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
        },
        {
          feature: "Balcony Access",
          img: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        },
      ],
    },
    {
      id: 4,
      title: "Spacious",
      size: "118–22 ft",
      beds: "1 BEDS",
      cardDetails: [
        {
          feature: "Master Suite",
          img: "https://images.unsplash.com/photo-1566272726777-91f06285e3c9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
        },
        {
          feature: "Walk-in Closet",
          img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        },
      ],
    },
    {
      id: 5,
      title: "Luxury",
      size: "218–22 ft",
      beds: "1 BEDS",
      cardDetails: [
        {
          feature: "Gourmet Kitchen",
          img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974",
        },
        {
          feature: "Home Office",
          img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        },
      ],
    },
  ];

  //   notes
  // container will contain max-w-7xl px-4 sm:px-6 pt-10
  return (
    <section className="bg-slate-950/60 py-16">
      <div className="container mx-auto  max-w-7xl px-4 sm:px-6">
        {/* text */}
        <div className="text-center">
          <h1 className="text-center  text-[#27DBFD] uppercase font-semibold text-xs">
            Sample floorplans
          </h1>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mt-2">
            Layouts you’ll love
          </h1>

          <p className="mx-auto max-w-3xl text-balance text-white/70 mt-2">
            Exact floorplan varies by match. Here are common industry standards
            by size.
          </p>
        </div>

        {/* card */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 ">
          {floorData.map((floor) => (
            <FloorPlansCard key={floor.id} {...floor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SampleFloorplans;
