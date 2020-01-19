import React from 'react';

import TopTracks from './TopTracks';
import TopArtists from './TopArtists';
import RecentPlayed from './RecentPlayed';
import { authContext } from './AuthContext';
import ButtonGroup from './ButtonGroup';
import Header from './Header';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const humanizeTerm = term => {
  const terms = {
    short_term: ['Short Term', 'last 4 weeks'],
    medium_term: ['Medium Term', 'last 6 months'],
    long_term: ['Long Term', 'last several years'],
  };

  return terms[term];
};

function Content({ authToken, term, termOnClick }) {
  const terms = humanizeTerm(term);
  return (
    <React.Fragment>
      <div className="header">
        <div className="row text-right m-0">
          <div className="col-sm-4 text-left center row">
            <img className="logo ml-3 mr-3 mt-1" src="../logo.png" alt="logo"></img>
            <h2 className="text-green mb-0 center">Spotify-Tracks</h2>
          </div>
          <div className="col-sm-8 text-right">
            <AnchorLink href="#recentPlayed" offset="60" className="header-link">
              Recently Played
            </AnchorLink>
            <AnchorLink href="#topTracks" offset="60" className="header-link ml-4">
              Top Tracks
            </AnchorLink>
            <AnchorLink href="#topArtists" offset="60" className="header-link ml-4">
              Top Artists
            </AnchorLink>
          </div>

          <hr />
        </div>
      </div>
      <div className="p-3 mt-5">
        <authContext.Provider value={authToken}>
          <RecentPlayed></RecentPlayed>
          <Header title={`Top Tracks (${terms[0]})`} id="topTracks">
            {`${terms[0]} represents playing history from the ${terms[1]}`}
          </Header>

          <ButtonGroup selected={term} onClick={e => termOnClick(e)}></ButtonGroup>

          <TopTracks timeFrame="short_term" display={term}></TopTracks>
          <TopTracks timeFrame="medium_term" display={term}></TopTracks>
          <TopTracks timeFrame="long_term" display={term}></TopTracks>
          <div className="row">
            <div className="col-sm-4">
              <TopArtists timeFrame="short_term"></TopArtists>
            </div>
            <div className="col-sm-4">
              <TopArtists timeFrame="medium_term"></TopArtists>
            </div>
            <div className="col-sm-4">
              <TopArtists timeFrame="long_term"></TopArtists>
            </div>
          </div>
        </authContext.Provider>
      </div>
    </React.Fragment>
  );
}

export default Content;
