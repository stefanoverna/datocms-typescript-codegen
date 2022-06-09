import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Image as DatoImage, renderMetaTags } from 'react-datocms';
import { HomeDocument, HomeQuery } from '../graphql/generated';
import { request } from '../lib/request';

type Props = { result: HomeQuery };

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const result = await request(HomeDocument);
  return { props: { result } };
};

const Home: NextPage<Props> = ({ result }) => {
  return (
    <div>
      {result.homePage && (
        <Head>
          {renderMetaTags([
            ...result.homePage._seoMetaTags,
            ...result._site.favicon,
          ])}
        </Head>
      )}
      {result.allAuthors.map((author) => (
        <div key={author.name}>
          {author.name} <DatoImage data={author.avatar.responsiveImage} />
        </div>
      ))}
    </div>
  );
};

export default Home;
