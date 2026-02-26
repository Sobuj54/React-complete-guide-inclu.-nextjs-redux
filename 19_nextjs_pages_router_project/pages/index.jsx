import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

export const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "First Meetup",
    image:
      "https://cdn.pixabay.com/photo/2023/06/17/19/39/temple-8070703_1280.jpg",
    address: "Dessert, Middle East",
    description: "Night view",
  },
];

function Home(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="react developer meetups." />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// Static site generation
export async function getStaticProps() {
  // fetch data from API
  const client = await MongoClient.connect(
    `mongodb+srv://nextjs_pages_api:9jtprVtg19bCkHEL@cluster0.8ntnxtq.mongodb.net/?appName=Cluster0`,
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

// server side rendering
// export async function getServerSideProps(context) {
//   const { req, res } = context;
//   //fetch api data
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default Home;
