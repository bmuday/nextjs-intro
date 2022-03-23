import { useRouter } from "next/router";
import Link from "next/link";
import { server } from "../../config";

const article = ({ data }) => {
  //   const router = useRouter();
  //   const { id } = router.query;

  return (
    <>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
      <br />
      <Link href="/data">Go Back</Link>
    </>
  );
};

export const getStaticProps = async (context) => {
  const res = await fetch(`${server}/api/data/${context.params.id}`);

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/data`);

  const articles = await res.json();

  const ids = articles.map((article) => article.id);

  const paths = ids.map((id) => ({
    params: {
      id: id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default article;
