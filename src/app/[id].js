import Head from "next/head";

export default function Home({ place }) {
  console.log("Received Place Data:", place); // Debugging output
  if (!place) return <div>Loading....</div>;

  return (
    <>
      <Head>
        <meta property="og:title" content={place.name} />
        <meta property="og:description" content={place.Description} />
        <meta property="og:image" content={place.image} />
      </Head>
      <a href="/">
        <button>Home</button>
      </a>
      <h1>{place.name}</h1>
      <p>{place.Description}</p>
    </>
  );
}

export async function getServerSideProps({ params }) {
  console.log("params", params);
  const { id } = params; // Ensure your dynamic route is [id].js
  try {
    const res = await fetch(`http://localhost:4200/api/places/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch place: ${res.status}`);

    const data = await res.json();
    return { props: { place: data } };
  } catch (error) {
    console.error("Error fetching place:", error);
    return { props: { place: null } };
  }
}
