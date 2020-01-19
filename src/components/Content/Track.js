import React from 'react';
import PopularityBar from './PopularityBar';

function Track({ num, dispDate, track: { name, artists, play, albumLink, album, image, popularity } }) {
  let dateComp = null;

  if (dispDate) {
    dateComp = <div className="col-sm-4 center">{dispDate}</div>;
  }

  const artistList = [];
  const divNum = dispDate ? ['2', '4', '8'] : ['3', '3', '12'];

  for (let artist of Object.keys(artists)) {
    artistList.push(
      <React.Fragment key={artist}>
        <a href={artists[artist]} target="_blank" className="s-link" rel="noopener noreferrer">
          {artist}
        </a>
      </React.Fragment>,
    );
    artistList.push(<React.Fragment key={artist + '-1'}>{', '}</React.Fragment>);
  }
  artistList.splice(-1, 1);

  return (
    <div className="row track rounded p-3 ml-3 mb-3 mr-3 transition-3d-hover">
      <div className="col-sm-3 center">
        <a href={play} target="_blank" className="s-link" rel="noopener noreferrer">
          {(num ? num + ': ' : '') + name}
        </a>
      </div>
      <div className="col-sm-3 center">
        <a href={albumLink} target="_blank" rel="noopener noreferrer" className="s-link row">
          <div className="col-sm-2 center">
            <img src={image} alt={album + 'name'} className="track-image rounded"></img>
          </div>
          <div className="col-sm-10 center">
            <span>{album}</span>
          </div>
        </a>
      </div>
      <div className={`col-sm-${divNum[0]} center`}>{artistList}</div>
      <div className={`col-sm-${divNum[1]} center row`}>
        <div className={`col-sm-${divNum[2]} center`}>
          <PopularityBar popularity={popularity}></PopularityBar>
        </div>
        {dateComp}
      </div>
    </div>
  );
}

export default Track;
