import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import Error from "@/pages/_error";
import { eventsActions, getEvents } from "@/store/events";
import {
  foldWebResponse,
  mapWebResponse,
  webResponseStatus
} from "@/store/helpers";
import { capitalizeString } from "@/utils";
import theme from "@/utils/theme";
import dayjs from "dayjs";
import NextSeo from "next-seo";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Event = ({ event }) =>
  foldWebResponse(event, {
    initial: () => <Sheet>Laster...</Sheet>,
    request: () => <Sheet>Laster...</Sheet>,
    error: () => <Error statusCode={500} />,
    success: e => {
      if (e === undefined) return <Error statusCode={404} />;
      const {
        title,
        description,
        startingTime,
        endingTime,
        organizer,
        location,
        free,
        prices,
        ageLimit,
        deafInterpretation,
        accessible,
        _id
      } = e;

      const start = dayjs(startingTime);
      const end = dayjs(endingTime);
      const singleDayEvent = start.diff(end, "day") === 0;

      return (
        <>
          <Sheet>
            {singleDayEvent ? (
              <>
                <EventTimeDay>
                  <OrangeColor>{start.format("dddd")} </OrangeColor>
                  {start.format("D. MMMM YYYY")}
                </EventTimeDay>
                <EventTimeFromTo>
                  {start.format("HH:mm")} - {end.format("HH:mm")}
                </EventTimeFromTo>
              </>
            ) : (
              <>
                <EventTimeDay>
                  <EventTimeLabel>Fra </EventTimeLabel>
                  <OrangeColor>{start.format("dddd")} </OrangeColor>
                  {start.format("D. MMMM YYYY")}
                  <MultidayEventTime>
                    {" "}
                    {start.format("HH:mm")}
                  </MultidayEventTime>
                </EventTimeDay>
                <EventTimeDay>
                  <EventTimeLabel>Til </EventTimeLabel>
                  <OrangeColor>{end.format("dddd")} </OrangeColor>
                  {end.format("D. MMMM YYYY")}
                  <MultidayEventTime> {end.format("HH:mm")}</MultidayEventTime>
                </EventTimeDay>
              </>
            )}
            <Title>{title}</Title>
            <SanityBlockContent blocks={description} />
            <Details>
              <OrangeColor as="h2">Detaljer</OrangeColor>
              <div>
                <strong>Arrangør: </strong>
                {organizer}
              </div>
              <div>
                <strong>Sted: </strong>
                {location.name && `${location.name}, `}
                {location.address}
              </div>
              <div>
                <strong>Tidspunkt: </strong>
                {singleDayEvent
                  ? `${start.format("HH:mm")} - ${end.format("HH:mm")}`
                  : `${start.format("D. MMMM HH:mm")} - ${end.format(
                      "D MMMM HH:mm"
                    )}`}
              </div>
              <div>
                <strong>Pris: </strong>
                {free
                  ? "Gratis"
                  : prices === undefined
                  ? "Ukjent"
                  : prices
                      .map(
                        ({ amount, priceLabel }) => `${amount} (${priceLabel})`
                      )
                      .join(", ")}
              </div>
              <div>
                <strong>Aldersgrense: </strong>
                {ageLimit === "0" ? "Fri aldersgrense" : `${ageLimit} år`}
              </div>
              <div>
                <strong>Tegnspråktolket: </strong>
                {deafInterpretation ? "Ja" : "Nei"}
              </div>
              <div>
                <strong>Universell utforming: </strong>
                {accessible ? "Ja" : "Nei"}
              </div>
            </Details>
          </Sheet>

          <NextSeo
            config={{
              title: title,
              description: `${capitalizeString(
                start.format("dddd D. MMMM YYYY")
              )} ${start.format("HH:mm")} - ${end.format(
                "HH:mm"
              )} @ ${location.name && location.name + ", "}${location.address}`,
              openGraph: {
                type: "website",
                url: `https://oslopride.no/events/${_id}`,
                title,
                locale: "nb_NO",
                site_name: "Oslo Pride",
                title: title,
                description: `${capitalizeString(
                  start.format("dddd D. MMMM YYYY")
                )} ${start.format("HH:mm")} - ${end.format(
                  "HH:mm"
                )} @ ${location.name && location.name + ", "}${
                  location.address
                }`,
                images: [
                  { url: "https://oslopride.no/static/logo.jpg" },
                  { url: "https://oslopride.no/static/prideheart.jpg" }
                ]
              }
            }}
          />
        </>
      );
    }
  });

Event.getInitialProps = async ({ query, store, isServer }) => {
  const { id } = query;
  const { events } = store.getState();

  if (events.status !== webResponseStatus.SUCCESS) {
    store.dispatch(eventsActions.request());

    if (isServer) {
      try {
        const response = await getEvents();
        store.dispatch(eventsActions.success(response));
      } catch {
        store.dispatch(eventsActions.failure("Unable to load articles"));
      }
    }
  }

  return { id };
};

const Details = styled.div`
  * + * {
    margin-top: 10px;
  }
`;

const EventTimeDay = styled.div`
  text-transform: uppercase;
  font-size: 1.3rem;
  font-weight: bold;
`;

const EventTimeFromTo = styled.div`
  font-size: 1.1rem;
`;

const OrangeColor = styled.span`
  color: ${theme.orange};
`;

const EventTimeLabel = styled.span`
  font-weight: normal;
`;

const Title = styled.h1`
  color: ${theme.purple};
`;

const MultidayEventTime = styled.span`
  font-weight: normal;
`;

const mapStateToProps = (state, { id }) => ({
  event: mapWebResponse(state.events, event =>
    event.find(({ _id }) => _id === id)
  )
});

export default connect(mapStateToProps)(Event);