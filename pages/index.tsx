import { GetStaticProps, NextPage } from 'next';
import { Image as DatoImage, StructuredText } from 'react-datocms';
import { HomeDocument, HomeQuery } from '../graphql/generated';
import { request } from '../lib/request';

type Props = { result: HomeQuery };

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const result = await request(HomeDocument);
  return { props: { result } };
};

const Home: NextPage<Props> = ({ result }) => {
  return (
    <ul>
      {result.allAuthors.map((author) => (
        <li key={author.id}>
          {author.name} <DatoImage data={author.avatar.responsiveImage} />
        </li>
      ))}
    </ul>
  );
};

export default Home;
