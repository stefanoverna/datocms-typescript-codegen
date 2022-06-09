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
  if (!result.sink) {
    return null;
  }

  return (
    <div>
      {result.sink.asset.url}
      {result.sink.boolean}
      {result.sink.color.red - 1}
      {result.sink.date.toLocaleUpperCase()}
      {result.sink.datetime.toLocaleUpperCase()}
      {result.sink.gallery.map((g) => g.id).join(', ')}
      {result.sink.id.toLocaleUpperCase()}
      {result.sink.integer - 4}
      {result.sink.json}
      {result.sink.location.latitude - 1}
      {result.sink.number - 1}
      {result.sink.single.toUpperCase()}
      {result.sink.singleLinkMany.id}
      {result.sink.singleLinkOne.id}
      {result.sink.slug.toLocaleLowerCase()}

      <StructuredText data={result.sink.structuredTextMany.value} />
      {result.sink.structuredTextMany.links.map((x) => x.id).join(', ')}
      {result.sink.structuredTextMany.blocks.map((x) => x.id).join(', ')}

      <StructuredText data={result.sink.structuredTextOne.value} />
      {result.sink.structuredTextOne.links.map((x) => x.id).join(', ')}
      {result.sink.structuredTextOne.blocks.map((x) => x.id).join(', ')}

      {result.sink.text.toLocaleLowerCase()}
      {result.sink.video.url.toLocaleLowerCase()}
      {result.sink.video.width - 1}
      {result.sink.video.height - 1}
      {result.sink.video.thumbnailUrl.toLocaleLowerCase()}
      {result.sink.video.title.toLocaleLowerCase()}
      {result.sink.video.provider.toLocaleLowerCase()}
      {result.sink.video.providerUid.toLocaleLowerCase()}
      {result.sink.asset.colors.map((c) => c.red - 1).join(', ')}
      {result.sink.asset.copyright?.toLocaleLowerCase()}
      {result.sink.asset.size - 1}

      <div>Accept only specified extensions (IMAGE)</div>
      <DatoImage data={result.sink.asset.responsiveImage} />
      {result.sink.asset.blurUpThumb.toLocaleLowerCase()}
      {result.sink.asset.blurhash.toLocaleLowerCase()}
      {result.sink.asset.focalPoint.x}
      {result.sink.asset.height - 1}
      {result.sink.asset.width - 1}

      {result.sink.gallery.map((asset) => (
        <>
          <DatoImage data={asset.responsiveImage} />
          {asset.blurUpThumb.toLocaleLowerCase()}
          {asset.blurhash.toLocaleLowerCase()}
          {asset.focalPoint.x}
          {asset.height - 1}
          {asset.width - 1}
        </>
      ))}

      <div>Accept only specified extensions (VIDEO)</div>
      {result.sink.assetVideo.video.duration}

      {result.sink.galleryVideo.map((asset) => (
        <>{asset.video.duration}</>
      ))}

      <div>Require alt and/or title</div>
      {result.sink.asset.alt.toLocaleLowerCase()}
      {result.sink.asset.title.toLocaleLowerCase()}
    </div>
  );
};

export default Home;
