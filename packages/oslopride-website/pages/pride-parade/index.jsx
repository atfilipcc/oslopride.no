import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import { webResponseInitial } from "@/store/helpers";
import { getPrideParade, prideParadeActions } from "@/store/pride-parade";
import { imageUrlFor } from "@/store/sanity";
import NextSeo from "next-seo";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Wrapper = styled(Sheet)`
  @media (min-width: 1000px) {
    width: 1000px;
  }
`;

const PrideParadeImage = styled.img`
  max-width: 100%;
`;

const PrideParade = props => {
  const { prideParade } = props;

  if (prideParade.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  const { body, preamble, image } = prideParade.data;

  return (
    <Wrapper>
      <h1>Pride Parade</h1>
      <article>
        <SanityBlockContent blocks={preamble} />
        <PrideParadeImage
          src={imageUrlFor(image).url()}
          alt="pride parade illustrasjon"
        />
        <SanityBlockContent blocks={body} />
      </article>

      <NextSeo
        config={{
          title: "Pride Parade",
          description:
            "Pride Parade er det store høydepunktet under Oslo Pride og er etter 17. mai-toget, det mest synlige arrangementet i Oslo i løpet av året.",
          openGraph: {
            type: "website",
            url: "https://oslopride.no/pride-parade",
            locale: "nb_NO",
            site_name: "Oslo Pride",
            title: "Pride Parade",
            description:
              "Pride Parade er det store høydepunktet under Oslo Pride og er etter 17. mai-toget, det mest synlige arrangementet i Oslo i løpet av året.",
            images: [{ url: imageUrlFor(image).url() }]
          }
        }}
      />
    </Wrapper>
  );
};

PrideParade.getInitialProps = async ({ store, isServer }) => {
  if (store.getState().prideParade.status === webResponseInitial().status) {
    store.dispatch(prideParadeActions.request());
    if (isServer) {
      try {
        const response = await getPrideParade();
        store.dispatch(prideParadeActions.success(response));
      } catch (e) {
        store.dispatch(prideParadeActions.failure(`${e}`));
      }
    }
  }
};

const mapStateToProps = state => ({
  prideParade: state.prideParade
});

const mapDispatchToProps = dispatch => ({
  fetchAboutContent: () => dispatch(prideParadeActions.request())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrideParade);
